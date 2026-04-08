/*
import { Blog } from '@/components/Blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dance stories, tips, and tutorials. Learn about dance training, choosing styles, stretching techniques, and the culture behind the moves.',
};

export default function BlogPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Eilat Dance Center Blog',
    description: 'Dance tips, guides, and insights from professional dance instructors at Eilat Dance Center',
    url: 'https://eilatdance.com/blog',
    publisher: {
      '@type': 'DanceGroup',
      name: 'Eilat Dance Center',
      logo: {
        '@type': 'ImageObject',
        url: 'https://eilatdance.com/logo.png',
      },
    },
    inLanguage: ['en', 'he', 'ru'],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://eilatdance.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://eilatdance.com/blog',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Blog />
    </>
  );
}



import { Blog } from '../../../components/Blog';
import pool from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dance stories, tips, and tutorials from Eilat Dance Center.',
};
*/

import { Blog } from '../../../components/Blog';
import pool from '@/lib/db';
import { BlogPost } from '@/lib/db';
import { Post } from '@/types/post';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ lang: string }>;
  // В Next.js 15 searchParams тоже Promise
  searchParams: Promise<{ page?: string }>;
};

/*
// Функция получения постов из БД
async function getPosts(): Promise<BlogPost[]> {
  // Выбираем только опубликованные
  const [rows] = await pool.execute<BlogPost[]>(`
    SELECT p.id, p.title, p.excerpt, p.slug, p.published_at, p.category_id, p.image_url, p.is_featured, c.name as category_name, c.color as category_color, c.gradient as category_gradient, u.name as author_name, u.bio as author_bio
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
	LEFT JOIN users u ON p.author_id = u.id
    WHERE is_published = 1
    ORDER BY is_featured DESC, published_at DESC
  `);

  return rows;
}

export default async function BlogPage() {
  const postList = await getPosts() as Post[];

  // Подготавливаем данные для SEO Schema (можно упростить или оставить как есть, используя данные из БД)
  // ... (код схемы можно адаптировать под posts)

  return (
    <Blog posts={postList} />
  );
}

*/



export default async function BlogPage({ params, searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1');
  const limit = 6; // Постов на странице (в сетке)

  // 1. Находим Featured Post (Главный)
  // Приоритет: is_featured=1, иначе самый свежий
  let featuredPost = null;
  
  const [featRows] = await pool.execute<any[]>(`
    SELECT p.id, p.title, p.excerpt, p.slug, p.published_at, p.category_id, p.image_url, p.is_featured,
           c.name as category_name, c.color as category_color, c.gradient as category_gradient
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.is_published = 1 AND p.is_featured = 1
    ORDER BY p.published_at DESC
    LIMIT 1
  `);

  if (featRows.length > 0) {
    featuredPost = featRows[0];
  } else {
	/*
    // Если нет explicit featured, берем просто самый свежий
    const [latestRows] = await pool.execute<any[]>(`
      SELECT p.id, p.title, p.excerpt, p.slug, p.published_at, p.category_id, p.image_url, p.is_featured,
             c.name as category_name, c.color as category_color, c.gradient as category_gradient
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_published = 1
      ORDER BY p.published_at DESC
      LIMIT 1
    `);
    if (latestRows.length > 0) featuredPost = latestRows[0];
	*/
  }

  // ID главного поста, чтобы исключить его из сетки
  const excludeId = featuredPost ? featuredPost.id : 0; // В запросе нужно будет достать ID, если его нет в select выше, добавь p.id

  // 2. Считаем общее кол-во остальных постов (для пагинации)
  const [countRes] = await pool.execute<any[]>(
    'SELECT COUNT(*) as total FROM posts WHERE is_published = 1 AND id != ?', 
    [excludeId]
  );
  const totalPosts = countRes[0].total;
  const totalPages = Math.ceil(totalPosts / limit);

  // 3. Получаем посты для сетки (с пагинацией)
  const offset = (currentPage - 1) * limit;
  
  const [gridPosts] = await pool.execute<any[]>(`
    SELECT p.title, p.excerpt, p.slug, p.published_at, p.category_id, p.image_url, p.is_featured,
           c.name as category_name, c.color as category_color, c.gradient as category_gradient
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.is_published = 1 AND p.id != ?
    ORDER BY p.published_at DESC
    LIMIT ${offset}, ${limit}
  `, [excludeId]);

  return (
    <Blog 
      featuredPost={currentPage === 1 ? featuredPost : null} // Главный пост только на 1 странице
      posts={gridPosts}
      pagination={{
        current: currentPage,
        total: totalPages
      }}
    />
  );
}
