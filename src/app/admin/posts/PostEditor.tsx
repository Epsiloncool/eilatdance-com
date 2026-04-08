'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, ImageIcon, Sparkles, X, Plus, Search } from 'lucide-react';
import { MediaDialog } from '@/components/admin/MediaDialog';

// Динамический импорт редактора (отключаем SSR для него)
const BlockEditor = dynamic(() => import('@/components/admin/BlockEditor'), { ssr: false });

interface PostEditorProps {
  initialData?: any;
}

export function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  // Данные поста
  const [title, setTitle] = useState(parseJson(initialData?.title));
  const [excerpt, setExcerpt] = useState(parseJson(initialData?.excerpt));
  const [content, setContent] = useState(parseJson(initialData?.content));

  const [slug, setSlug] = useState(initialData?.slug || '');
  
  // SEO States
  const [seoTitle, setSeoTitle] = useState(parseJson(initialData?.seo_title));
  const [seoDesc, setSeoDesc] = useState(parseJson(initialData?.seo_description));
  const [seoKeywords, setSeoKeywords] = useState(parseJson(initialData?.seo_keywords));
  const [seoCanonical, setSeoCanonical] = useState(parseJson(initialData?.seo_canonical));
  const [autoSeo, setAutoSeo] = useState(true); // По умолчанию включено для новых

  const [status, setStatus] = useState(initialData?.is_published ? 'published' : 'draft');
  const [isFeatured, setIsFeatured] = useState(!!initialData?.is_featured);

  const [publishedAt, setPublishedAt] = useState(initialData?.published_at ? new Date(initialData.published_at).toISOString().slice(0, 16) : '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id?.toString() || '');
  const [authorId, setAuthorId] = useState(initialData?.author_id?.toString() || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');

  // Цитата
  const parsedQuote = parseJson(initialData?.quote) || {};
  const [quoteText, setQuoteText] = useState(parsedQuote.text || { en: '', he: '', ru: '' });
  const [quoteAuthor, setQuoteAuthor] = useState(parsedQuote.author || '');

  // Справочники
  const [categories, setCategories] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);  

  // State для Related Articles
  const [relatedIds, setRelatedIds] = useState<number[]>(
    initialData?.related_ids && typeof initialData.related_ids === 'string' 
      ? JSON.parse(initialData.related_ids) 
      : initialData?.related_ids || []
  );

  const [allPosts, setAllPosts] = useState<any[]>([]); // Все посты для выбора
  const [isRelatedPickerOpen, setIsRelatedPickerOpen] = useState(false);
  const [relatedSearch, setRelatedSearch] = useState('');

  // --- HELPERS ---
  function parseJson(val: any) {
    if (!val) return { en: '', he: '', ru: '' };
    return typeof val === 'string' ? JSON.parse(val) : val;
  }

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Загрузка справочников
  useEffect(() => {
    const fetchData = async () => {
      const [catRes, userRes, allPosts] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/users'),
		fetch('/api/posts')
      ]);
      setCategories(await catRes.json());
      setAuthors(await userRes.json());
	  setAllPosts(await allPosts.json());
    };
    fetchData();
  }, []);

  // 1. АВТО-ГЕНЕРАЦИЯ SLUG
  useEffect(() => {
    // Генерируем только если это создание нового поста (нет initialData) 
    // или если slug был пустой и мы начали вводить заголовок
    if (!initialData && title.en && !slug) {
       // Но тут нюанс: если мы хотим "живое" обновление, нужно условие
       // "Пока пользователь не отредактировал slug вручную"
       // Простой вариант: если slug пустой (или равен предыдущей авто-версии), обновляем.
       // Для надежности делаем так: при создании всегда обновляем, если поле не трогали.
       // Реализуем проще: если slug пустой, заполняем.
       setSlug(slugify(title.en));
    }
  }, [title.en]); // Зависимость только от EN заголовка

  // 2. АВТО-ГЕНЕРАЦИЯ SEO
  useEffect(() => {
    if (autoSeo) {
      setSeoTitle({ ...title });
      setSeoDesc({ ...excerpt });
    }
  }, [title, excerpt, autoSeo]);

  // --- HANDLERS ---

  const handleLangChange = (setter: any, obj: any, lang: string, val: string) => {
    setter({ ...obj, [lang]: val });
  };

  // Специальный хендлер для SEO полей, отключающий авто-режим
  const handleSeoChange = (setter: any, obj: any, lang: string, val: string) => {
    setAutoSeo(false);
    setter({ ...obj, [lang]: val });
  };

  useEffect(() => {
    const handleMediaSelect = (e: CustomEvent) => {
      // Проверяем контекст
      if (e.detail.context === 'post_featured_image') {
        const media = e.detail.media;
        // Формируем полный путь к оригиналу или большой версии
        const fullUrl = `${media.base_dir}${media.orig_filename}`;
        setImageUrl(fullUrl); // Обновляем инпут
        setIsMediaOpen(false); // Закрываем (хотя компонент диалога сам может закрыться, это для надежности)
      }
    };

    window.addEventListener('media_selected', handleMediaSelect as EventListener);
    return () => window.removeEventListener('media_selected', handleMediaSelect as EventListener);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      quote: {
        text: quoteText,
        author: quoteAuthor
      },
      category_id: categoryId ? parseInt(categoryId) : null,
      author_id: authorId ? parseInt(authorId) : null,
      image_url: imageUrl,
      published_at: publishedAt,
	  is_published: status === 'published',
      is_featured: isFeatured,
	  related_ids: relatedIds,
    };

    try {
      const url = isEditing ? `/api/posts/${initialData.id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save');

      toast.success(isEditing ? 'Post updated' : 'Post created');
      router.push('/admin/posts');
      router.refresh();
    } catch (error) {
      toast.error('Error saving post');
    } finally {
      setLoading(false);
    }
  };

  const getName = (json: any) => {
    try { return (typeof json === 'string' ? JSON.parse(json) : json)?.en || 'Name'; } catch { return 'Error'; }
  };

  const handleAddRelated = (id: number) => {
    if (relatedIds.length >= 10) return toast.error('Max 10 related articles');
    if (!relatedIds.includes(id)) {
      setRelatedIds([...relatedIds, id]);
    }
    setIsRelatedPickerOpen(false);
    setRelatedSearch('');
  };

  const handleRemoveRelated = (id: number) => {
    setRelatedIds(relatedIds.filter(pid => pid !== id));
  };

  // Фильтрация списка для пикера
  const filteredPostsForPicker = allPosts
    .filter(p => p.id !== initialData?.id) // Исключаем текущий
    .filter(p => !relatedIds.includes(p.id)) // Исключаем уже выбранные
    .filter(p => { // Фильтр по поиску
       const enTitle = parseJson(p.title).en.toLowerCase();
       return enTitle.includes(relatedSearch.toLowerCase());
    })
    .slice(0, 20); // Лимит 20

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between sticky top-[4rem] z-20 bg-background/95 backdrop-blur py-4 border-b">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts">
            <Button variant="outline" size="icon" type="button"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Post' : 'New Post'}</h1>
        </div>
        <div className="flex gap-2">
            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[140px]">
					<SelectValue />
				</SelectTrigger>
                <SelectContent>
                	<SelectItem value="draft">Draft</SelectItem>
                	<SelectItem value="published">Published</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit" disabled={loading}>
            	<Save className="mr-2 h-4 w-4" />
				{loading ? 'Saving...' : 'Save'}
            </Button>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* ЛЕВАЯ КОЛОНКА - КОНТЕНТ */}
        <div className="xl:col-span-2 space-y-6">
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="en" className="text-base">English (Default)</TabsTrigger>
              <TabsTrigger value="he" className="text-base">Hebrew</TabsTrigger>
              <TabsTrigger value="ru" className="text-base">Russian</TabsTrigger>
            </TabsList>

            {['en', 'he', 'ru'].map((lang) => (
              <TabsContent key={lang} value={lang} className="space-y-6 mt-6">
                
                {/* Заголовок */}
                <div className="space-y-2">
                  <Label className="text-lg">Title ({lang.toUpperCase()})</Label>
                  <Input 
                    value={title[lang] || ''} 
                    onChange={(e) => handleLangChange(setTitle, title, lang, e.target.value)}
                    placeholder="Enter post title..."
                    className="text-lg py-6"
                    required={lang === 'en'}
                  />
                </div>

                {/* Цитата (Excerpt) */}
                <div className="space-y-2">
                  <Label>Excerpt / Summary ({lang.toUpperCase()})</Label>
                  <Textarea 
                    value={excerpt[lang] || ''} 
                    onChange={(e) => handleLangChange(setExcerpt, excerpt, lang, e.target.value)}
                    placeholder="Short summary for the blog list..."
                    className="h-24 resize-none"
                  />
                </div>

                {/* Основной контент */}
                <div className="space-y-2">
                  <Label>Content ({lang.toUpperCase()})</Label>
				  <div className="min-h-[400px]">
                    {/* Важно: рендерим BlockEditor только если вкладка активна, 
                        или передаем уникальный key, чтобы пересоздавать при смене языка, 
                        или держим 3 экземпляра скрытыми/видимыми.
                        
                        Лучший вариант для производительности React: держать состояние в `content[lang]`
                        и передавать в `initialContent`.
                    */}
                    <BlockEditor 
                      initialContent={JSON.parse(content[lang] || '[]')} 
                      onChange={(blocks) => handleLangChange(setContent, content, lang, JSON.stringify(blocks))}
                    />
                  </div>
				</div>

                {/* SEO Fields for this language */}
                <Card className="border-blue-100">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-blue-500" />
                            SEO Settings ({lang.toUpperCase()})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <Switch id={`auto-seo-${lang}`} checked={autoSeo} onCheckedChange={setAutoSeo} />
                            <Label htmlFor={`auto-seo-${lang}`} className="text-sm text-muted-foreground">
                                Auto-generate from content
                            </Label>
                        </div>

                        <div className="space-y-2">
                            <Label>Meta Title</Label>
                            <Input 
                                value={seoTitle[lang] || ''} 
                                onChange={(e) => handleSeoChange(setSeoTitle, seoTitle, lang, e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Meta Description</Label>
                            <Textarea 
                                value={seoDesc[lang] || ''} 
                                onChange={(e) => handleSeoChange(setSeoDesc, seoDesc, lang, e.target.value)}
                                className="h-20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Keywords (Comma separated)</Label>
                            <Input 
                                value={seoKeywords[lang] || ''} 
                                onChange={(e) => handleSeoChange(setSeoKeywords, seoKeywords, lang, e.target.value)}
                                placeholder="dance, eilat, hip hop..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Canonical URL</Label>
                            <Input 
                                value={seoCanonical[lang] || ''} 
                                onChange={(e) => handleSeoChange(setSeoCanonical, seoCanonical, lang, e.target.value)}
                                placeholder="Leave empty for default"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Блок Цитаты в тексте */}
                <Card className="bg-muted/30">
                  <CardHeader><CardTitle className="text-base">In-Post Quote ({lang.toUpperCase()})</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Quote Text</Label>
                      <Textarea 
                        value={quoteText[lang] || ''} 
                        onChange={(e) => handleLangChange(setQuoteText, quoteText, lang, e.target.value)}
                        placeholder="Inspirational quote text..."
                      />
                    </div>
                  </CardContent>
                </Card>

              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* ПРАВАЯ КОЛОНКА - НАСТРОЙКИ */}
        <div className="space-y-6">
		  {/* Status & Featured */}
          <Card>
            <CardHeader><CardTitle>Status & Visibility</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-2">
                <Label>Post Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between border p-3 rounded-md">
                <div className="space-y-0.5">
                  <Label className="text-base">Featured Post</Label>
                  <p className="text-xs text-muted-foreground">Pin to top of lists</p>
                </div>
                <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>

              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input type="datetime-local" value={publishedAt} onChange={e => setPublishedAt(e.target.value)} />
              </div>

            </CardContent>
          </Card>
		  <Card>
            <CardHeader><CardTitle>Author & Category</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-2">
                <Label>Author</Label>
                <Select value={authorId} onValueChange={setAuthorId}>
                  <SelectTrigger><SelectValue placeholder="Select author" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Not Set (Incognito)</SelectItem>
                    {authors.map(u => (
                      <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c.id} value={c.id.toString()}>{getName(c.name)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Attributes</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="url-slug" />
              </div>
              
		  	  <div className="space-y-2">
        		<Label>Featured Image</Label>
        		<div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2 overflow-hidden border relative group">
          		{imageUrl ? (
            		<img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
          		) : (
	            	<span className="text-muted-foreground text-sm">No Image</span>
          		)}
        		</div>
        		<div className="flex gap-2">
            		<Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
            		<Button variant="secondary" type="button" onClick={() => setIsMediaOpen(true)}>
              			Select
            		</Button>
        		</div>
      	  	  </div>

              <div className="space-y-2">
                <Label>Quote Author Name</Label>
                <Input 
                  value={quoteAuthor} 
                  onChange={(e) => setQuoteAuthor(e.target.value)} 
                  placeholder="Override default author name..." 
                />
                <p className="text-xs text-muted-foreground">Leave empty to use Post Author name</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Related Articles</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              
              {/* Список выбранных */}
              <div className="flex flex-wrap gap-2">
                {relatedIds.map(id => {
                  const post = allPosts.find(p => p.id === id);
                  if (!post) return null;
                  return (
                    <div key={id} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm border">
                      <span className="truncate max-w-[150px]">{parseJson(post.title).en}</span>
                      <button type="button" onClick={() => handleRemoveRelated(id)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
                
                {/* Кнопка добавления */}
                <div className="relative">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-dashed"
                    onClick={() => setIsRelatedPickerOpen(!isRelatedPickerOpen)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>

                  {/* Выпадающий список (кастомный Popover) */}
                  {isRelatedPickerOpen && (
                    <>
                      {/* Оверлей для закрытия кликом вне */}
                      <div className="fixed inset-0 z-10" onClick={() => setIsRelatedPickerOpen(false)} />
                      
                      <div className="absolute top-full left-0 mt-2 w-64 bg-popover border rounded-md shadow-lg z-20 p-2">
                        <div className="flex items-center px-2 pb-2 border-b mb-2">
                          <Search className="h-3 w-3 mr-2 opacity-50" />
                          <input 
                            className="flex-1 bg-transparent outline-none text-sm"
                            placeholder="Search posts..."
                            value={relatedSearch}
                            onChange={(e) => setRelatedSearch(e.target.value)}
                            autoFocus
                          />
                        </div>
                        
                        <div className="max-h-48 overflow-y-auto space-y-1">
                          {filteredPostsForPicker.map(post => (
                            <button
                              key={post.id}
                              type="button"
                              onClick={() => handleAddRelated(post.id)}
                              className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent flex items-center justify-between
                                ${!post.is_published ? 'text-muted-foreground bg-muted/30' : ''}
                              `}
                            >
                              <span className="truncate">{parseJson(post.title).en}</span>
                              {!post.is_published && <span className="text-[10px] uppercase border px-1 rounded ml-2">Draft</span>}
                            </button>
                          ))}
                          {filteredPostsForPicker.length === 0 && (
                            <div className="text-xs text-muted-foreground p-2 text-center">No posts found</div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Select up to 10 articles.</p>
            </CardContent>
          </Card>		  
        </div>

      </div>
	  <MediaDialog 
        open={isMediaOpen} 
        onOpenChange={setIsMediaOpen} 
        context="post_featured_image" 
      />
    </form>
  );
}
