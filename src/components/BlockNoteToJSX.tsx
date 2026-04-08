import React, { JSX } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// --- Types ---

type BlockStyles = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  code?: boolean;
  textColor?: string;
  backgroundColor?: string;
};

type InlineContent = {
  type: 'text' | 'link';
  text?: string;
  content?: string | InlineContent[];
  href?: string;
  styles?: BlockStyles;
};

type BlockProps = {
  backgroundColor?: string;
  textColor?: string;
  textAlignment?: 'left' | 'center' | 'right' | 'justify';
  level?: 1 | 2 | 3;
  url?: string;
  caption?: string;
  name?: string;
};

type TableContent = {
  type: 'tableContent';
  rows: {
    cells: InlineContent[][]; // Ячейка - это массив инлайн-контента
  }[];
};

type Block = {
  id?: string;
  type: string;
  props?: BlockProps;
  content?: string | InlineContent[];
  children?: Block[]; // Для вложенных списков
};

// --- Helpers ---

// Маппинг цветов BlockNote в классы Tailwind
const getColorClass = (color: string | undefined, type: 'text' | 'bg') => {
  if (!color || color === 'default') return '';

  const colors: Record<string, string> = {
    gray: 'gray',
    brown: 'amber', // brown нет в tailwind, используем amber
    orange: 'orange',
    yellow: 'yellow',
    green: 'green',
    blue: 'blue',
    purple: 'purple',
    pink: 'pink',
    red: 'red',
  };

  const baseColor = colors[color] || 'gray';

  if (type === 'text') return `text-${baseColor}-600`;
  if (type === 'bg') return `bg-${baseColor}-100`;
  return '';
};

// Генерация общих классов для блока (выравнивание, цвета)
const getBlockClasses = (props?: BlockProps) => {
  if (!props) return '';
  return cn(
    props.textAlignment && `text-${props.textAlignment}`,
    getColorClass(props.textColor, 'text'),
    getColorClass(props.backgroundColor, 'bg'),
    props.backgroundColor && props.backgroundColor !== 'default' && 'p-1 rounded' // Если есть фон, добавляем отступ
  );
};

// Рендеринг инлайн-контента (жирный, курсив, ссылки)
const RenderInline = ({ content }: { content: string | InlineContent[] | undefined }) => {
  if (!content) return null;
  if (typeof content === 'string') return <>{content}</>;

  return (
    <>
      {content.map((segment, index) => {
        let element: React.ReactNode;

        if (segment.type === 'link') {
          element = (
            <Link 
              href={segment.href || '#'} 
              className="text-purple-600 underline hover:text-purple-800 transition-colors"
              target={segment.href?.startsWith('http') ? '_blank' : undefined}
            >
              {Array.isArray(segment.content) 
                ? <RenderInline content={segment.content} /> 
                : segment.content || segment.href}
            </Link>
          );
        } else {
          element = <>{segment.text}</>;
        }

        // Применяем стили
        if (segment.styles) {
          if (segment.styles.bold) element = <strong>{element}</strong>;
          if (segment.styles.italic) element = <em>{element}</em>;
          if (segment.styles.underline) element = <u>{element}</u>;
          if (segment.styles.strike) element = <s>{element}</s>;
          if (segment.styles.code) element = <code className="bg-gray-100 px-1 rounded font-mono text-sm text-pink-600">{element}</code>;
          
          const textColor = getColorClass(segment.styles.textColor, 'text');
          const bgColor = getColorClass(segment.styles.backgroundColor, 'bg');
          
          if (textColor || bgColor) {
            element = <span className={cn(textColor, bgColor, bgColor && 'px-0.5 rounded')}>{element}</span>;
          }
        }

        return <React.Fragment key={index}>{element}</React.Fragment>;
      })}
    </>
  );
};

// --- Block Renderers ---

const ParagraphBlock = ({ block }: { block: Block }) => {
  // Проверка на массив
  const isEmpty = !block.content || (Array.isArray(block.content) && block.content.length === 0);
  
  if (isEmpty) {
    return <div className="h-4" />;
  }
  return (
    <p className={cn("text-gray-700 mb-4 leading-relaxed", getBlockClasses(block.props))}>
      <RenderInline content={block.content as InlineContent[]} />
    </p>
  );
};

const HeadingBlock = ({ block }: { block: Block }) => {
  const level = block.props?.level || 1;
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  // Размеры в зависимости от уровня
  const sizeClasses = {
    1: "text-3xl md:text-4xl mt-12 mb-6 font-bold text-gray-900",
    2: "text-2xl md:text-3xl mt-10 mb-5 font-bold text-gray-900",
    3: "text-xl md:text-2xl mt-8 mb-4 font-bold text-gray-900",
  };

  return (
    <Tag className={cn(sizeClasses[level], getBlockClasses(block.props))}>
      <RenderInline content={block.content as InlineContent[]} />
    </Tag>
  );
};

const QuoteBlock = ({ block }: { block: Block }) => {
  // Создаем глубокую копию контента, чтобы можно было модифицировать массив (удалять строку автора),
  // не мутируя исходные данные пропсов.
  let mainContent: InlineContent[] = block.content 
    ? JSON.parse(JSON.stringify(block.content)) 
    : [];
  let authorText: string | null = null;

  if (Array.isArray(mainContent) && mainContent.length > 0) {
    const lastIndex = mainContent.length - 1;
    const lastSegment = mainContent[lastIndex];

    // Работаем только если последний сегмент - это текст
    if (lastSegment.type === 'text' && lastSegment.text) {
      // Разбиваем текст на строки
      const lines = lastSegment.text.split('\n');
      
      // Ищем индекс последней непустой строки
      let authorLineIndex = -1;
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim().length > 0) {
          authorLineIndex = i;
          break;
        }
      }

      // Если строка найдена и начинается с "- "
      if (authorLineIndex !== -1) {
        const line = lines[authorLineIndex].trim();
        if (line.startsWith('- ')) {
          // Извлекаем имя автора
          authorText = line.substring(2);

          // Удаляем строку автора из массива строк
          lines.splice(authorLineIndex, 1);

          // Собираем текст обратно. trimEnd уберет лишние переносы в конце цитаты.
          const newText = lines.join('\n').trimEnd();

          if (newText.length === 0) {
            // Если в сегменте больше ничего не осталось, удаляем весь сегмент
            mainContent.pop();
          } else {
            // Иначе обновляем текст сегмента
            lastSegment.text = newText;
          }
        }
      }
    }
  }
