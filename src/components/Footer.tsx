'use client';

import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { usePathname } from 'next/navigation';

export function Footer() {
  const { t } = useLanguage();
  const settings = useSettings();
  const pathname = usePathname();

  // Скрываем футер в админке и на странице логина
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/ru/admin') || pathname?.startsWith('/he/admin') || pathname?.startsWith('/login') || pathname?.startsWith('/ru/login') || pathname?.startsWith('/he/login')) {
    return null;
  }

  return (
    <footer className="bg-gray-50 mt-12 md:mt-16 lg:mt-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-8 md:mb-12">
          <div className="max-w-xs">
            <div className="mb-4 scale-100 md:scale-125 origin-left text-purple-600">
              <Logo />
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {t('footer.short_description')/*Professional dance training for kids and adults in Eilat. Join our community today.*/}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-20 w-full lg:w-auto">
            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 mb-4 md:mb-5 text-sm md:text-base">{t('footer.quick_links')/*Quick Links*/}</h3>
              <ul className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-2 md:gap-y-3 text-gray-600 text-sm md:text-base">
                <li><a href="/" className="hover:text-gray-900 transition-colors">{t('nav.home')}</a></li>
                <li><a href="/about" className="hover:text-gray-900 transition-colors">{t('nav.about')}</a></li>
                <li><a href="/styles" className="hover:text-gray-900 transition-colors">{t('nav.styles')}</a></li>
                <li><a href="/schedule" className="hover:text-gray-900 transition-colors">{t('nav.schedule')}</a></li>
                <li><a href="/teachers" className="hover:text-gray-900 transition-colors">{t('nav.teachers')}</a></li>
                <li><a href="/blog" className="hover:text-gray-900 transition-colors">{t('nav.blog')}</a></li>
              </ul>
            </div>

            {/* Contact Info from Settings */}
            <div>
              <h3 className="text-gray-900 mb-4 md:mb-5 text-sm md:text-base">{t('footer.contact')/*Contact*/}</h3>
              <ul className="space-y-2 md:space-y-3 text-gray-600 text-sm md:text-base">
                {settings.phone && (
                  <li>
                    <Phone className="w-4 h-4 md:w-5 md:h-5 inline-block mr-2" />
                    <a href={`tel:${settings.phone}`} className="hover:text-gray-900 transition-colors">
                      {settings.phone}
                    </a>
                  </li>
                )}
                {settings.email && (
                  <li>
                    <Mail className="w-4 h-4 md:w-5 md:h-5 inline-block mr-2" />
                    <a href={`mailto:${settings.email}`} className="hover:text-gray-900 transition-colors">
                      {settings.email}
                    </a>
                  </li>
                )}
                {settings.address && (
                  <li>
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 inline-block mr-2" />
                    {settings.address}
                  </li>
                )}
              </ul>
            </div>

            {/* Social Media from Settings */}
            <div>
              <h3 className="text-gray-900 mb-4 md:mb-5 text-sm md:text-base">{t('contacts.social.title')}</h3>
              
              <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
                {settings.facebook && (
                  <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:border-purple-300 hover:bg-purple-50 transition-all group">
                    <Facebook className="w-5 h-5 text-gray-600 group-hover:text-purple-600" />
                  </a>
                )}
                {settings.instagram && (
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:border-pink-300 hover:bg-pink-50 transition-all group">
                    <Instagram className="w-5 h-5 text-gray-600 group-hover:text-pink-600" />
                  </a>
                )}
                {settings.youtube && (
                  <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition-all group">
                    <Youtube className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                  </a>
                )}
              </div>

              {settings.whatsapp && (
                <a 
                  href={`https://wa.me/${('' + settings.whatsapp).replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-[#22c55e] transition-colors inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm md:text-base w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  {t('footer.chat-whatsapp')/*Chat on WhatsApp*/}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 md:pt-8 text-center text-gray-500 text-sm md:text-base">
          <p>© {new Date().getFullYear()} {t('footer.copyright')/*Eilat Dance Center. All rights reserved.*/}</p>
        </div>
      </div>
    </footer>
  );
}