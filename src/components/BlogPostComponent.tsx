'use client';

import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { formatDate, getLocalizedText } from '@/lib/utils';
import { BlockNoteToHTML } from '@/components/BlockNoteToJSX';
import { Post } from '@/types/post';

interface BlogPostProps {
  post: Post;
}

export function BlogPostComponent({ post }: BlogPostProps) {
  const { t, language } = useLanguage();

  const title = getLocalizedText(post.title, language);
  const category = getLocalizedText(post.category_name, language);
  const content = getLocalizedText(post.content, language);
  const author_bio = getLocalizedText(post.author_bio, language);

  const seo_title = getLocalizedText(post.seo_title, language) || getLocalizedText(post.title, language);
  const seo_description = getLocalizedText(post.seo_description, language) || getLocalizedText(post.excerpt, language);

  // Article Schema for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seo_title,
    description: seo_description,
    image: post.image_url,
    datePublished: new Date(post.published_at).toISOString(),
    dateModified: new Date(post.published_at).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author_name,
      description: post.author_bio,
      affiliation: {
        '@type': 'DanceGroup',
        name: t('seo.site-name')/*Eilat Dance Center*/,
      },
    },
    publisher: {
      '@type': 'DanceGroup',
      name: t('seo.site-name'),
      logo: {
        '@type': 'ImageObject',
        url: 'https://eilatdance.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://eilatdance.com/blog/${post.slug}`,
    },
    articleSection: getLocalizedText(post.category_name, language),
    keywords: [...('' + t('seo.article-keywords')/*dance, dance training, dance tips, Eilat, dance education*/).split(','), getLocalizedText(post.category_name, language)],
    inLanguage: language,
    articleBody: getLocalizedText(post.content, language),
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
      {
        '@type': 'ListItem',
        position: 3,
        name: seo_title,
        item: `https://eilatdance.com/blog/${post.slug}`,
      },
    ],
  };

  // Парсим контент для редактора
  let contentBlocks = [];
  try {
	contentBlocks = typeof content === 'string' ? JSON.parse(content) : content;
  } catch (e) {
	contentBlocks = [{ type: "paragraph", content: "error: " + e}];
  }
  
  // Цитата
  const quoteData = typeof post.quote === 'string' ? JSON.parse(post.quote) : post.quote;
  const quoteText = getLocalizedText(quoteData?.text, language);
  const quoteAuthor = quoteData?.author || post.author_name;

  const relatedPosts = post.relatedPosts || [];

  return (
	<>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12">
      {/* Back to Blog Link */}
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('blog.post.back-to-blog')/*Back to Blog*/}
      </Link>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto">
        <div className="mb-8 mt-8">
          <span className={`inline-block px-4 py-1 ${post.category_color || 'bg-gray-100'} rounded-full text-sm mb-6`}>
            {category || 'General'}
          </span>
          
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black mb-6">{title}</h1>
          
          <div className="flex items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.published_at, language)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author_name}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.image_url && (
            <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-12 shadow-lg">
            <ImageWithFallback
                src={post.image_url}
                alt={title}
                className="w-full h-full object-cover"
            />
            </div>
        )}

        {/* Content (BlockNote Renderer) */}
        <div className="prose prose-lg max-w-none mb-12">
			<BlockNoteToHTML blocks={contentBlocks} />
        </div>

        {/* Quote Block (если есть) */}
        {quoteText && (
            <div className="bg-purple-50 border-l-4 border-purple-600 p-8 my-12 rounded-r-lg">
                <p className="text-xl italic text-gray-800">"{quoteText}"</p>
                <p className="text-gray-600 mt-4 font-medium">— {quoteAuthor}</p>
            </div>
        )}

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-2xl p-10 mt-12 text-center">
          <h3 className="text-black mb-4">{t('blog.post.ready-title')/*Ready to Enroll Your Child?*/}</h3>
          <p className="text-gray-600 mb-6">
            {t('blog.post.ready-body')/*Join our next Kids (3-6y) Beginner class and see the difference dance can make*/}
          </p>
          <Link 
            href="/schedule"
            className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            {t('blog.post.ready-url')/*View Class Schedule*/}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </article>

      {/* Author Bio */}
      <div className="max-w-4xl mx-auto mt-16 border-t border-gray-200 pt-12">
        <div className="flex gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <h3 className="text-black mb-2">{t('blog.post.about')/*About*/} {post.author_name}</h3>
            <p className="text-gray-600 mb-4">
              {author_bio}
            </p>
            <Link 
              href="/teachers"
              className="text-black hover:text-gray-600 inline-flex items-center gap-2"
            >
              {t('blog.post.view-full-profile')/*View Full Profile*/}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-black mb-8">{t('blog.post.related-article')/*Related Articles*/}</h2>
        <div className="grid grid-cols-3 gap-6">
          {relatedPosts.map((relPost, index) => (
            <Link
              key={index}
              href={`/blog/${relPost.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mb-3">
                {getLocalizedText(relPost.category_name, language)}
              </span>
              <h3 className="text-black mb-3">{getLocalizedText(relPost.title, language)}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(relPost.published_at, language)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
	</>
  );
}