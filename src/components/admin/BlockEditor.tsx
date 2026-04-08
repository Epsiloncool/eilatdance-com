'use client';

import { ImageIcon } from 'lucide-react'; // Иконка для меню
import { MediaDialog } from './MediaDialog'; // Наш диалог
import { 
  getDefaultReactSlashMenuItems, 
  SuggestionMenuController, 
  useCreateBlockNote 
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";

interface BlockEditorProps {
  initialContent?: any[]; // Блочная структура (JSON)
  onChange: (content: any[]) => void;
  editable?: boolean;
}

export default function BlockEditor({ initialContent, onChange, editable = true }: BlockEditorProps) {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  // Инициализация редактора
  const editor = useCreateBlockNote({
    initialContent: initialContent && Array.isArray(initialContent) && initialContent.length > 0 
      ? initialContent 
      : undefined, // Если undefined, будет пустой блок
  });

  // 3. Обработчик выбора медиа (слушаем событие)
  useEffect(() => {
    const handleMediaSelect = (e: CustomEvent) => {
      // Проверяем контекст события
      if (e.detail.context === 'editor_insert_image') {
        const media = e.detail.media;
        const imageUrl = `${media.base_dir}${media.orig_filename}`;
        const caption = media.title || media.alt || '';

        // Вставка блока изображения в текущую позицию курсора
        editor.insertBlocks(
          [
            {
              type: "image",
              props: {
                url: imageUrl,
                caption: caption,
                //previewWidth: "100%" // Опционально, для сохранения ширины
              },
            },
          ],
          editor.getTextCursorPosition().block,
          "after"
        );

        setIsMediaOpen(false);
      }
    };

    window.addEventListener('media_selected', handleMediaSelect as EventListener);
    return () => window.removeEventListener('media_selected', handleMediaSelect as EventListener);
  }, [editor]);

  // Отслеживаем изменения
  const handleChange = () => {
    // Получаем блоки (JSON)
    const blocks = editor.document;
    onChange(blocks);
  };

  // 4. Определение кастомного пункта меню
  const insertImageFromLib = (editor: any) => ({
    title: "Image from Library",
    onItemClick: () => {
      setIsMediaOpen(true);
    },
    aliases: ["img", "picture", "media"],
    group: "Media",
    icon: <ImageIcon size={18} />,
    subtext: "Select from uploaded files",
  });

  // Важно: BlockNoteView должен рендериться только на клиенте
  /*
  return (
    <div className="border rounded-md min-h-[400px] bg-white text-gray-900 editor-wrapper">
      <BlockNoteView 
        editor={editor} 
        onChange={handleChange}
        theme="light"
        editable={editable}
      />
    </div>
  );
  */

  return (
    <div className="border rounded-md min-h-[400px] bg-white text-gray-900 editor-wrapper relative">
      <BlockNoteView 
        editor={editor} 
        onChange={handleChange}
        theme="light"
        editable={editable}
        slashMenu={false} // ВАЖНО: Отключаем стандартное меню, чтобы заменить своим
      >
        {/* Встраиваем наш контроллер меню */}
<SuggestionMenuController
  triggerCharacter={"/"}
  getItems={async (query) => {
    // 1. Получаем стандартные пункты меню
    const defaultItems = getDefaultReactSlashMenuItems(editor);

    // 2. Ищем группу "Media"
    const mediaGroupIndex = defaultItems.findIndex(
      (item: any) => 'group' in item && item.group === "Media"
    );

    // 3. Создаем наш кастомный пункт
    const customImageItem = insertImageFromLib(editor);

    // 4. Если группа "Media" найдена
    if (mediaGroupIndex !== -1) {
      // Создаем копию стандартных пунктов для мутации
      const newItems = [...defaultItems];
      
      // Удаляем стандартный пункт "Image" из группы "Media"
      // чтобы избежать дублирования "Image" и "Image from Library"
      // (Можно оставить, если нужно два варианта)
      const mediaGroup = newItems.filter((item: any) => 'group' in item && item.group === "Media");
      const otherGroups = newItems.filter((item: any) => !('group' in item) || item.group !== "Media");
      
      const filteredMediaGroup = mediaGroup;//.filter((item: any) => item.title !== "Image");

      // Вставляем наш кастомный пункт в начало отфильтрованной группы "Media"
      filteredMediaGroup.unshift(customImageItem);

      // Собираем массив пунктов обратно, помещая нашу группу на ее исходное место
      // Это сложно, проще сделать так:
      // Найдем все элементы, что НЕ в группе Media
      const nonMediaItems = defaultItems.filter(
        (item: any) => !("group" in item) || item.group !== "Media"
      );
      
      // Найдем все элементы, что В группе Media, но это не стандартный Image
      const existingMediaItems = defaultItems.filter(
        (item: any) => "group" in item && item.group === "Media" && item.title !== "Image"
      );
      
      // Собираем новый массив
      return [
        ...nonMediaItems, // Все остальные пункты
        customImageItem, // Наш пункт
        ...existingMediaItems // Остальные медиа-пункты (видео и т.д.)
      ].filter((item: any) =>
        item.title.toLowerCase().includes(query.toLowerCase()) // Фильтрация по поисковому запросу
      );
    }
    
    // Если по какой-то причине группа "Media" не найдена, просто добавляем в начало
    return [customImageItem, ...defaultItems].filter((item: any) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }}
/>      </BlockNoteView>

      {/* Наш диалог выбора */}
      <MediaDialog 
        open={isMediaOpen} 
        onOpenChange={setIsMediaOpen} 
        context="editor_insert_image" // Уникальный контекст для этого редактора
      />
    </div>
  );

}
