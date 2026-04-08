'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScheduleItemDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  dateStr: string;
  dayName: string;
  dayOfWeek: number;
  initialData?: any;
  onSuccess: () => void;
  presets?: any[];
  instructors?: any[];
}

export function ScheduleItemDialog({ 
  open, onOpenChange, dateStr, dayName, dayOfWeek, initialData, onSuccess, presets = [], instructors = []
}: ScheduleItemDialogProps) {
  
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);

  // States
  const [startTime, setStartTime] = useState('18:00');
  const [className, setClassName] = useState({ en: '', he: '', ru: '' });
  // Level теперь строка (выбор из селекта), но мы храним его как JSON для совместимости с API, 
  // или если он был мультиязычным. Но по новому ТЗ "селект из вариантов".
  // Чтобы не ломать БД (там JSON), будем сохранять {en: value, he: value, ru: value}.
  const [levelVal, setLevelVal] = useState('All Levels'); 
  
  const [category, setCategory] = useState('all');
  const [comment, setComment] = useState({ en: '', he: '', ru: '' });
  //const [instructorId, setInstructorId] = useState('0');
  const [price, setPrice] = useState('');

  const [errorInstructor, setErrorInstructor] = useState(false);
  const [selectedInstructors, setSelectedInstructors] = useState<number[]>([]);

  // Сортировка пресетов
  const sortedPresets = [...presets].sort((a, b) => {
    const nameA = (typeof a.name === 'string' ? JSON.parse(a.name) : a.name)?.en || '';
    const nameB = (typeof b.name === 'string' ? JSON.parse(b.name) : b.name)?.en || '';
    return nameA.localeCompare(nameB);
  });

  // Заполнение формы
  useEffect(() => {
    if (initialData) {
      setStartTime(initialData.start_time.slice(0, 5));
      setClassName(parseJson(initialData.class_name));

	  const lvl = initialData.level;
      setLevelVal(lvl || 'All Levels'); // Берем EN как значение селекта
      
      setCategory(initialData.category || 'all');
      setComment(parseJson(initialData.comment));
      setSelectedInstructors(initialData.instructors || []);
	  setPrice(initialData.price || '');
    } else {
      setStartTime('18:00');
      setClassName({ en: '', he: '', ru: '' });
      setLevelVal('All Levels');
      setCategory('all');
      setComment({ en: '', he: '', ru: '' });
      setSelectedInstructors([]);
	  setPrice('');
    }
  }, [initialData, open]);

  const parseJson = (val: any) => (typeof val === 'string' ? JSON.parse(val) : val || { en: '', he: '', ru: '' });
  const handleLangChange = (setter: any, obj: any, lang: string, val: string) => setter({ ...obj, [lang]: val });

  // Применение пресета
  const applyPreset = (styleId: string) => {
    const style = presets.find(p => p.id.toString() === styleId);
    if (style) {
      const styleName = parseJson(style.name);
      setClassName(styleName); 
      if (style.category) setCategory(style.category === 'kids' ? 'kids' : 'adults'); // Маппинг 'adults' -> 'adults'
      if (style.level) setLevelVal(style.level);
	  if (style.price) setPrice(style.price.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

	if (!selectedInstructors || (selectedInstructors.length < 1)) {
	  setErrorInstructor(true);
      toast.error('Please select instructor(s)');
      return;
    }
	setErrorInstructor(false);

    setLoading(true);

    try {
      const url = isEditing ? `/api/schedule/${initialData.id}` : '/api/schedule';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day_date: dateStr,
          start_time: startTime,
          class_name: className,
          // Сохраняем level как мультиязычный объект, дублируя значение
          level: levelVal,
          category,
          comment,
          instructors: selectedInstructors ? selectedInstructors : [],
		  price: price ? parseFloat(price) : null, 
        }),
      });

      if (!res.ok) throw new Error();
      toast.success('Saved');
      onSuccess();
      onOpenChange(false);
    } catch (e) {
      toast.error('Error saving');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData || !confirm('Delete this class?')) return;
    try {
        await fetch(`/api/schedule/${initialData.id}`, { method: 'DELETE' });
        toast.success('Deleted');
        onSuccess();
        onOpenChange(false);
    } catch (e) { toast.error('Error'); }
  };

  const removeInstructor = (idToRemove: number) => {
    setSelectedInstructors((prev) => prev.filter((id) => id !== idToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Class' : 'Add Class'} — {dayName} [{dateStr}]</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          
          {/* Верхний ряд: Время и Пресет */}
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
            </div>
            
            <div className="space-y-2">
              <Label className="text-muted-foreground font-normal">Load from Preset (Style)</Label>
              <Select onValueChange={applyPreset}>
                <SelectTrigger><SelectValue placeholder="Select a style..." /></SelectTrigger>
                <SelectContent>
                  {sortedPresets.map(p => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {parseJson(p.name).en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Второй ряд: Категория и Уровень */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                  <SelectItem value="adults">Adults</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Level</Label>
              <Select value={levelVal} onValueChange={setLevelVal}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Levels">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

  		  <div className="space-y-2">
    		<Label>Price (ILS)</Label>
    		<Input 
      			type="number" 
      			value={price} 
      			onChange={(e) => setPrice(e.target.value)} 
      			placeholder="e.g. 60"
    		/>
  		  </div>

          {/* Мультиязычные поля: Название и Комментарий */}
          <Tabs defaultValue="en">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="en">EN</TabsTrigger>
              <TabsTrigger value="he">HE</TabsTrigger>
              <TabsTrigger value="ru">RU</TabsTrigger>
            </TabsList>
            
            {['en', 'he', 'ru'].map(lang => (
              <TabsContent key={lang} value={lang} className="space-y-4">
                <div className="space-y-2">
                  <Label>Class Name ({lang.toUpperCase()})</Label>
                  <Input 
                    value={className[lang as 'en' | 'he' | 'ru'] || ''} 
                    onChange={e => handleLangChange(setClassName, className, lang, e.target.value)} 
                    required={lang === 'en'}
                    placeholder="Enter name manually or use preset"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Comment / Note ({lang.toUpperCase()})</Label>
                  <Textarea 
                    value={comment[lang as 'en' | 'he' | 'ru'] || ''} 
                    onChange={e => handleLangChange(setComment, comment, lang, e.target.value)} 
                    placeholder="Optional details..."
                    className="h-20"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="space-y-2">
            <Label className={errorInstructor ? "text-red-500" : ""}>Instructor(s) *</Label>
            
	    		<div className="flex flex-wrap gap-2 mb-2">
        		{selectedInstructors.map(id => {
            		const instr = instructors.find(i => i.id === id);
            		return (
                		<Badge key={id} variant="secondary" className="cursor-pointer" onClick={() => removeInstructor(id)}>
                    	{instr?.name} <X className="h-3 w-3 ml-1" />
                		</Badge>
            	)
	        })}
		    </div>
    	  	<Select onValueChange={(val) => {
        		const id = parseInt(val);
        		if (id && (!selectedInstructors.includes(id))) {
					setSelectedInstructors([...selectedInstructors, id]);
				}
    		}}>
        		<SelectTrigger><SelectValue placeholder="Add instructor..." /></SelectTrigger>
        	<SelectContent>
            	{instructors.filter(i => i.is_instructor).map(i => ( // Фильтруем только инструкторов
                	<SelectItem key={i.id} value={i.id.toString()}>{i.name}</SelectItem>
            	))}
        	</SelectContent>
    		</Select>			
          </div>

          <div className="flex justify-between pt-4 border-t mt-4">
            {isEditing ? (
                <Button type="button" variant="destructive" onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            ) : <div />}
            
            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            </div>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}