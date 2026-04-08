'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

interface ReviewEditorProps {
  initialData?: any;
}

export function ReviewEditor({ initialData }: ReviewEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);

  // Инициализация мультиязычных полей
  const [authorName, setAuthorName] = useState(
    initialData?.author_name && typeof initialData.author_name === 'string'
      ? JSON.parse(initialData.author_name)
      : initialData?.author_name || { en: '', he: '', ru: '' }
  );

  const [content, setContent] = useState(
    initialData?.content && typeof initialData.content === 'string'
      ? JSON.parse(initialData.content)
      : initialData?.content || { en: '', he: '', ru: '' }
  );

  const [videoUrl, setVideoUrl] = useState(initialData?.video_url || '');
  const [isFeatured, setIsFeatured] = useState(!!initialData?.is_featured);

  const handleLangChange = (setter: any, obj: any, lang: string, val: string) => {
    setter({ ...obj, [lang]: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/reviews/${initialData.id}` : '/api/reviews';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: authorName,
          content,
          video_url: videoUrl,
          is_featured: isFeatured
        }),
      });

      if (!res.ok) throw new Error();
      toast.success('Review saved');
      router.push('/admin/reviews');
      router.refresh();
    } catch (e) {
      toast.error('Error saving');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/reviews">
            <Button variant="outline" size="icon" type="button"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Review' : 'New Review'}</h1>
        </div>
        <Button type="submit" disabled={loading}>
          <Save className="mr-2 h-4 w-4" /> Save
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Левая колонка: Мультиязычный контент */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader><CardTitle>Review Content</CardTitle></CardHeader>
            <CardContent>
              <Tabs defaultValue="en">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="he">Hebrew</TabsTrigger>
                  <TabsTrigger value="ru">Russian</TabsTrigger>
                </TabsList>

                {['en', 'he', 'ru'].map(lang => (
                  <TabsContent key={lang} value={lang} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Author Name ({lang.toUpperCase()})</Label>
                      <Input 
                        value={authorName[lang] || ''} 
                        onChange={e => handleLangChange(setAuthorName, authorName, lang, e.target.value)}
                        placeholder="Student Name"
                        required={lang === 'en'} // EN обязателен как фоллбэк
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Review Text ({lang.toUpperCase()})</Label>
                      <Textarea 
                        value={content[lang] || ''} 
                        onChange={e => handleLangChange(setContent, content, lang, e.target.value)}
                        className="h-40"
                        placeholder="What did they say?"
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Правая колонка: Общие настройки */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-center justify-between border p-3 rounded-md">
                <div className="space-y-0.5">
                  <Label>Featured</Label>
                  <p className="text-xs text-muted-foreground">Show on homepage</p>
                </div>
                <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>

              <div className="space-y-2">
                <Label>Video URL</Label>
                <Input 
                  value={videoUrl} 
                  onChange={e => setVideoUrl(e.target.value)} 
                  placeholder="https://youtube.com/..."
                />
                <p className="text-xs text-muted-foreground">Optional. Leave empty for text-only card.</p>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </form>
  );
}