'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface VideoModalProps {
  url: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ url, isOpen, onClose }: VideoModalProps) {
  // Блокируем скролл страницы когда модалка открыта
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Закрытие по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !url) return null;

  const getEmbedUrl = (videoUrl: string) => {
    let videoId = '';
    if (videoUrl.includes('youtube.com/watch?v=')) {
      videoId = videoUrl.split('v=')[1]?.split('&')[0];
    } else if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
    } else if (videoUrl.includes('youtube.com/embed/')) {
      videoId = videoUrl.split('embed/')[1]?.split('?')[0];
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    return videoUrl;
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* 
         w-[90%] - мобильные устройства
         md:w-[80%] - планшеты и десктопы (как вы просили)
         max-w-7xl - ограничение для очень больших экранов
         aspect-video - фиксирует соотношение 16:9
      */}
      <div 
        className="relative w-videomodal max-w-7xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md group"
        >
          <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
        
        <iframe
          src={getEmbedUrl(url)}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}