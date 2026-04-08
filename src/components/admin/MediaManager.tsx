'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Trash2, Upload, Check, ImageIcon } from 'lucide-react';

interface MediaManagerProps {
  mode: 'page' | 'select'; // Режим отображения
  context?: string; // Строка контекста для события
  onClose?: () => void; // Для закрытия диалога
}

export function MediaManager({ mode, context, onClose }: MediaManagerProps) {
  const [medias, setMedias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]); // Имена файлов в процессе
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Загрузка списка
  const fetchMedias = async () => {
    try {
      const res = await fetch('/api/media');
      setMedias(await res.json());
    } catch (e) {
      toast.error('Error loading media library');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMedias(); }, []);

  // Обработка загрузки файлов
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    
    // Добавляем в список "загружаемых" для UI
    setUploadingFiles(prev => [...prev, ...files.map(f => f.name)]);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error(`Failed to upload ${file.name}`);
        
        toast.success(`Uploaded: ${file.name}`);
      } catch (error) {
        toast.error(`Error uploading ${file.name}`);
      } finally {
        // Убираем из списка загружаемых
        setUploadingFiles(prev => prev.filter(name => name !== file.name));
      }
    }

    // Очищаем инпут и обновляем список
    if (fileInputRef.current) fileInputRef.current.value = '';
    fetchMedias();
  };

  // Удаление
  const handleDelete = async () => {
    if (!selectedId) return;
    if (!confirm('Are you sure to remove this media completely?')) return;

    try {
      const res = await fetch(`/api/media/${selectedId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      
      setMedias(medias.filter(m => m.id !== selectedId));
      setSelectedId(null);
      toast.success('Media deleted');
    } catch (e) {
      toast.error('Delete failed');
    }
  };

  // Выбор (отправка события)
  const handleSelect = () => {
    if (!selectedId) return;
    
    // Диспатчим кастомное событие
    const event = new CustomEvent('media_selected', {
      detail: {
        id: selectedId,
        context: context || '',
        media: medias.find(m => m.id === selectedId) // Передаем и сам объект для удобства
      }
    });
    window.dispatchEvent(event);
    
    if (onClose) onClose();
  };

  const selectedMedia = medias.find(m => m.id === selectedId);

  // Хелпер для получения URL превью 360x288 (или оригинала, если нет)
  const getThumbnailUrl = (media: any) => {
    let previews = media.previews;
    if (typeof previews === 'string') previews = JSON.parse(previews);
    
    const small = previews?.find((p: any) => p.ident === 'preview_360_288');
    const filename = small ? small.filename : media.orig_filename;
    
    return `${media.base_dir}${filename}`;
  };

  return (
    <div className={`flex flex-col h-full ${mode === 'page' ? 'gap-4' : 'gap-2'}`}>
      
      {/* Toolbar */}
      <div className="flex justify-between items-center bg-background p-2 rounded-md border">
        <div className="flex gap-2">
          <Button onClick={() => fileInputRef.current?.click()} variant="default" size="sm">
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            accept="image/*" 
            onChange={handleUpload}
          />
        </div>
        
        {/* Actions for Select Mode */}
        {mode === 'select' && (
          <div className="flex gap-2">
            <Button variant="destructive" size="sm" disabled={!selectedId} onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="default" size="sm" disabled={!selectedId} onClick={handleSelect}>
              <Check className="mr-2 h-4 w-4" /> Select
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden gap-4">
        {/* Grid Area */}
        <ScrollArea className="flex-1 border rounded-md p-4 bg-muted/10 h-[500px]">
          
          {/* Uploading Indicators */}
          {uploadingFiles.length > 0 && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-2 mb-4">
              {uploadingFiles.map((name, idx) => (
                <div key={idx} className="w-[60px] h-[60px] bg-muted animate-pulse rounded border flex items-center justify-center">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-2">
            {medias.map(media => (
              <div 
                key={media.id}
                onClick={() => setSelectedId(media.id === selectedId ? null : media.id)}
                className={`
                  relative w-[60px] h-[60px] cursor-pointer rounded overflow-hidden border-2
                  ${selectedId === media.id ? 'border-primary ring-2 ring-primary ring-offset-1' : 'border-transparent hover:border-gray-300'}
                `}
              >
                <img 
                  src={getThumbnailUrl(media)} 
                  alt={media.alt} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Sidebar Info (Only for Page Mode) */}
        {mode === 'page' && selectedMedia && (
          <Card className="w-80 p-4 shrink-0 overflow-y-auto">
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded overflow-hidden border">
                <img src={`${selectedMedia.base_dir}${selectedMedia.orig_filename}`} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-sm truncate" title={selectedMedia.title}>{selectedMedia.title}</h3>
                <p className="text-xs text-muted-foreground">{selectedMedia.orig_width}x{selectedMedia.orig_height} • {(selectedMedia.orig_filesize / 1024).toFixed(1)} KB</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-mono bg-muted p-2 rounded break-all">
                  {selectedMedia.base_dir}{selectedMedia.orig_filename}
                </p>
              </div>
              <Button variant="destructive" className="w-full" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Media
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}