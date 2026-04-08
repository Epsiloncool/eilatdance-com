'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Music, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
        
        {/* Decorative Sparkles */}
        <Sparkles className="absolute top-1/4 right-1/4 w-6 h-6 text-purple-400 opacity-40 animate-pulse" />
        <Sparkles className="absolute bottom-1/4 left-1/3 w-8 h-8 text-pink-400 opacity-30 animate-pulse delay-300" />
        <Sparkles className="absolute top-1/3 left-1/4 w-5 h-5 text-orange-400 opacity-40 animate-pulse delay-700" />
        
        {/* Music Notes */}
        <Music className="absolute top-1/3 right-1/3 w-6 h-6 text-purple-300 opacity-30 animate-bounce" style={{ animationDuration: '3s' }} />
        <Music className="absolute bottom-1/3 left-1/4 w-5 h-5 text-pink-300 opacity-30 animate-bounce delay-500" style={{ animationDuration: '2.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Animated 404 with Dancing Figure */}
        <div className="relative mb-8">
          {/* Large 404 Text */}
          <div className="relative">
            <h1 className="text-[120px] sm:text-[160px] md:text-[180px] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 animate-gradient-x select-none">
              404
            </h1>
            
            {/* Dancing Silhouette Icon in the "0" */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white animate-spin-slow"
                >
                  <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M12 7C10.9 7 10 7.9 10 9S10.9 11 12 11 14 10.1 14 9 13.1 7 12 7M9 13C8.45 13 8 13.45 8 14V16C8 16.55 8.45 17 9 17S10 16.55 10 16V14C10 13.45 9.55 13 9 13M15 13C14.45 13 14 13.45 14 14V16C14 16.55 14.45 17 15 17S16 16.55 16 16V14C16 13.45 15.55 13 15 13Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            {t('404.title')/*Oops! Lost the Rhythm*/}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            {t('404.description')/*Looks like this page missed a beat and wandered off the dance floor. 
            Let's get you back to the music!*/}
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-300"></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 px-4">
          <Link
            href="/"
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-8 py-4 rounded-full hover:shadow-2xl transition-all inline-flex items-center justify-center gap-3 shadow-lg hover:scale-105 transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Home className="w-5 h-5 relative z-10" />
            <span className="relative z-10 font-medium">{t('404.back')/*Back to Home*/}</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group bg-white text-gray-900 px-8 py-4 rounded-full border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all inline-flex items-center justify-center gap-3 hover:scale-105 transform"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{t('404.go-back')/*Go Back*/}</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">{t('404.jump-title')/*Or jump to a popular page:*/}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/styles"
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-purple-50 hover:text-purple-700 transition-all text-sm border border-gray-200 hover:border-purple-200 hover:shadow-md"
            >
              {t('404.dance-styles')/*Dance Styles*/}
            </Link>
            <Link
              href="/schedule"
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-pink-50 hover:text-pink-700 transition-all text-sm border border-gray-200 hover:border-pink-200 hover:shadow-md"
            >
              {t('404.schedule')/*Schedule*/}
            </Link>
            <Link
              href="/teachers"
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-700 transition-all text-sm border border-gray-200 hover:border-orange-200 hover:shadow-md"
            >
              {t('404.teachers')/*Teachers*/}
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-violet-50 hover:text-violet-700 transition-all text-sm border border-gray-200 hover:border-violet-200 hover:shadow-md"
            >
              {t('404.blog')/*Blog*/}
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
