'use client';

import { Heart, Users, Award, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutUs() {
  const { t } = useLanguage();
  
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'DanceGroup',
      name: 'Eilat Dance Center',
      description: 'Eilat Dance Center has been inspiring dancers for years with professional instruction in multiple dance styles including Hip-Hop, Ballet, Argentine Tango, and contemporary dance.',
      foundingDate: '2010',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '2+',
      },
      knowsAbout: [
        'Hip-Hop Dance',
        'Argentine Tango',
        'Ballet',
        'Jazz-Funk',
        'Contemporary Dance',
        'High Heels Dance',
        'Choreography',
        'Dance Education',
      ],
      slogan: t('home.where-passion')/*Where Passion Meets Movement*/,
    },
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
        name: 'About Us',
        item: 'https://eilatdance.com/about',
      },
    ],
  };

  const values = [
    {
      icon: Heart,
      title: t('about.values.passion.title'),
      description: t('about.values.passion.description'),
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: Users,
      title: t('about.values.community.title'),
      description: t('about.values.community.description'),
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description'),
      gradient: 'from-orange-500 to-amber-600',
    },
  ];

  return (
	<>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
              <span className="text-purple-700 text-xs md:text-sm">{t('about.badge')}</span>
            </div>
            <h1 className="text-black mb-4 md:mb-6 text-3xl md:text-3xl lg:text-4xl px-4">{t('about.title')}</h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg px-4">
              {t('about.description1')}
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:mb-20 items-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-64 md:h-96 lg:h-[500px] rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg">
              <ImageWithFallback
                src={t('about.image_url')/*https://images.unsplash.com/photo-1630825669764-44ecddf22b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc2NDMyMTkwMXww&ixlib=rb-4.1.0&q=80&w=1080*/}
                alt={t('about.image_alt')/*Studio*/}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative blur */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl opacity-50"></div>
          </div>
          <div>
            <h2 className="text-black mb-4 md:mb-6 text-2xl md:text-3xl lg:text-3xl">{t('about.badge')}</h2>
            <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {t('about.description2')}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-black mb-3 md:mb-4 text-2xl md:text-3xl lg:text-3xl px-4">{t('about.values.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
              {t('about.description2')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-6 md:p-8 text-center border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${value.gradient} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-black mb-3 md:mb-4 text-base md:text-lg">{value.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-black mb-3 md:mb-4 text-2xl md:text-3xl lg:text-3xl px-4">{t('about.teachers.title')/*Meet Your Instructors*/}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
              {t('about.teachers.subtitle')/*Learn from passionate professionals dedicated to your growth*/}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Maxim */}
            <div className="group bg-white border border-gray-100 rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 md:h-80 lg:h-[400px] overflow-hidden">
                <ImageWithFallback
                  src={t('about.teachers.teacher1_image')/*https://images.unsplash.com/photo-1624421998513-77a9ebb43d0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGFuY2UlMjBpbnN0cnVjdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MzIyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080*/}
                  alt={t('about.teachers.teacher1_name')/*Maxim*/}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
              <div className="p-5 md:p-6 lg:p-8">
                <h3 className="text-black mb-1.5 md:mb-2 text-lg md:text-xl">{t('about.teachers.teacher1_name')/*Maxim*/}</h3>
                <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base">{t('about.teachers.teacher1_tags')/*Lead Instructor • Ballroom & Tango Specialist*/}</p>
                <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">{t('about.teachers.teacher1_description')/*With 15+ years of professional experience, Maxim specializes in Ballroom, Argentine Tango, and Contemporary dance. His patient teaching style and attention to technique help students of all levels achieve their goals.*/}
                </p>
                <Link 
                  href={t('about.teachers.teacher1_profile_link')/*/teachers*/}
                  className="text-purple-600 hover:text-purple-700 inline-flex items-center gap-2 text-sm md:text-base group"
                >
                  {t('about.teachers.view_full_profile')/*View Full Profile*/}
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Sofia */}
            <div className="group bg-white border border-gray-100 rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 md:h-80 lg:h-[400px] overflow-hidden">
                <ImageWithFallback
                  src={t('about.teachers.teacher2_image')/*https://images.unsplash.com/photo-1576495123133-05895f832f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBiYWxsZXQlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MzIyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080*/}
                  alt={t('about.teachers.teacher2_name')/*Sofia*/}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent"></div>
              </div>
              <div className="p-5 md:p-6 lg:p-8">
                <h3 className="text-black mb-1.5 md:mb-2 text-lg md:text-xl">{t('about.teachers.teacher2_name')/*Sofia*/}</h3>
                <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base">{t('about.teachers.teacher2_tags')/*Lead Instructor • Jazz-funk & Kids Specialist*/}</p>
                <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">{t('about.teachers.teacher2_description')/*Sofia brings over 15 years of dance expertise, specializing in Jazz-funk, Stretching, and children's dance education. Her energetic classes and nurturing approach create a positive learning environment for all ages.*/}
                </p>
                <Link 
                  href={t('about.teachers.teacher2_profile_link')/*/teachers*/}
                  className="text-pink-600 hover:text-pink-700 inline-flex items-center gap-2 text-sm md:text-base group"
                >
                  {t('about.teachers.view_full_profile')/*View Full Profile*/}
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Facilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-black mb-4 md:mb-6 text-2xl md:text-3xl lg:text-3xl">{t('about.location.title')}</h2>
            <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
              {t('about.location.description')}
            </p>
            <div className="flex items-start gap-2 md:gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl mb-4 md:mb-6 border border-purple-100">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-black text-sm md:text-base">{t('about.visit-us')/*Visit Us*/}</p>
                <p className="text-sm md:text-base text-gray-700">{t('about.location')/*Eilat, Israel*/}</p>
                <p className="text-gray-600 text-xs md:text-sm mt-1">{t('about.easy-parking')/*Easy parking and accessible location*/}</p>
              </div>
            </div>
            <Link 
              href="/contacts"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full hover:shadow-lg transition-all inline-flex items-center gap-2 text-sm md:text-base shadow-md"
            >
              {t('about.get-directions')/*Get Directions*/}
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </Link>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-64 md:h-96 lg:h-[500px] rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg">
              <ImageWithFallback
                src={t('about.studio-image-url')/*https://images.unsplash.com/photo-1630825669764-44ecddf22b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc2NDMyMTkwMXww&ixlib=rb-4.1.0&q=80&w=1080*/}
                alt={t('about.studio-image-alt')/*Studio Facilities*/}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative blur */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
	</>
  );
}