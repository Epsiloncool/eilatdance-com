'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export function CategoryEditor({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const isEditing = !!initialData;
  
  const [name, setName] = useState(
    initialData?.name && typeof initialData.name === 'string' 
      ? JSON.parse(initialData.name) 
      : initialData?.name || { en: '', he: '', ru: '' }
  );
  
  const [description, setDescription] = useState(
    initialData?.description && typeof initialData.description === 'string'
      ? JSON.parse(initialData.description)
      : initialData?.description || { en: '', he: '', ru: '' }
  );

  const [color, setColor] = useState(initialData?.color || '');
  const [gradient, setGradient] = useState(initialData?.gradient || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/categories/${initialData.id}` : '/api/categories';
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, color, gradient }),
      });

      if (!res.ok) throw new Error();
      
      toast.success('Saved successfully');
      router.push('/admin/categories');
      router.refresh();
    } catch (e) {
      toast.error('Error saving');
    }
  };

  const handleLangChange = (setter: any, obj: any, lang: string, val: string) => {
    setter({ ...obj, [lang]: val });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/categories">
            <Button variant="outline" size="icon" type="button"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Category' : 'New Category'}</h1>
        </div>
        <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="en">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="en">EN</TabsTrigger>
                <TabsTrigger value="he">HE</TabsTrigger>
                <TabsTrigger value="ru">RU</TabsTrigger>
              </TabsList>
              {['en', 'he', 'ru'].map(lang => (
                <TabsContent key={lang} value={lang} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name ({lang.toUpperCase()})</Label>
                    <Input 
                      value={name[lang] || ''} 
                      onChange={e => handleLangChange(setName, name, lang, e.target.value)} 
                      required={lang === 'en'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Short Description ({lang.toUpperCase()})</Label>
                    <Input 
                      value={description[lang] || ''} 
                      onChange={e => handleLangChange(setDescription, description, lang, e.target.value)} 
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>CSS Color Classes</Label>
              <Input value={color} onChange={e => setColor(e.target.value)} placeholder="e.g. bg-blue-50 text-blue-700" />
              <div className={`p-2 rounded text-sm ${color} border`}>Preview Text</div>
            </div>
            <div className="space-y-2">
              <Label>CSS Gradient Classes</Label>
              <Input value={gradient} onChange={e => setGradient(e.target.value)} placeholder="e.g. from-blue-500 to-cyan-600" />
              <div className={`h-10 rounded bg-gradient-to-r ${gradient}`}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}