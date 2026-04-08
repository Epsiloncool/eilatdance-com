'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MediaManager } from './MediaManager';

interface MediaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: string;
}

export function MediaDialog({ open, onOpenChange, context }: MediaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden min-h-0">
          <MediaManager 
            mode="select" 
            context={context} 
            onClose={() => onOpenChange(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}