/*
  return (
    <div className={cn("bg-purple-50 border-l-4 border-purple-600 p-8 my-12 rounded-r-lg", getBlockClasses(block.props))}>
      <p className="text-xl italic text-gray-900 font-serif leading-relaxed">
        "<RenderInline content={mainContent} />"
      </p>
      {authorText && (
        <p className="text-gray-600 mt-4 font-medium">
          — {authorText}
        </p>
      )}
    </div>
  );
*/
  return (
    <div className={cn("bg-gray-50 border-l-4 border-black p-8 my-12 rounded-r-lg", getBlockClasses(block.props))}>
        <p className="text-black italic">
            "<RenderInline content={mainContent} />"
        </p>
        {authorText && (
          <p className="text-gray-600 mt-4">
            — {authorText}
          </p>
        )}
    </div>
  );
};

const ListBlock = ({ block, type }: { block: Block, type: 'ul' | 'ol' }) => {
  // Примечание: BlockNote обычно присылает плоский список. 
  // Группировку лучше делать в родительском компоненте, но для MVP рендерим отдельными li с оберткой, 
  // либо просто div с flex для эмуляции списка, чтобы не ломать HTML валидацию (ul внутри p и т.д.)
  
  // Для простоты и стиля:
  return (
    <div className={cn("flex gap-3 mb-2 ml-4", getBlockClasses(block.props))}>
      <div className="shrink-0 mt-1.5 select-none">
        {type === 'ul' ? (
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
        ) : (
          <span className="font-bold text-gray-400 text-sm">1.</span> // TODO: Реализовать счетчик если нужно
        )}
      </div>
      <div className="text-gray-700">
        <RenderInline content={block.content as InlineContent[]} />
      </div>
    </div>
  );
};

const ImageBlock = ({ block }: { block: Block }) => {
  const src = block.props?.url;
  const caption = block.props?.caption;
  const width = (block.props as any)?.previewWidth || '100%'; // BlockNote сохраняет ширину

  if (!src) return null;

  return (
    <div className="my-8">
      <div className="relative rounded-lg overflow-hidden shadow-sm border border-gray-100 bg-gray-50" style={{ maxWidth: width, margin: '0 auto' }}>
        <img 
          src={src} 
          alt={caption || 'Article image'} 
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="text-center text-sm text-gray-500 mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
};

const VideoBlock = ({ block }: { block: Block }) => {
  const url = block.props?.url;
  const caption = block.props?.caption;

  if (!url) return null;

  // Хелпер для определения типа видео
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
      return { type: 'youtube', src: `https://www.youtube.com/embed/${videoId}` };
    }
    return { type: 'file', src: videoUrl };
  };

  const videoData = getEmbedUrl(url);

  return (
    <div className="my-8">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-md">
        {videoData.type === 'youtube' ? (
          <iframe
            src={videoData.src}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video 
            src={videoData.src} 
            controls 
            className="w-full h-full"
          />
        )}
      </div>
      {caption && (
        <p className="text-center text-sm text-gray-500 mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
};

const TableBlock = ({ block }: { block: Block }) => {
  // BlockNote хранит таблицу в content.rows
  // Но TypeScript может ругаться, так как content объявлен как string | InlineContent[]
  // Мы сделали каст в типе TableContent
  
  const tableContent = block.content as unknown as TableContent;
  const rows = tableContent?.rows;

  if (!rows || !Array.isArray(rows)) return null;

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200 text-sm">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50">
              {row.cells.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className="border border-gray-200 p-3 min-w-[100px] align-top text-gray-700"
                >
                  <RenderInline content={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Main Component ---

interface BlockNoteToHTMLProps {
  blocks: Block[];
}

export function BlockNoteToHTML({ blocks }: BlockNoteToHTMLProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <div className="blocknote-content">
      {blocks.map((block, index) => {
        // Пропускаем пустые блоки, если это не разделители
        if (!block.type) return null;

        switch (block.type) {
          case 'paragraph':
            return <ParagraphBlock key={block.id || index} block={block} />;
          
          case 'heading':
            return <HeadingBlock key={block.id || index} block={block} />;
          
          case 'quote':
            return <QuoteBlock key={block.id || index} block={block} />;
            
          case 'bulletListItem':
            return <ListBlock key={block.id || index} block={block} type="ul" />;
            
          case 'numberedListItem':
            return <ListBlock key={block.id || index} block={block} type="ol" />; // Упрощенно
            
          case 'checkListItem':
             // Для чек-листов можно использовать тот же ListBlock, но с иконкой галочки
             // Для простоты пока рендерим как буллиты
             return <ListBlock key={block.id || index} block={block} type="ul" />;

          case 'image':
            return <ImageBlock key={block.id || index} block={block} />;

          case 'video':
            return <VideoBlock key={block.id || index} block={block} />;

          case 'table':
            return <TableBlock key={block.id || index} block={block} />;
            
          
          default:
            // Fallback для неизвестных типов
            return <ParagraphBlock key={block.id || index} block={block} />;
        }
      })}
    </div>
  );
}
