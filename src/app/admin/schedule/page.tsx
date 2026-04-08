'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Plus, HelpCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ScheduleItemDialog } from './ScheduleItemDialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScheduleItem } from '@/types/schedule_item';

interface ScheduleDay {
	dateObj: Date;
	iso: string;
    dayName: string;
	dayNum: number;
    isPast: boolean;
    displayDate: string;
}

export default function AdminSchedulePage() {
  const [items, setItems] = useState<any[]>([]);
  const [presets, setPresets] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Состояние диалога
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<{ date: string, dayNum: number, name: string } | null>(null);

  // Вычисляем даты: Понедельник текущей недели -> +13 дней
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [daysList, setDaysList] = useState<any[]>([]);

  useEffect(() => {
    // Находим понедельник текущей недели
    const today = new Date();
    const day = today.getDay(); // 0=Sun, 1=Mon
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    setStartDate(monday);

    // Генерируем массив из 14 дней
    const days: ScheduleDay[] = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 14; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
	  const forIso = new Date(d.getTime() - (new Date()).getTimezoneOffset() * 60000);
      const iso = forIso.toISOString().slice(0, 10);
      const isPast = d < new Date(new Date().setHours(0,0,0,0));
      
      // dayNum для БД (1=Mon...7=Sun)
      // JS: 0=Sun, 1=Mon...
      let dayNum = d.getDay();
      if (dayNum === 0) dayNum = 7;

      days.push({
        dateObj: d,
        iso: iso,
        dayName: dayNames[d.getDay()],
        dayNum: dayNum,
        isPast: isPast,
        displayDate: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      });
    }
    setDaysList(days);

    // Загружаем данные
    fetchData(days[0].iso, days[13].iso);
    
    // Загружаем справочники
    Promise.all([fetch('/api/styles'), fetch('/api/users')])
      .then(async ([resS, resU]) => {
        setPresets(await resS.json());
        setInstructors(await resU.json());
      });

  }, []);

  const fetchData = async (from: string, to: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/schedule?from=${from}&to=${to}`);
	  const data: ScheduleItem[] = await res.json();

	  for (let ii in data) {
		const item = data[ii];
		const d = new Date(item.day_date);
		const forIso = new Date(d.getTime() - (new Date()).getTimezoneOffset() * 60000);
      	const iso = forIso.toISOString().slice(0, 10);
		data[ii].day_date = iso;
	  }

	  console.log(data);
      setItems(data);
    } catch (e) {
      toast.error('Error loading schedule');
    } finally {
      setLoading(false);
    }
  };

  const reload = () => {
    if (daysList.length > 0) fetchData(daysList[0].iso, daysList[13].iso);
  };

  // Handlers
  const handleAdd = (day: any) => {
    if (day.isPast) toast.info('Adding to a past date');
    setSelectedDay({ date: day.iso, dayNum: day.dayNum, name: day.dayName });
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: any, day: any) => {
    setSelectedDay({ date: day.iso, dayNum: day.dayNum, name: day.dayName });
    setEditingItem(item);
    setDialogOpen(true);
  };

  const parseEn = (json: any) => {
    try { return (typeof json === 'string' ? JSON.parse(json) : json)?.en || ''; } catch { return ''; }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Schedule</h1>
      
      {loading && items.length === 0 ? (
        <div className="text-center py-10"><Loader2 className="animate-spin h-8 w-8 mx-auto" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
          {daysList.map((day) => {
            const dayItems = items.filter(i => i.day_date.startsWith(day.iso));
            
            return (
              <Card key={day.iso} className={`flex flex-col h-full ${day.isPast ? 'opacity-60 bg-gray-50' : 'border-blue-100 shadow-sm'}`}>
                <CardHeader className="py-3 px-4 border-b bg-white/50">
                  <div className="flex justify-between items-center">
                    <span className={`font-bold ${day.isPast ? 'text-muted-foreground' : 'text-blue-900'}`}>{day.dayName}</span>
                    <span className="text-xs text-muted-foreground bg-white px-2 py-1 rounded border">{day.displayDate}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-2 flex-1 space-y-2">
                  {dayItems.map(item => (
                    <div key={item.id} className="bg-white border rounded p-2 text-sm relative group hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-blue-600">{item.start_time.slice(0, 5)}</span>
                        <div className="flex gap-1">
                          {/* Иконка комментария */}
                          {parseEn(item.comment) && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="h-3 w-3 text-orange-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent><p>{parseEn(item.comment)}</p></TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          {/* Кнопка редактирования */}
                          <button onClick={() => handleEdit(item, day)} className="text-gray-400 hover:text-blue-600">
                            <Edit className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="font-medium mt-1 truncate">{parseEn(item.class_name)}</div>
                      <div className="text-xs text-muted-foreground flex justify-between mt-1">
                        <span>{item.level}</span>
                        <span className="capitalize text-[10px] bg-gray-100 px-1 rounded">{item.category}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Button */}
                  <Button variant="ghost" className="w-full h-8 border border-dashed text-muted-foreground hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50" onClick={() => handleAdd(day)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dialog */}
      {selectedDay && (
        <ScheduleItemDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen}
          dateStr={selectedDay.date}
          dayName={selectedDay.name}
          dayOfWeek={selectedDay.dayNum}
          initialData={editingItem}
          presets={presets}
          instructors={instructors}
          onSuccess={reload}
        />
      )}
    </div>
  );
}
