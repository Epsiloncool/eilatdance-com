'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, ImageIcon, Palette } from 'lucide-react';
import { MediaDialog } from '@/components/admin/MediaDialog';

// Список пресетов
const GRADIENT_PRESETS = [
  { name: 'Pink & Rose', value: 'from-pink-500 to-rose-600' },
  { name: 'Orange & Amber', value: 'from-orange-500 to-amber-600' },
  { name: 'Purple & Violet', value: 'from-purple-500 to-violet-600' },
  { name: 'Teal & Cyan', value: 'from-teal-500 to-cyan-600' },
  { name: 'Violet & Purple', value: 'from-violet-500 to-purple-600' },
  { name: 'Red & Pink', value: 'from-red-500 to-pink-600' },
  { name: 'Yellow & Orange', value: 'from-yellow-500 to-orange-600' },
  { name: 'Teal & Emerald', value: 'from-teal-500 to-emerald-600' },
  { name: 'Indigo & Blue', value: 'from-indigo-500 to-blue-600' },
];

interface StyleEditorProps {
  initialData?: any;
}

export function StyleEditor({ initialData }: StyleEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const [price, setPrice] = useState(initialData?.price || '');

  // --- Состояние формы ---

  // Мультиязычное название
  const [name, setName] = useState(
    initialData?.name && typeof initialData.name === 'string'
      ? JSON.parse(initialData.name)
      : initialData?.name || { en: '', he: '', ru: '' }
  );

  // Мультиязычное описание
  const [description, setDescription] = useState(
    initialData?.description && typeof initialData.description === 'string'
      ? JSON.parse(initialData.description)
      : initialData?.description || { en: '', he: '', ru: '' }
  );

  // Другие поля
  const [level, setLevel] = useState(initialData?.level || 'All Levels');
  const [category, setCategory] = useState(initialData?.category || 'adults');  
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [gradient, setGradient] = useState(initialData?.gradient || 'from-purple-500 to-pink-600');

  // --- Эффекты ---

  // Обработка выбора изображения из MediaDialog
  useEffect(() => {
    const handleMediaSelect = (e: CustomEvent) => {
      // Проверяем контекст, чтобы убедиться, что событие для этого поля
      if (e.detail.context === 'style_image') {
        const media = e.detail.media;
        // Формируем путь
        const fullUrl = `${media.base_dir}${media.orig_filename}`;
        setImageUrl(fullUrl);
        setIsMediaOpen(false); // Закрываем диалог
      }
    };

    window.addEventListener('media_selected', handleMediaSelect as EventListener);
    
    return () => {
      window.removeEventListener('media_selected', handleMediaSelect as EventListener);
    };
  }, []);

  // --- Хендлеры ---

  const handleLangChange = (setter: any, obj: any, lang: string, val: string) => {
    setter({ ...obj, [lang]: val });
  };

  const handlePresetSelect = (value: string) => {
    setGradient(value);
    setIsPresetOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/styles/${initialData.id}` : '/api/styles';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          level,
		  category,
          image_url: imageUrl,
          gradient,
		  price: price ? parseFloat(price) : null,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success(isEditing ? 'Style updated successfully' : 'Style created successfully');
      router.push('/admin/styles');
      router.refresh();
    } catch (e) {
      toast.error('Error saving style');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between sticky top-[4rem] z-20 bg-background/95 backdrop-blur py-4 border-b">
        <div className="flex items-center gap-4">
          <Link href="/admin/styles">
            <Button variant="outline" size="icon" type="button">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Style' : 'New Dance Style'}</h1>
        </div>
        <Button type="submit" disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Style'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Левая колонка: Текстовый контент (2/3 ширины) */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Multilingual Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="en">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="en">English (Default)</TabsTrigger>
                  <TabsTrigger value="he">Hebrew</TabsTrigger>
                  <TabsTrigger value="ru">Russian</TabsTrigger>
                </TabsList>

                {['en', 'he', 'ru'].map((lang) => (
                  <TabsContent key={lang} value={lang} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Style Name ({lang.toUpperCase()})</Label>
                      <Input
                        value={name[lang] || ''}
                        onChange={(e) => handleLangChange(setName, name, lang, e.target.value)}
                        placeholder="e.g. Hip Hop"
                        required={lang === 'en'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Short Description ({lang.toUpperCase()})</Label>
                      <Textarea
                        value={description[lang] || ''}
                        onChange={(e) => handleLangChange(setDescription, description, lang, e.target.value)}
                        className="h-32 resize-none"
                        placeholder="Brief description for the card..."
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Правая колонка: Настройки отображения (1/3 ширины) */}
        <div className="space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle>Appearance & Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Category Select */}
              <div className="space-y-2">
                <Label>Target Audience (Category)</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kids">Kids</SelectItem>
                    <SelectItem value="adults">Adults</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Level Select */}
              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Levels">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
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
			  
              {/* Gradient Input */}
              <div className="space-y-2">
                <Label>Gradient Classes</Label>
                <div className="flex gap-2">
                <Input 
                  value={gradient} 
                  onChange={(e) => setGradient(e.target.value)} 
            	  onChangeCapture={(e) => setGradient(e.currentTarget.value)}
                  placeholder="from-purple-500 to-pink-600"
                />
                  <Popover open={isPresetOpen} onOpenChange={setIsPresetOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon" type="button" title="Choose Preset">
                        <Palette className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2" align="end">
                      <div className="grid gap-1">
                        <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Select a Preset</div>
                        {GRADIENT_PRESETS.map((preset) => (
                          <button
                            key={preset.value}
                            onClick={() => handlePresetSelect(preset.value)}
                            className={`
                              w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md
                              bg-gradient-to-r ${preset.value}
                            `}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                  <div className={`h-12 rounded-md bg-gradient-to-r ${gradient} flex items-center justify-center text-white font-medium shadow-sm transition-all duration-300`}>
                    Style Card
                  </div>
                </div>
              </div>

              {/* Image Uploader */}
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div 
                  className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2 overflow-hidden border relative group cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setIsMediaOpen(true)}
                >
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <ImageIcon className="h-8 w-8 mb-2" />
                      <span className="text-xs">Click to select</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      <Upload className="h-4 w-4" /> Change
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    placeholder="https://..." 
                    className="text-xs"
                  />
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>

      {/* Media Selection Dialog */}
      <MediaDialog 
        open={isMediaOpen} 
        onOpenChange={setIsMediaOpen} 
        context="style_image" 
      />
    </form>
  );
}