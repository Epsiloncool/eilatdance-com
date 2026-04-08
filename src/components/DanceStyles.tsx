'use client';

import { useState } from 'react';
import { StyleCard } from './StyleCard';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DanceStyle } from '@/lib/db';
import { getLocalizedText } from '@/lib/utils';

interface StylesProps {
  styles: DanceStyle[];
}

export function DanceStyles({ styles }: StylesProps) {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  /*
  const styles = [
    {
      name: 'High Heels',
      level: 'Intermediate',
      category: 'adults',
      description: 'Sensual and empowering dance style performed in high heels, combining elements of jazz, contemporary, and Latin dance.',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      name: 'Kids Hip-Hop',
      level: 'Beginner',
      category: 'kids',
      description: 'Fun and energetic hip-hop classes designed specifically for children aged 3-6 years, focusing on rhythm and coordination.',
      gradient: 'from-orange-500 to-amber-600',
    },
    {
      name: 'Contemporary',
      level: 'All Levels',
      category: 'adults',
      description: 'Expressive dance form combining techniques from ballet, modern, and jazz, emphasizing fluidity and emotional connection.',
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      name: 'Ballet for Kids',
      level: 'Beginner',
      category: 'kids',
      description: 'Classical ballet training for young dancers, building foundation in technique, posture, and grace.',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      name: 'Jazz-Funk',
      level: 'Intermediate',
      category: 'adults',
      description: 'High-energy dance style blending jazz technique with funk, hip-hop, and street dance elements.',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      name: 'Argentine Tango',
      level: 'Advanced',
      category: 'adults',
      description: 'Partner dance characterized by improvisation and close embrace, requiring precision and musicality.',
      gradient: 'from-red-500 to-pink-600',
    },
    {
      name: 'Creative Movement',
      level: 'Beginner',
      category: 'kids',
      description: 'Imaginative dance classes for young children exploring movement, music, and self-expression through play.',
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      name: 'Stretching & Flexibility',
      level: 'All Levels',
      category: 'adults',
      description: 'Dedicated class focusing on improving flexibility, mobility, and body awareness for dancers of all styles.',
      gradient: 'from-teal-500 to-emerald-600',
    },
    {
      name: 'Hip-Hop',
      level: 'Intermediate',
      category: 'adults',
      description: 'Urban dance style incorporating breaking, popping, locking, and freestyle elements with current music.',
      gradient: 'from-indigo-500 to-blue-600',
    },
  ];
  */

  const filteredStyles = styles.filter(style => {
    if (activeFilter === 'all') return true;
    return style.category === activeFilter;
  });

  const seo_services = styles.map(style => {
	return {
        '@type': 'Service',
        name: t('styles.seo-dance-classes')/*%s Dance Classes*/.replaceAll('%s', getLocalizedText(style.name, language)),
        description: getLocalizedText(style.description, language),
        provider: {
          '@type': 'DanceGroup',
          name: 'Eilat Dance Center',
        },
        areaServed: 'Eilat',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceLocation: {
            '@type': 'Place',
            name: 'Eilat Dance Center',
          },
        },
      };
  });


  const danceStylesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('styles.seo-offered')/*Dance Styles Offered*/,
    description: 'Professional dance instruction in multiple styles at Eilat Dance Center',
    itemListElement: seo_services,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('styles.seo-home')/*Home*/,
        item: 'https://eilatdance.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('styles.seo-dance-styles')/*Dance Styles*/,
        item: 'https://eilatdance.com/styles',
      },
    ],
  };

  return (
	<>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(danceStylesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="bg-white pt-20 md:pt-24">
      {/* Header with Background */}
      <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-20 lg:py-24">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 md:mb-6 shadow-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
              <span className="text-purple-700 text-xs md:text-sm">{t('styles.badge')}</span>
            </div>
            <h1 className="text-3xl md:text-3xl lg:text-4xl text-gray-900 mb-4 md:mb-6 px-4">{t('styles.title')}</h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t('styles.subtitle')}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-3 px-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 md:px-10 py-3 md:py-4 rounded-full transition-all text-sm md:text-base ${
                activeFilter === 'all'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              {t('styles.filter.all')}
            </button>
            <button
              onClick={() => setActiveFilter('kids')}
              className={`px-6 md:px-10 py-3 md:py-4 rounded-full transition-all text-sm md:text-base ${
                activeFilter === 'kids'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              {t('styles.kids')/*Kids*/}
            </button>
            <button
              onClick={() => setActiveFilter('adults')}
              className={`px-6 md:px-10 py-3 md:py-4 rounded-full transition-all text-sm md:text-base ${
                activeFilter === 'adults'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              {t('styles.adults')/*Adults*/}
            </button>
          </div>
        </div>
      </div>

      {/* Styles Grid */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredStyles.map((style, index) => (
            <StyleCard key={index} style={style} />
          ))}
        </div>
      </div>
    </div>
	</>
  );
}