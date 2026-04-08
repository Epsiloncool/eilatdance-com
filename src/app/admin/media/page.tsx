import { MediaManager } from '@/components/admin/MediaManager';

export default function MediaPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <h1 className="text-3xl font-bold">Media Library</h1>
      <div className="flex-1 min-h-0">
        <MediaManager mode="page" />
      </div>
    </div>
  );
}