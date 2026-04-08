'use client';

import { ArrowRight, Users, MapPin, Heart, Play, Calendar, User, Sparkles, Clock, Award } from 'lucide-react';
import { ScheduleCard } from './ScheduleCard';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Post } from '@/types/post';
import { formatDate, getLocalizedText } from '@/lib/utils';
import React, { useState } from 'react';
import { VideoModal } from './ui/VideoModal';
import { ScheduleItem } from '@/types/schedule_item';
import { useSettings } from '@/contexts/SettingsContext';
import { formatInstructors } from '@/lib/utils';

interface HomePageProps {
  reviews?: any[];
  posts?: Post[];
  classes?: ScheduleItem[];
}

export function HomePage({ reviews = [], posts = [], classes = [] }: HomePageProps) {
  const { t, language } = useLanguage();

  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const getText = (json: any) => getLocalizedText(json, language);

  /*
  const todayClasses = [
    { time: '16:00', title: 'Kids Ballet', level: 'Beginner', teacher: 'Sofia' },
    { time: '18:00', title: 'Hip-Hop', level: 'Intermediate', teacher: 'Maxim' },
    { time: '19:00', title: 'Jazz-Funk', level: 'All Levels', teacher: 'Sofia' },
    { time: '20:00', title: 'Stretching', level: 'All Levels', teacher: 'Sofia' },
    { time: '21:00', title: 'Argentine Tango', level: 'Advanced', teacher: 'Maxim' },
  ];
  */

  const advantages = [
    {
      icon: <Users className="w-7 h-7" />,
      title: t('home.professional-teachers')/*Professional Teachers*/,
      description: t('home.exp-15yrs')/*15+ years of experience in dance training and choreography*/,
      color: 'from-purple-500 to-violet-600',
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: t('home.central-location')/*Central Location*/,
      description: t('home.easy-to-reach')/*Easy to reach by public transport in the heart of Eilat*/,
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: t('home.friendly-atmosphere')/*Friendly Atmosphere*/,
      description: t('home.welcoming-community')/*Welcoming community for all ages and skill levels*/,
      color: 'from-orange-500 to-amber-600',
    },
  ];

  const settings = useSettings();

  // Хелпер для YouTube превью
  const getYouTubeThumbnail = (url: string) => {
    if (!url) return '';
    // Простой парсинг ID
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) videoId = url.split('v=')[1]?.split('&')[0];
    else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1]?.split('?')[0];
    
    if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return '';
  };

  const featuredPosts: Post[] = [];

  /*
  const featuredPosts = blogPosts.slice(0, 3).map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    category: post.category,
    color: post.color,
  }));

  const reviews = [
    {
      type: 'text',
      text: 'Best dance studio in the city! The teachers are amazing and really care about each student.',
      author: 'Sarah M.',
      bgColor: 'bg-purple-50',
    },
    {
      type: 'video',
      thumbnail: true,
    },
    {
      type: 'text',
      text: 'My daughter has been dancing here for 2 years and loves every class. Highly recommend!',
      author: 'Michael K.',
      bgColor: 'bg-pink-50',
    },
    {
      type: 'video',
      thumbnail: true,
    },
  ];
  */

  // Organization and LocalBusiness Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'DanceGroup',
    '@id': 'https://eilatdance.com',
    name: 'Eilat Dance Center',
    alternateName: 'Eilat Dance Studio',
    url: 'https://eilatdance.com',
    logo: 'https://eilatdance.com/logo.png',
    image: 'https://eilatdance.com/og-image.jpg',
    description: 'Professional dance school in Eilat offering Hip-Hop, Jazz-Funk, Argentine Tango, Ballet, Contemporary, and more. Expert instruction by Maxim and Sofia.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'HaTmarim Blvd 1',
      addressLocality: 'Eilat',
      postalCode: '88000',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '29.5577',
      longitude: '34.9519',
    },
    telephone: '+972-50-123-4567',
    email: 'info@eilatdance.com',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
        opens: '09:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '09:00',
        closes: '15:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/eilatdance',
      'https://www.instagram.com/eilatdance',
      'https://www.youtube.com/@eilatdance',
    ],
    founder: [
      {
        '@type': 'Person',
        name: 'Maxim',
        jobTitle: 'Lead Instructor & Choreographer',
      },
      {
        '@type': 'Person',
        name: 'Sofia',
        jobTitle: 'Principal Instructor & Ballet Master',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Eilat',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dance Classes',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hip-Hop Dance Classes',
            description: 'Urban dance style with high-energy choreography',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Argentine Tango Classes',
            description: 'Passionate partner dance from Argentina',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ballet Classes',
            description: 'Classical ballet technique and performance',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Jazz-Funk Dance Classes',
            description: 'Modern jazz with funk and street influences',
          },
        },
      ],
    },
  };


  return (
	<>
	    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-32 md:pt-36 lg:pt-40 pb-12 md:pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-purple-50 rounded-full mb-4 md:mb-6">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
              <span className="text-purple-700 text-xs md:text-sm">{t('home.where-passion')}</span>
            </div>
            
            <h1 className={`text-3xl md:text-3xl lg:text-[54px] tracking-tight text-gray-900 mb-4 md:mb-6 leading-tight`}>
              {t('home.best-studio')/*Best Dance Studio in*/ }{' '}
              <span className="relative inline-block">
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-yellow-300 -rotate-1"></span>
                <span className="relative z-1">{t('home.eilat')/*Eilat*/}</span>
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-10 leading-relaxed">{t('home.professional-dance-training')/*Professional dance training for kids and adults. Classes by Maxim & Sofia with 15+ years of experience.*/}</p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <Link 
                href="/schedule" 
                className="bg-gray-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-800 transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                {t('common.book')}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              
              <button className="px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all inline-flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer" onClick={() => setPlayingVideo(t('home.youtube-video-url'))}>
                <Play className="w-4 h-4 md:w-5 md:h-5" />
                {t('home.watch-video')/*Watch Video*/}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100">
              <div>
                <div className="text-2xl md:text-3xl text-gray-900 mb-1">{t('home.happy-students-number')/*500+*/}</div>
                <div className="text-xs md:text-sm text-gray-500">{t('home.happy-students')/*Happy Students*/}</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl text-gray-900 mb-1">{t('home.year-exp-number')/*15+*/}</div>
                <div className="text-xs md:text-sm text-gray-500">{t('home.years-experience')/*Years Experience*/}</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl text-gray-900 mb-1">{t('home.dance-styles-number')/*12*/}</div>
                <div className="text-xs md:text-sm text-gray-500">{t('home.dance-styles')/*Dance Styles*/}</div>
              </div>
            </div>
          </div>

          {/* Right Image with Organic Shape */}
          <div className="relative order-first lg:order-last">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl md:rounded-[3rem] shadow-2xl">
                <ImageWithFallback
                  src={t('home.hero-image-url')/*https://images.unsplash.com/photo-1630825669764-44ecddf22b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc2NDMyMTkwMXww&ixlib=rb-4.1.0&q=80&w=1080*/}
                  alt={t('home.hero-image-alt')/*Dance Studio*/}
                  className="w-full h-64 md:h-96 lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Today's Classes */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full mb-2 md:mb-3">
                <Clock className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
                <span className="text-purple-700 text-xs md:text-sm">{t('home.live-schedule')/*Live Schedule*/}</span>
              </div>
              <h2 className="text-3xl md:text-3xl text-gray-900">{t('home.today-classes')/*Today's Classes*/}</h2>
            </div>
            <Link href="/schedule" className="text-gray-700 hover:text-gray-900 inline-flex items-center gap-2 group text-sm md:text-base">
              <span>{t('home.view-full-schedule')/*View Full Schedule*/}</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

		  {(!classes || classes.length === 0) ? (
  			<div className="col-span-full py-12 text-center">
    			<p className="text-xl text-gray-500 font-medium">{t('home.no-today-classes')/*No classes on the schedule for today. See you next time!*/}</p>
  			</div>
		  ) : (
  			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
    			{classes.map((item) => (
      				<ScheduleCard 
        				key={item.id}
						item={item}
      				/>
    			))}
  			</div>
		  )}		  
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-24">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-teal-50 rounded-full mb-3 md:mb-4">
            <Award className="w-3 h-3 md:w-4 md:h-4 text-teal-600" />
            <span className="text-teal-700 text-xs md:text-sm">{t('home.excellence')/*Excellence in Dance Education*/}</span>
          </div>
          <h2 className="text-3xl md:text-3xl lg:text-4xl text-gray-900 mb-3 md:mb-4">{t('home.why')/*Why Choose Us*/}</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {t('home.we-combine')/*We combine professional expertise with a welcoming atmosphere*/}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${advantage.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-white group-hover:scale-110 transition-transform`}>
                {advantage.icon}
              </div>
              <h3 className="text-xl md:text-2xl text-gray-900 mb-3 md:mb-4">{advantage.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{advantage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-3xl lg:text-4xl text-gray-900 mb-3 md:mb-4">{t('home.what-say')/*What Our Students Say*/}</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600">{t('home.real-feedback')/*Real feedback from our dance community*/}</p>
          </div>

          {reviews.length === 0 ? (
            <p className="text-center text-gray-500">{t('home.no-reviews-yet')/*No reviews yet.*/}</p>
          ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {reviews.map((review, index) => {
                const author = getLocalizedText(review.author_name, language);
                const text = getLocalizedText(review.content, language);
                const hasVideo = !!review.video_url;
                const bgClass = index % 2 === 0 ? 'bg-purple-50' : 'bg-pink-50';

				return (
              <React.Fragment key={index}>
                {text.length > 3 ? (
                  <div className={`${bgClass} p-6 md:p-10 rounded-2xl md:rounded-3xl h-full`}>
                    <div className="text-2xl md:text-3xl text-gray-900 mb-3 md:mb-4">"</div>
                    <p className="text-gray-700 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">{text}</p>
                    <p className="text-gray-900 text-sm md:text-base">— {author}</p>
                  </div>
                ) : ''}
				{hasVideo ? (
                  <div className="relative bg-gray-200 rounded-2xl md:rounded-3xl h-64 md:h-80 overflow-hidden group cursor-pointer" onClick={() => setPlayingVideo(review.video_url)}>
                    <ImageWithFallback
                          src={getYouTubeThumbnail(review.video_url) || "https://images.unsplash.com/photo-1518834107812-bf56133fa12c?w=800"}
                          alt={`Review by ${author}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 md:w-7 md:h-7 text-gray-900 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                      <div className="text-xs md:text-sm bg-black/50 px-2 md:px-3 py-1 rounded-full">{t('home.video-review')/*Video Review*/}</div>
                    </div>
                  </div>
                ) : ''}
              </React.Fragment>
            )
			})}
          </div>
		  )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-3xl lg:text-4xl text-gray-900 mb-2 md:mb-3">{t('home.from-our-blog')/*From Our Blog*/}</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600">{t('home.tips-guides')/*Tips, guides, and insights from our instructors*/}</p>
          </div>
          <Link href="/blog" className="text-gray-700 hover:text-gray-900 inline-flex items-center gap-2 group text-sm md:text-base">
            <span>{t('home.all-articles')/*View All Articles*/}</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts?.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Thumbnail */}
              <div className="relative h-48 md:h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
				<ImageWithFallback
                    src={post.image_url || '/placeholder.jpg'}
                    alt={getText(post.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <span className={`inline-block px-3 md:px-4 py-1 md:py-1.5 ${post.category_color} rounded-full text-xs md:text-sm mb-3 md:mb-4`}>
                  {getLocalizedText(post.category_name, language)}
                </span>
                
                <h3 className="text-lg md:text-xl text-gray-900 mb-2 md:mb-3 group-hover:text-purple-600 transition-colors">
                  {getText(post.title)}
                </h3>
                
                <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{getText(post.excerpt)}</p>

                <div className="flex items-center gap-3 md:gap-4 text-gray-500 text-xs md:text-sm">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{formatDate(post.published_at, language)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <User className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{post.author_name}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-12 md:pb-16 lg:pb-24">
        <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 rounded-3xl md:rounded-[3rem] text-center overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-3xl lg:text-4xl text-white mb-4 md:mb-6">{t('home.ready-to-dance')/*Ready to dance? Book now, start today.*/}</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-10 max-w-2xl mx-auto">
              {t('home.choose-class')/*Choose a class from our schedule and pay directly via Bit to reserve your spot.*/}
            </p>
            <Link href="/schedule">
              <button className="bg-white text-gray-900 px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-gray-100 transition-all inline-flex items-center gap-2 md:gap-3 shadow-2xl hover:shadow-3xl text-base md:text-lg">
                {t('home.go-to-schedule')/*Go to Schedule*/}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </Link>
          </div>
        </div>
      </section>
	   <VideoModal 
        url={playingVideo} 
        isOpen={!!playingVideo} 
        onClose={() => setPlayingVideo(null)} 
      />
    </div>
	</>
  );
}