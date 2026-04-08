'use client';

import { Calendar, User, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { formatDate, getLocalizedText } from './../lib/utils';
import { Post } from '@/types/post';
import { useSettings } from '@/contexts/SettingsContext';

interface BlogProps {
  featuredPost: any | null; // Теперь приходит сверху
  posts: Post[];
  pagination: {
    current: number;
    total: number;
  };
}

export function Blog({ featuredPost, posts, pagination }: BlogProps) {
  const { t, language } = useLanguage();

  const getText = (json: object) => getLocalizedText(json, language);

  const textNewer = t('blog.oager.read-newer')/*Read Newer*/; 
  const textOlder = t('blog.pager.read-older')/*Read Older*/; 

  const featuredArticle = featuredPost;
  const articles = posts;

  return (
    <div className="bg-white pt-20 md:pt-24">
      {/* Header with Gradient Background */}
      <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-20 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 md:mb-6 shadow-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
              <span className="text-purple-700 text-xs md:text-sm">{t('blog.badge')}</span>
            </div>
            <h1 className="text-black mb-3 md:mb-4 text-3xl md:text-3xl lg:text-4xl px-4">{t('blog.title')}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg lg:text-xl px-4">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
        {/* Featured Article */}
		{featuredArticle ? 
        <div className="mb-10 md:mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl md:rounded-3xl overflow-hidden border border-purple-100 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-80 lg:h-[400px] overflow-hidden">
                  <ImageWithFallback
                    src={featuredArticle.image_url || '/placeholder.jpg'}
                    alt={getText(featuredArticle.title)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
              <div className={`absolute inset-0 bg-gradient-to-t ${featuredArticle.category_gradient || 'from-purple-500/20 to-transparent'} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            </div>
			<div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
			  <span className="inline-block px-3 md:px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs md:text-sm mb-3 md:mb-4 w-fit shadow-md">
				{t('featured-article.featured')/*Featured*/}
			  </span>
			  <h2 className="text-black mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">{getText(featuredArticle.title)}</h2>
			  <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">{getText(featuredArticle.excerpt)}</p>
			  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-500 mb-6 md:mb-8 text-sm md:text-base">
				<div className="flex items-center gap-1.5 md:gap-2">
				  <Calendar className="w-3 h-3 md:w-4 md:h-4" />
				  <span>{formatDate(featuredArticle.published_at, language)}</span>
				</div>
				<div className="flex items-center gap-1.5 md:gap-2">
				  <User className="w-3 h-3 md:w-4 md:h-4" />
				  <span>{featuredArticle.author_name || ''}</span>
				</div>
			  </div>
			  <Link 
				href={`/blog/${featuredArticle.slug || ''}`}
				className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full hover:shadow-lg transition-all inline-flex items-center gap-2 w-fit text-sm md:text-base shadow-md"
			  >
				{t('featured-article.read-more')/*Read More*/}
				<ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
			  </Link>
			</div>
          </div>
        </div>		
		: ''}

        {/* Articles Grid */}
		{posts.length > 0 ? (
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <Link
              key={index}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-xl md:rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Thumbnail */}
              <div className="relative h-40 md:h-48 overflow-hidden">
                <ImageWithFallback
                  src={article.image_url}
                  alt={getText(article.title)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${article.category_gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <span className={`inline-block px-3 py-1 ${article.category_color} rounded-full text-xs md:text-sm mb-2 md:mb-3`}>
                  {getText(article.category_name)}
                </span>
                
                <h3 className={`text-black mb-2 md:mb-3 text-base md:text-lg group-hover:text-purple-600 transition-all`}>{getText(article.title)}</h3>
                
                <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base line-clamp-3 leading-relaxed">{getText(article.excerpt)}</p>

                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-500 text-xs md:text-sm mb-3 md:mb-4">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{formatDate(article.published_at, language)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <User className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{article.author_name}</span>
                  </div>
                </div>

                <div className="text-gray-900 group-hover:text-purple-600 inline-flex items-center gap-2 text-sm md:text-base transition-colors">
                  {t('blog.read-more')/*Read More*/}
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
		  </div>
		) : (
          !featuredPost && <div className="text-center py-20 text-gray-500">{t('blog.no-posts')/*No posts found.*/}</div>
        )}

        {/* PAGINATION */}
        {pagination.total > 1 && (
          <div className="mt-16 flex flex-col items-center gap-4 border-gray-100 pt-8">
            
            {/* Номера страниц */}
            <div className="flex gap-2">
              {Array.from({ length: pagination.total }, (_, i) => i + 1).map(page => (
                <Link
                  key={page}
                  href={`/blog?page=${page}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                    ${page === pagination.current 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
                    }`}
                >
                  {page}
                </Link>
              ))}
            </div>

            {/* Кнопки Назад / Вперед */}
            <div className="flex gap-4 w-full justify-center mt-4">
              {pagination.current > 1 ? (
                <Link 
                  href={`/blog?page=${pagination.current - 1}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> {/* Стрелка влево */}
                  {textNewer}
                </Link>
              ) : <div />}

              {pagination.current < pagination.total ? (
                <Link 
                  href={`/blog?page=${pagination.current + 1}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors"
                >
                  {textOlder}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : <div />}
            </div>

          </div>
        )}

        </div>
    </div>
  );
}
