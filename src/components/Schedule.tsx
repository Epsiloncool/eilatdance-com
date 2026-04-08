'use client';

import { useState, useEffect } from 'react';
import { Wallet, X, MessageCircle, Copy, Check, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { formatDate, formatInstructors, getLocalizedText } from '@/lib/utils';
import { ScheduleItem } from '@/types/schedule_item';
import { ScheduleCardDialog } from './ScheduleCardDialog';
import { ScheduleCard } from './ScheduleCard';

export function Schedule() {
  const { t, language } = useLanguage();
  const [selectedClass, setSelectedClass] = useState<ScheduleItem | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<'current' | 'next'>('current');
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);  
  const [weekOffset, setWeekOffset] = useState(0); // 0 = текущая неделя, 1 = следующая
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  // Загрузка данных
  /*
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/schedule?week=${selectedWeek}`);
        const data = await res.json();
        setScheduleItems(data as ScheduleItem[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedWeek]); // Перезагружаем при смене недели
  */

  // Хелпер для дат
  useEffect(() => {
    const today = new Date();
    const day = today.getDay(); // 0=Sun, 1=Mon
    const diff = today.getDate() - day + (day === 0 ? -6 : 1) + (weekOffset * 7); // Понедельник
    
    const monday = new Date(today);
    monday.setDate(diff);
    monday.setHours(0,0,0,0);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      dates.push(d);
    }
    setWeekDates(dates);

    // Загрузка данных
    const from = (new Date(new Date(dates[0]).getTime() - (new Date()).getTimezoneOffset() * 60000).toISOString()).slice(0, 10);
    const to = (new Date(new Date(dates[6]).getTime() - (new Date()).getTimezoneOffset() * 60000).toISOString()).slice(0, 10);
    
    setLoading(true);
    fetch(`/api/schedule?from=${from}&to=${to}`)
      .then(res => res.json())
      .then(data => setScheduleItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));

  }, [weekOffset]);

  const setSelectedClassLocal = (item: ScheduleItem | null) => {
	setSelectedClass(item);
  };

  // Группировка по дням
  const groupedSchedule: Record<string, ScheduleItem[]> = {};
  // Инициализация дней (чтобы порядок был верный)
  const dayNames = [
    t('schedule.day.monday'),
	t('schedule.day.tuesday'),
	t('schedule.day.wednesday'),
    t('schedule.day.thursday'),
	t('schedule.day.friday'),
	t('schedule.day.saturday'),
	t('schedule.day.sunday'),
  ];
  
  // Маппинг индекса дня из БД (1-7) в название
  const getDayName = (idx: number) => dayNames[((idx - 1) + 7) % 7];

  /*
  scheduleItems.forEach(item => {
    const dayName = getDayName(item.day_of_week);
    if (!groupedSchedule[dayName]) groupedSchedule[dayName] = [];
    groupedSchedule[dayName].push(item);
  });
  */
  scheduleItems.forEach(item => {
    const dayName = getDayName(item.day_of_week);
	if (!groupedSchedule[dayName]) groupedSchedule[dayName] = [];
    groupedSchedule[dayName].push(item);
  });

  /*
  const schedule: Record<string, ClassItem[]> = {
    [t('schedule.day.monday')]: [
      { time: '16:00', title: 'Kids Ballet', teacher: 'Sofia', level: t('styles.beginner') },
      { time: '18:00', title: 'Hip-Hop', teacher: 'Maxim', level: t('styles.intermediate') },
      { time: '19:00', title: 'Contemporary', teacher: 'Sofia', level: 'All Levels' },
      { time: '20:00', title: 'Jazz-Funk', teacher: 'Maxim', level: t('styles.intermediate') },
    ],
    [t('schedule.day.tuesday')]: [
      { time: '17:00', title: 'Kids Creative Movement', teacher: 'Sofia', level: t('styles.beginner') },
      { time: '19:00', title: 'High Heels', teacher: 'Sofia', level: t('styles.intermediate') },
      { time: '20:00', title: 'Stretching', teacher: 'Sofia', level: 'All Levels' },
    ],
    [t('schedule.day.wednesday')]: [
      { time: '16:00', title: 'Kids Hip-Hop', teacher: 'Maxim', level: t('styles.beginner') },
      { time: '18:00', title: 'Contemporary', teacher: 'Sofia', level: t('styles.advanced') },
      { time: '19:00', title: 'Jazz-Funk', teacher: 'Maxim', level: t('styles.intermediate') },
      { time: '21:00', title: 'Argentine Tango', teacher: 'Maxim', level: t('styles.advanced') },
    ],
    [t('schedule.day.thursday')]: [
      { time: '16:00', title: 'Kids Ballet', teacher: 'Sofia', level: t('styles.beginner') },
      { time: '18:00', title: 'Hip-Hop', teacher: 'Maxim', level: 'All Levels' },
      { time: '19:00', title: 'High Heels', teacher: 'Sofia', level: t('styles.intermediate') },
      { time: '20:00', title: 'Stretching', teacher: 'Sofia', level: 'All Levels' },
    ],
    [t('schedule.day.friday')]: [
      { time: '10:00', title: 'Kids Creative Movement', teacher: 'Sofia', level: t('styles.beginner') },
      { time: '11:00', title: 'Kids Hip-Hop', teacher: 'Maxim', level: t('styles.beginner') },
      { time: '17:00', title: 'Contemporary', teacher: 'Sofia', level: 'All Levels' },
      { time: '18:00', title: 'Jazz-Funk', teacher: 'Maxim', level: t('styles.intermediate') },
    ],
    [t('schedule.day.saturday')]: [
      { time: '10:00', title: 'Kids Ballet', teacher: 'Sofia', level: t('styles.beginner') },
      { time: '11:00', title: 'Hip-Hop', teacher: 'Maxim', level: t('styles.intermediate') },
      { time: '12:00', title: 'Stretching', teacher: 'Sofia', level: 'All Levels' },
    ],
    [t('schedule.day.sunday')]: [
      { time: '11:00', title: 'Kids Ballet', teacher: 'Sofia', level: t('styles.beginner') },
      { time: '17:00', title: 'Argentine Tango', teacher: 'Maxim', level: t('styles.advanced') },
      { time: '18:00', title: 'Contemporary', teacher: 'Sofia', level: t('styles.intermediate') },
    ],
  };
  */

  const dayGradients = [
    'from-purple-500 to-violet-600',
    'from-pink-500 to-rose-600',
    'from-orange-500 to-amber-600',
    'from-teal-500 to-cyan-600',
    'from-violet-500 to-purple-600',
    'from-cyan-500 to-blue-600',
    'from-indigo-500 to-purple-600',
  ];

  const scheduleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Schedule',
    name: t('seo-schedule.eilat-schedule')/*Eilat Dance Center Class Schedule*/,
    description: t('seo-schedule.eilat-schedule')/*Weekly dance class schedule featuring Hip-Hop, Ballet, Argentine Tango, Jazz-Funk, and more*/,
    scheduleTimezone: 'Asia/Jerusalem',
  };

  const eventListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('seo-schedule.event-list-name')/*Dance Classes*/,
    itemListElement: [
      {
        '@type': 'Event',
        name: 'Hip-Hop Dance Class',
        description: 'Urban dance style with high-energy choreography',
        eventSchedule: {
          '@type': 'Schedule',
          repeatFrequency: 'P1W',
          byDay: ['Monday', 'Wednesday'],
        },
        startTime: '18:00',
        duration: 'PT1H',
        location: {
          '@type': 'Place',
          name: 'Eilat Dance Center',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'HaTmarim Blvd 1',
            addressLocality: 'Eilat',
            addressCountry: 'IL',
          },
        },
        organizer: {
          '@type': 'DanceGroup',
          name: 'Eilat Dance Center',
        },
        performer: {
          '@type': 'Person',
          name: 'Maxim',
        },
      },
      {
        '@type': 'Event',
        name: 'Ballet Class',
        description: 'Classical ballet technique and performance',
        eventSchedule: {
          '@type': 'Schedule',
          repeatFrequency: 'P1W',
          byDay: ['Tuesday', 'Thursday'],
        },
        startTime: '17:00',
        duration: 'PT1H15M',
        location: {
          '@type': 'Place',
          name: 'Eilat Dance Center',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'HaTmarim Blvd 1',
            addressLocality: 'Eilat',
            addressCountry: 'IL',
          },
        },
        organizer: {
          '@type': 'DanceGroup',
          name: 'Eilat Dance Center',
        },
        performer: {
          '@type': 'Person',
          name: 'Sofia',
        },
      },
      {
        '@type': 'Event',
        name: 'Argentine Tango Class',
        description: 'Passionate partner dance from Argentina',
        eventSchedule: {
          '@type': 'Schedule',
          repeatFrequency: 'P1W',
          byDay: ['Wednesday', 'Sunday'],
        },
        startTime: '19:30',
        duration: 'PT1H30M',
        location: {
          '@type': 'Place',
          name: 'Eilat Dance Center',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'HaTmarim Blvd 1',
            addressLocality: 'Eilat',
            addressCountry: 'IL',
          },
        },
        organizer: {
          '@type': 'DanceGroup',
          name: 'Eilat Dance Center',
        },
        performer: {
          '@type': 'Person',
          name: 'Maxim',
        },
      },
    ],
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
        name: 'Schedule',
        item: 'https://eilatdance.com/schedule',
      },
    ],
  };

  return (
	<>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scheduleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }}
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
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4 md:mb-6 shadow-sm">
              <Calendar className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
              <span className="text-purple-700 text-xs md:text-sm">{t('schedule.badge')}</span>
            </div>
            <h1 className="text-3xl md:text-3xl lg:text-4xl text-gray-900 mb-4 md:mb-6 px-4">{t('schedule.title')}</h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t('schedule.subtitle')}
            </p>
          </div>

          {/* Week Toggle */}
          <div className="flex justify-center px-4">
            <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-1 md:p-1.5 shadow-md w-full sm:w-auto">
            <button
              onClick={() => setWeekOffset(0)}
              className={`px-6 md:px-10 py-3 md:py-4 rounded-full transition-all text-sm md:text-base flex-1 sm:flex-initial ${
                weekOffset === 0
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('schedule.this-week')/*This Week*/}
            </button>
            <button
              onClick={() => setWeekOffset(1)}
              className={`px-6 md:px-10 py-3 md:py-4 rounded-full transition-all text-sm md:text-base flex-1 sm:flex-initial ${
                weekOffset === 1
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('schedule.next-week')/*Next Week*/}
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Calendar Grid */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 md:gap-5">
          {weekDates.map((date, dayIndex) => {
			/*
            const dateStr = date.toISOString().slice(0, 10);
            const dayItems = scheduleItems.filter(i => i.day_date.startsWith(dateStr));
            const dayName = date.toLocaleDateString(language === 'he' ? 'he-IL' : language === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long' });
            const dayDateDisplay = date.toLocaleDateString(language === 'he' ? 'he-IL' : language === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short' });
            
            // Градиенты для дней недели (можно взять массив из старого кода)
            const gradient = 'from-purple-500 to-violet-600'; // Упрощено, можно вернуть массив

            return (
              <div key={dateStr} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full">
                {/* Header /}
                <div className={`bg-gradient-to-r ${gradient} text-white py-4 px-3 text-center`}>
                  <div className="font-bold uppercase tracking-wider text-sm">{dayName}</div>
                  <div className="text-xs opacity-90 mt-1">{dayDateDisplay}</div>
                </div>

                {/* Items /}
                <div className="p-3 space-y-3 flex-1 bg-gray-50/30">
                  {dayItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-xs italic">No classes</div>
                  ) : (
                    dayItems.map(item => (
                      <ScheduleCard 
                        key={item.id}
						item={}

                        dateStr={dayDateDisplay} // Передаем красивую дату для диалога
                        time={item.start_time.slice(0, 5)}
                        title={getLocalizedText(item.class_name, language)}
                        level={getLocalizedText(item.level, language)}
                        teacher={getLocalizedText(item.instructor_name, language)}
                      />
                    ))
                  )}
                </div>
              </div>
            );*/

			let day_of_week = (new Date(date)).getDay();
			if (day_of_week < 1) {
				day_of_week += 7;
			}
			const day = getDayName(day_of_week);

			const dayDateDisplay = date.toLocaleDateString(language === 'he' ? 'he-IL' : language === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short' });

			return (
            <div key={day} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              {/* Day Header */}
              <div className={`bg-gradient-to-r ${dayGradients[dayIndex]} text-white py-4 md:py-5 px-3 md:px-4 text-center`}>
                <div className="uppercase tracking-wider text-sm md:text-base">{day}<br/>{dayDateDisplay}</div>
              </div>

              {/* Classes */}
              <div className="p-3 md:p-4 space-y-2 md:space-y-3 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                {groupedSchedule[day]?.map((classItem, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedClass(classItem)}
                    className="w-full text-left p-3 md:p-4 bg-gray-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 rounded-xl md:rounded-2xl transition-all border border-gray-100 hover:border-purple-200 hover:shadow-md group"
                  >
                    <div className="flex items-center gap-1.5 md:gap-2 text-purple-600 mb-1.5 md:mb-2">
                      <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span className="text-xs md:text-sm">{classItem.start_time.slice(0, 5)}</span>
                    </div>
                    <div className="text-gray-900 mb-1 md:mb-1.5 text-sm md:text-base">{getLocalizedText(classItem.class_name, language)}</div>
                    <div className="text-gray-500 text-xs md:text-sm mb-0.5 md:mb-1">by {formatInstructors(classItem.instructors_data, language)}</div>
                    <div className="text-xs text-gray-400">{classItem.level}</div>
                  </button>
                ))}
              </div>
            </div>
			);
			})}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedClass && (
		<ScheduleCardDialog 
			selectedClass={selectedClass} 
			setSelectedClass={setSelectedClassLocal}
		/>
      )}
    </div>
	</>
  );
}