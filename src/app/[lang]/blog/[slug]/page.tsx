import { BlogPostComponent } from '../../../../components/BlogPostComponent';
import pool, { BlogPost } from '@/lib/db';
import { getLocalizedText } from '@/lib/utils';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Post } from '@/types/post';

export const dynamic = 'force-dynamic';

type Props = {
  params: { 
	slug: string;
	lang: string;
  };
};

// Функция получения поста
async function getPost(slug: string) {
  const [rows] = await pool.execute<BlogPost[]>(`
    SELECT p.*, 
           c.name as category_name, 
		   c.color as category_color,
		   c.gradient as category_gradient,
           u.name as author_name, 
		   u.bio as author_bio
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN users u ON p.author_id = u.id
    WHERE slug = ? AND is_published = 1
  `, [slug]);

  const post = rows[0];
  if (!post) return null;

  // 2. Получаем Related Articles
  let relatedPosts: any[] = [];
  
  // Парсим массив ID
  let relatedIds: number[] = [];
  try {
    relatedIds = typeof post.related_ids === 'string' 
      ? JSON.parse(post.related_ids) 
      : post.related_ids;
  } catch (e) {}

  if (Array.isArray(relatedIds) && relatedIds.length > 0) {
    // Формируем плейсхолдеры для IN (?)
    const placeholders = relatedIds.map(() => '?').join(',');
    
    // ВАЖНО: Фильтруем только опубликованные
    const [relRows] = await pool.execute<any[]>(`
      SELECT 
	  	p.title, 
		p.slug, 
		p.published_at, 
		p.image_url,
		c.name as category_name, 
		c.color as category_color
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id IN (${placeholders}) 
        AND p.is_published = 1
      ORDER BY FIELD(p.id, ${placeholders}) -- Сохраняем порядок выбора
    `, [...relatedIds, ...relatedIds]); // Дублируем ID для FIELD

    relatedPosts = relRows;
  }

  // Прикрепляем к объекту поста
  post.relatedPosts = relatedPosts;

  return post;
}

// Генерация метаданных
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getPost(slug);
  
  if (!post) return { title: 'Not Found' };

  const seo_title = getLocalizedText(post.seo_title, lang) || getLocalizedText(post.title, lang);
  const seo_description = getLocalizedText(post.seo_description, lang) || getLocalizedText(post.excerpt, lang);

  return {
    title: seo_title,
    description: seo_description,
    keywords: getLocalizedText(post.seo_keywords, lang),
    alternates: {
        canonical: getLocalizedText(post.seo_canonical, lang) || `/blog/${slug}`,
    },
    openGraph: {
      title: seo_title,
      description: seo_description,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author_name],
      images: [
        {
          url: post.image_url,
          width: 1200,
          height: 630,
          alt: seo_title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo_title,
      description: seo_description,
      images: [post.image_url],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, lang } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostComponent post={post} />
    </>	
  );
}
