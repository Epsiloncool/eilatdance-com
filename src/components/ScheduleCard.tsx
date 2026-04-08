'use client';

import { Wallet, X, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '@/contexts/SettingsContext';
import { ScheduleCardDialog } from './ScheduleCardDialog';
import { ScheduleItem } from '@/types/schedule_item';
import { formatDate, getLocalizedText } from '@/lib/utils';
import { formatInstructors } from '@/lib/utils';

interface ScheduleCardProps {
  item: ScheduleItem;
  isTomorrow?: boolean;
}

export function ScheduleCard({ item, isTomorrow }: ScheduleCardProps) {
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setSelectedClassLocal = (item: ScheduleItem | null) => {
	setIsModalOpen(!!item);
  };

  /*
  const day_date = (new Date(item.day_date));
  const dayDateDisplay = day_date.toLocaleDateString(language === 'he' ? 'he-IL' : language === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short' });
  */

  return (
    <>
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group relative overflow-hidden">
        <div className="text-gray-900 mb-2 md:mb-3 text-sm md:text-base">{item.start_time.slice(0, 5)}</div>
        <h3 className="text-gray-900 mb-1.5 md:mb-2 text-sm md:text-base">{getLocalizedText(item.class_name, language)}</h3>
        <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6">{item.level}</p>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 md:py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg text-sm md:text-base"
        >
          <Wallet className="w-3 h-3 md:w-4 md:h-4" />
          {t('common.book')}
        </button>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
		<ScheduleCardDialog selectedClass={item} setSelectedClass={setSelectedClassLocal} />
      )}
    </>
  );
}