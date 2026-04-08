'use client';

import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';

export function Contacts() {
  const { t } = useLanguage();
  const settings = useSettings();
  
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'DanceGroup',
      name: 'Eilat Dance Center',
      url: 'https://eilatdance.com',
      telephone: '+972-50-123-4567',
      email: 'info@eilatdance.com',
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
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '00:00',
          closes: '00:00',
          description: 'Closed',
        },
      ],
      sameAs: [
        'https://www.facebook.com/eilatdance',
        'https://www.instagram.com/eilatdance',
        'https://www.youtube.com/@eilatdance',
      ],
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
        name: 'Contacts',
        item: 'https://eilatdance.com/contacts',
      },
    ],
  };

  return (
	<>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
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
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
              <span className="text-purple-700 text-xs md:text-sm">{t('contacts.badge')}</span>
            </div>
            <h1 className="text-black mb-3 md:mb-4 text-3xl md:text-3xl lg:text-4xl px-4">{t('contacts.title')}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg lg:text-xl px-4">
              {t('contacts.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          
          {/* Map Section */}
          <div className="relative bg-gray-100 h-64 md:h-96 lg:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg order-2 lg:order-1">
            {settings.map_url ? (
              <iframe 
                src={settings.map_url} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            ) : (
              // Fallback if map_url is not set in admin
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-100 to-pink-100 relative">
                <div className="text-center relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
                  </div>
                  <span className="text-gray-700 text-sm md:text-base block mb-2">{t('contacts.no-map')/*Map not configured*/}</span>
                  <p className="text-gray-600 text-xs md:text-sm">{t('contats.update-map')/*Please update map URL in Admin Settings*/}</p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl opacity-50"></div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-black mb-6 md:mb-8 text-2xl md:text-3xl lg:text-3xl">{t('contacts.info.title')}</h2>

              <div className="space-y-5 md:space-y-6">
                {/* Address */}
                {settings.address && (
                  <div className="flex gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-black mb-1.5 md:mb-2 text-sm md:text-base">{t('contacts.address')/*Address*/}</h3>
                      <p className="text-gray-600 text-sm md:text-base whitespace-pre-wrap">{settings.address}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {settings.phone && (
                  <div className="flex gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-black mb-1.5 md:mb-2 text-sm md:text-base">{t('contacts.phone')/*Phone*/}</h3>
                      <a href={`tel:${settings.phone}`} className="text-gray-600 hover:text-gray-900 text-sm md:text-base transition-colors">
                        {settings.phone}
                      </a>
                      <p className="text-gray-500 text-xs md:text-sm mt-1">{t('contacts.bit-payments-available')/*Available for Bit payments*/}</p>
                    </div>
                  </div>
                )}

                {/* Email */}
                {settings.email && (
                  <div className="flex gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-black mb-1.5 md:mb-2 text-sm md:text-base">{t('contacts.email')/*Email*/}</h3>
                      <a href={`mailto:${settings.email}`} className="text-gray-600 hover:text-gray-900 text-sm md:text-base break-all transition-colors">
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Hours (Static for now, but translatable) */}
                <div className="flex gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-black mb-1.5 md:mb-2 text-sm md:text-base">{t('contacts.hours.title')}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{t('contacts.hours.weekdays')}: 16:00 - 22:00</p>
                    <p className="text-gray-600 text-sm md:text-base">{t('contacts.hours.weekend')}: 10:00 - 19:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-6 md:pt-8 border-t border-gray-200">
              <h3 className="text-black mb-3 md:mb-4 text-sm md:text-base">{t('contacts.social.title')}</h3>
              <div className="flex gap-3 md:gap-4">
                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center hover:shadow-lg transition-all group"
                  >
                    <Facebook className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </a>
                )}
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center hover:shadow-lg transition-all group"
                  >
                    <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </a>
                )}
                {settings.youtube && (
                  <a
                    href={settings.youtube}
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center hover:shadow-lg transition-all group"
                  >
                    <Youtube className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* How to Find Us (Static block with hints) */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 border border-purple-100">
          <h2 className="text-black text-center mb-8 md:mb-12 text-2xl md:text-3xl lg:text-3xl">{t('contacts.how-to-find')/*How to Find Us*/}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-black mb-1.5 md:mb-2 text-sm md:text-base">{t('contacts.public-transport')/*Public Transport*/}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {t('contacts.bus')/*Bus lines 5, 18, 61 stop nearby. 5-minute walk from Dizengoff Center.*/}
              </p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-black mb-1.5 md:mb-2 text-sm md:text-base">{t('contacts.parking')/*Parking*/}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {t('contacts.parking-available')/*Street parking available. Paid parking lot 2 minutes away.*/}
              </p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-black mb-1.5 md:mb-2 text-sm md:text-base">{t('contacts.entrance')/*Entrance*/}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {t('contacts.entrance-way')/*Studio is on the 2nd floor. Building entrance is between shops.*/}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
	</>
  );
}