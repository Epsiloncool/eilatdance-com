'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Search, Loader2, FileCode, ChevronLeft, ChevronRight, Info, RefreshCw } from 'lucide-react';

type TranslationRow = {
  id: number; // phrase_id
  ident: string;
  translations_json: Record<string, string>;
  // Для режима "phrase"
  refs_json?: Array<{ path: string, group: string }>;
  // Для режима "file"
  path?: string;
  positions?: number[];
};

export default function TranslationsPage() {
  const [data, setData] = useState<TranslationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('phrase'); // 'phrase' | 'file' | 'status'
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState('50');
  const [totalPages, setTotalPages] = useState(1);
  const [scanning, setScanning] = useState(false);

  // Debounce helper
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  };
  const debouncedSearch = useDebounce(search, 500);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search: debouncedSearch, sort, page: page.toString(), limit });
      const res = await fetch(`/api/translations?${params}`);
      const json = await res.json();
      setData(json.data);
      setTotalPages(json.pagination.pages);
    } catch (e) { toast.error('Error'); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [debouncedSearch, sort, page, limit]);

  // Обработчик изменения текста (локальный стейт)
  const handleChange = (index: number, lang: string, value: string) => {
    // ВАЖНО: Обновляем ВСЕ строки с таким же ID (синхронизация дубликатов)
    const phraseId = data[index].id;
    
    setData(prev => prev.map(row => {
      if (row.id === phraseId) {
        return {
          ...row,
          translations_json: { ...row.translations_json, [lang]: value }
        };
      }
      return row;
    }));
  };

  // Сохранение при потере фокуса
  const handleBlur = async (row: TranslationRow, lang: string) => {
    const text = row.translations_json?.[lang];
    // Можно добавить проверку "изменилось ли значение", чтобы не спамить API
    // Но для простоты шлем всегда.
    
    try {
      const res = await fetch('/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: row.id, 
          translations: { [lang]: text } 
        })
      });
      
      if (!res.ok) throw new Error();
      // toast.success('Saved'); // Можно не спамить тостами на каждый блюр
    } catch (e) {
      toast.error('Failed to save');
    }
  };

  const handleScan = async () => {
    setScanning(true);
    try {
      const res = await fetch('/api/translations/scan', { method: 'POST' });
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.message);
      
      const { stats } = json;
      alert(`Scan Complete!\n\nNew Phrases: ${stats.newPhrases}\nNew Refs: ${stats.newRefs}\nDeleted Refs: ${stats.deletedRefs}`);
      
      fetchData(); // Перезагрузить таблицу
    } catch (e) {
      toast.error('Scan failed');
    } finally {
      setScanning(false);
    }
  };

  // Рендер информации о файле(ах)
  const renderFileInfo = (row: TranslationRow) => {
    if (sort === 'file') {
      // Режим файла: показываем конкретный путь
      return (
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1" title={row.path}>
          <FileCode className="h-3 w-3" />
          <span className="truncate max-w-[250px] font-mono">{row.path}</span>
        </div>
      );
    } else {
      // Режим фразы: показываем сводку
      const refs = row.refs_json || [];
      if (refs.length === 0) return <div className="text-xs text-red-400 mt-1">Unused phrase</div>;
      
      if (refs.length === 1) {
        return (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1" title={refs[0].path}>
            <FileCode className="h-3 w-3" />
            <span className="truncate max-w-[250px] font-mono">{refs[0].path}</span>
          </div>
        );
      }

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-xs text-blue-600 mt-1 cursor-help w-fit bg-blue-50 px-1.5 py-0.5 rounded">
                <Info className="h-3 w-3" />
                <span>Found in {refs.length} files</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-md">
              <ul className="list-disc pl-4 text-xs space-y-1">
                {refs.map((ref, i) => (
                  <li key={i} className="font-mono break-all">{ref.path} {ref.group ? `(${ref.group})` : ''}</li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  };

  const getRowClass = (row: TranslationRow) => {
    const t = row.translations_json || {};
    if (!t.en) return 'bg-red-50 hover:bg-red-100';
    if (!t.ru || !t.he) return 'bg-yellow-50 hover:bg-yellow-100';
    return 'bg-white hover:bg-gray-50';
  };

  return (
    <div className="space-y-4 h-[calc(100vh-6rem)] flex flex-col">
      {/* Toolbar */}
      <div className="flex justify-between items-center gap-4 bg-background p-4 rounded-lg border shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search phrases..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phrase">By Ident (Unique)</SelectItem>
              <SelectItem value="file">By File (Grouped)</SelectItem>
              <SelectItem value="status">By Status (Missing)</SelectItem>
            </SelectContent>
          </Select>

		  <Button variant="secondary" onClick={handleScan} disabled={scanning}>
            <RefreshCw className={`mr-2 h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />
            {scanning ? 'Scanning...' : 'Scan Source'}
          </Button>

          <Select value={limit} onValueChange={setLimit}>
            <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium w-24 text-center">Page {page} / {totalPages}</span>
          <Button variant="outline" size="icon" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="flex-1 border-0 shadow-none bg-transparent overflow-hidden flex flex-col">
        <CardContent className="p-0 flex-1 overflow-auto rounded-md border bg-white">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-100 z-10 shadow-sm">
              <TableRow>
                <TableHead className="w-[300px]">Ident / Source</TableHead>
                <TableHead>English</TableHead>
                <TableHead>Russian</TableHead>
                <TableHead>Hebrew</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" /></TableCell>
                </TableRow>
              ) : (
                data.map((row, idx) => (
                  <TableRow key={`${row.id}-${idx}`} className={getRowClass(row)}>
                    <TableCell className="align-top py-3">
                      <div className="font-mono text-sm font-bold text-gray-800 break-all select-all">{row.ident}</div>
                      {renderFileInfo(row)}
                    </TableCell>
                    {['en', 'ru', 'he'].map(lang => (
                      <TableCell key={lang} className="align-top py-2">
                        <textarea
                          value={row.translations_json?.[lang] || ''}
                          onChange={(e) => handleChange(idx, lang, e.target.value)}
                          onBlur={() => handleBlur(row, lang)}
                          className={`w-full bg-transparent resize-none border-b border-transparent focus:border-blue-500 outline-none text-sm transition-colors py-1 min-h-[40px]
                            ${lang === 'en' && !row.translations_json?.en ? 'placeholder:text-red-400' : ''}
                          `}
                          placeholder={lang === 'en' ? 'Required...' : '...'}
                          rows={Math.max(1, Math.ceil((row.translations_json?.[lang] || '').length / 40))}
                          dir={lang === 'he' ? 'rtl' : 'ltr'}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
