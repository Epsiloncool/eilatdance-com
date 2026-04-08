'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/styles', label: t('nav.styles') },
    { path: '/schedule', label: t('nav.schedule') },
    { path: '/teachers', label: t('nav.teachers') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contacts', label: t('nav.contacts') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  let pathnameAbsolute = pathname.replace(/^(\/en|\/ru|\/he)/, '');
  if (pathnameAbsolute.length < 1) {
	pathnameAbsolute = '/';
  }

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/ru/admin') || pathname?.startsWith('/he/admin') || pathname?.startsWith('/login') || pathname?.startsWith('/ru/login') || pathname?.startsWith('/he/login')) {
    return null;
  }

  return (
    <header className={`bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-100 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="text-purple-600 scale-100 md:scale-125">
              <Logo />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-full transition-all ${
                  pathnameAbsolute === item.path
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden lg:flex items-center gap-2 bg-gray-50 rounded-full p-1">
            <Globe className="w-4 h-4 text-gray-400 ml-2" />
            <button 
              onClick={() => setLanguage('he')}
              className={`px-3 py-1.5 rounded-full transition-colors text-sm ${
                language === 'he' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              HE
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-full transition-colors text-sm ${
                language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('ru')}
              className={`px-3 py-1.5 rounded-full transition-colors text-sm ${
                language === 'ru' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              RU
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-3 rounded-xl transition-all ${
                    pathnameAbsolute === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 mt-4 w-fit">
              <Globe className="w-4 h-4 text-gray-400 ml-2" />
              <button 
                onClick={() => setLanguage('he')}
                className={`px-3 py-1.5 rounded-full transition-colors text-sm ${
                  language === 'he' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                HE
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-full transition-colors text-sm ${
                  language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 rounded-full transition-colors text-sm ${
                  language === 'ru' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                RU
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}