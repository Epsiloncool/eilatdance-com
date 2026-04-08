'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useState, useEffect } from 'react';
import { Wallet, X, MessageCircle, Copy, Check, Calendar, Clock } from 'lucide-react';
import { formatDate, getLocalizedText } from '@/lib/utils';
import { ScheduleItem } from '@/types/schedule_item';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatInstructors } from '@/lib/utils';

interface ScheduleCardProps {
	selectedClass: ScheduleItem;
	setSelectedClass: (item: ScheduleItem | null) => void,
}

export function ScheduleCardDialog({ selectedClass, setSelectedClass }: ScheduleCardProps) {
  const { t, language } = useLanguage();

  const [copied, setCopied] = useState(false);

  const settings = useSettings();

  const price = selectedClass.price || '';

  const displayPhone = settings.payment_phone_display || settings.payment_phone || '';

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(settings.payment_phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedClass(null)}>
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto z-100" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedClass(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="mb-2">
              <h3 className="text-gray-900 text-xl md:text-2xl">{t('payment.book-class')/*Book Your Class*/}</h3>
            </div>
            <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">{t('payment.date')/*Date*/}: {formatDate((new Date(selectedClass.day_date)).toDateString(), language)}</p>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-600">{t('payment.class')/*Class*/}</span>
                <span className="text-gray-900">{getLocalizedText(selectedClass.class_name, language)}</span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-600">{t('payment.time')/*Time*/}</span>
                <span className="text-gray-900">{('' + (selectedClass.start_time || '')).slice(0, 5)}</span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-600">{t('payment.teacher')/*Teacher*/}</span>
                <span className="text-gray-900">{formatInstructors(selectedClass.instructors_data, language)}</span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-600">{t('payment.level')/*Level*/}</span>
                <span className="text-gray-900">{selectedClass.level}</span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-600">{t('payment.price_label')/*Price*/}</span>
                <span className="text-gray-900 text-lg">₪{price}</span>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-6">
              <h4 className="text-gray-900 text-lg mb-5">{t('payment.instructions-title')/*Payment Instructions*/}</h4>
              <ol className="space-y-4 text-gray-700 mb-8">
                <li className="flex gap-3">
                  <span className="text-gray-900 shrink-0">1.</span>
                  <span>{t('payment.step1')/*Open your Bit app.*/}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900 shrink-0">2.</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{t('payment.step2')/*Send payment to*/}: <span className="text-gray-900">{displayPhone/*05X-XXX-XXXX*/}</span></span>
                      <button
                        onClick={copyPhoneNumber}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                        title="Copy phone number"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900 shrink-0">3.</span>
                  <span>{t('payment.add-note')/*Add a note*/}: <span className="text-gray-900">{t('payment.your-name-date')/*Your Name + Date*/}</span></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gray-900 shrink-0">4.</span>
                  <span>{t('payment.confirm-via-whatsapp')/*Confirm your payment via WhatsApp*/}</span>
                </li>
              </ol>

              {/* Bit QR Code */}
              <div className="border-t border-white/50 pt-6">
                <p className="text-gray-600 text-center mb-4">{t('payment.step-qr')/*Or scan to pay with Bit*/}:</p>
                <div className="bg-white rounded-2xl p-6 flex items-center justify-center mx-auto w-48 h-48 shadow-sm">
                  <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                    {/*<span className="text-gray-400 text-sm text-center">{t('payment.bit-qr-code')/Bit QR Code/ }</span> */}
					<ImageWithFallback
						src={t('payment.bit-qr-code-image')}
						alt="Bit QR code"
						className="w-full h-full object-cover"
					/>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Confirmation Button */}
            <a
              href={t('payment.whatsapp-link')/*https://wa.me/972XXXXXXXXX?text=Hi!%20I%20paid%20for%20the%20class%20on%20Nov%2024*/}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-900 text-white py-4 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              {t('payment.i-paid')/*I Paid — Confirm via WhatsApp*/}
            </a>

            <p className="text-gray-500 text-center mt-5 text-sm">
              {t('payment.paid-comment')/*Click after completing payment to confirm via WhatsApp*/}
            </p>
          </div>
        </div>
  );
}
