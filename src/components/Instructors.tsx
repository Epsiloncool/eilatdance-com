'use client';

import { Award, Star, Trophy, Sparkles, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

export function Instructors() {
  const { t, language } = useLanguage();

  const instructors = [
    {
      name: t('instructors.instr1_name')/*Maxim*/,
      role: t('instructors.instr1_role')/*Lead Instructor & Choreographer*/,
      image: t('instructors.instr1_image')/*https://images.unsplash.com/photo-1624421998513-77a9ebb43d0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGFuY2UlMjBpbnN0cnVjdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MzIyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080*/,
	  seo_image: t('instructors.instr1_seo_image')/*https://images.unsplash.com/photo-1624421998513-77a9ebb43d0d?w=400*/,
      bio: t('instructors.instr1_bio')/*Maxim has been teaching dance professionally for over 15 years. He specializes in Hip-Hop, Argentine Tango, and Jazz-Funk. His choreography has won multiple awards at international competitions.*/,
	  seo_alumniof: t('instructors.instr1_alumniof')/*Professional Dance Academy*/,
      highlights: t('instructors.instr1_highlights')/*15+ years of teaching experience, Certified in multiple dance styles, International competition winner,
Choreographer for professional productions*/.split(','),
	  seo_award: t('instructors.instr1_seo_award')/*International Dance Competition Winner, 15+ Years Teaching Experience Certificate*/.split(','),
      specialties: t('instructors.instr1_specialties')/*Hip-Hop, Argentine Tango, Jazz-Funk, Contemporary*/.split(','),
      gradient: t('instructors.instr1_gradient')/*from-purple-500 to-violet-600*/,
      bgColor: t('instructors.instr1_bgcolor')/*from-purple-50 to-violet-50*/,
    },
    {
      name: t('instructors.instr2_name')/*Sofia*/,
      role: t('instructors.instr2_role')/*Principal Instructor & Ballet Master*/,
      image: t('instructors.instr2_image')/*https://images.unsplash.com/photo-1576495123133-05895f832f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBiYWxsZXQlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MzIyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080*/,
	  seo_image: t('instructors.instr2_seo_image')/*https://images.unsplash.com/photo-1576495123133-05895f832f7e?w=400*/,
      bio: t('instructors.instr2_bio')/*Sofia brings 15 years of professional dance experience to our studio. She specializes in Ballet, High Heels, and Contemporary dance. Her nurturing approach makes her especially beloved by young students.*/,
	  seo_alumniof: t('instructors.instr2_alumniof')/*Professional Ballet School*/,
      highlights: t('instructors.instr2_highlights')/*15+ years of teaching experience, Former professional ballet dancer, Competition judge and mentor,
Specialized in children's dance education*/.split(','),
	  seo_award: t('instructors.instr2_seo_award')/*Former Professional Ballet Dancer, Competition Judge Certification, 15+ Years Teaching Experience*/.split(','),
      specialties: t('instructors.instr2_specialties')/*Ballet, High Heels, Contemporary, Stretching*/.split(','),
      gradient: t('instructors.instr2_gradient')/*from-pink-500 to-rose-600*/,
      bgColor: t('instructors.instr2_bgcolor')/*from-pink-50 to-rose-50*/,
    },
  ];

  const seo_items = instructors.map(instructor => {
      return {
        '@type': 'Person',
        '@id': 'https://eilatdance.com/teachers#' + instructor.name,
        name: instructor.name,
        jobTitle: instructor.role,
        description: instructor.bio,
        knowsAbout: instructor.specialties,
        worksFor: {
          '@type': 'DanceGroup',
          name: 'Eilat Dance Center',
        },
        image: instructor.seo_image,
        alumniOf: instructor.seo_alumniof,
        award: instructor.seo_award,
      };
  });

  const instructorsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: seo_items,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('instructors.seo-home')/*Home*/,
        item: 'https://eilatdance.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('instructors.seo-teachers')/*Teachers*/,
        item: 'https://eilatdance.com/teachers',
      },
    ],
  };

  return (
	<>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(instructorsSchema) }}
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
              <Award className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
              <span className="text-purple-700 text-xs md:text-sm">{t('teachers.badge')}</span>
            </div>
            <h1 className="text-3xl md:text-3xl lg:text-4xl text-gray-900 mb-4 md:mb-6 px-4">{t('teachers.title')}</h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t('teachers.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Instructors Section */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Photo with Organic Shape */}
              <div className="flex-shrink-0 w-full lg:w-[480px] relative">
                <div className="relative z-10">
                  <div className="relative overflow-hidden rounded-3xl md:rounded-[3rem] shadow-2xl">
                    <ImageWithFallback
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full aspect-[4/5] md:aspect-[3/4] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className={`absolute -bottom-4 md:-bottom-6 ${index % 2 === 1 ? 'left-4 lg:-left-6' : 'right-4 lg:-right-6'} bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 flex items-center gap-2 md:gap-3`}>
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${instructor.gradient} rounded-lg md:rounded-xl flex items-center justify-center`}>
                      <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl text-gray-900">{t('instructors.years-15')/*15+*/}</div>
                      <div className="text-xs md:text-sm text-gray-500">{t('instructors.years')/*Years*/}</div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className={`absolute ${index % 2 === 1 ? '-top-4 -left-4 md:-top-6 md:-left-6' : '-top-4 -right-4 md:-top-6 md:-right-6'} w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${instructor.gradient} rounded-full blur-3xl opacity-50`}></div>
              </div>

              {/* Content */}
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-3">
                  <h2 className="text-3xl md:text-3xl lg:text-4xl text-gray-900">{instructor.name}</h2>
                  <div className="flex gap-0.5 md:gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">{instructor.role}</p>

                <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-8 md:mb-10 leading-relaxed">{instructor.bio}</p>

                {/* Highlights */}
                <div className={`bg-gradient-to-br ${instructor.bgColor} rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-10 border border-white shadow-sm`}>
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br ${instructor.gradient} rounded-lg md:rounded-xl flex items-center justify-center shadow-md`}>
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl text-gray-900">{t('instructors.achievements-experience')/*Achievements & Experience*/}</h3>
                  </div>
                  <ul className="space-y-3 md:space-y-4">
                    {instructor.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 md:gap-3">
                        <div className={`w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br ${instructor.gradient} rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}>
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm md:text-base lg:text-lg">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialties */}
                <div>
                  <h4 className="text-gray-900 text-base md:text-lg mb-3 md:mb-4">{t('instructors.specialties')/*Specialties*/}</h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {instructor.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className={`px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r ${instructor.gradient} text-white rounded-full shadow-md hover:shadow-lg transition-shadow text-sm md:text-base`}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
	</>
  );
}