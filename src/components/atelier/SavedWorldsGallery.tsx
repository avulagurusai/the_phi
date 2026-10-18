import React, { useState } from 'react';
import type { DreamWorld } from '@/types/dreamWorld';
import {
  exportDreamWorldAsJSON,
  renameSavedDreamWorld,
  deleteSavedDreamWorld,
} from '@/services/dreamWorldService';
import { audio } from '@/utils/audio';
import {
  Bookmark,
  Download,
  Copy,
  Trash2,
  Edit2,
  FolderOpen,
  Sparkles,
  Check,
  PlusCircle,
  HardDrive,
} from 'lucide-react';
import { toast } from 'sonner';

interface SavedWorldsGalleryProps {
  savedWorlds: DreamWorld[];
  onSelectWorld: (world: DreamWorld) => void;
  onCreateNew: () => void;
  onRefreshArchive: (updated: DreamWorld[]) => void;
  activeWorldId: string;
}

export const SavedWorldsGallery: React.FC<SavedWorldsGalleryProps> = ({
  savedWorlds,
  onSelectWorld,
  onCreateNew,
  onRefreshArchive,
  activeWorldId,
}) => {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameText, setRenameText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyDescription = (world: DreamWorld) => {
    audio.playClick();
    const textToCopy = `${world.title}\n${world.tagline}\n\n${world.description}\n\nWaypoints: ${world.locations.map(l => l.name).join(', ')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(world.id);
      toast.success('World lore copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleExportJSON = (world: DreamWorld) => {
    audio.playClick();
    audio.playChime(659.25, 'sine', 0.3);
    exportDreamWorldAsJSON(world);
    toast.success(`Exported ${world.title} as JSON!`);
  };

  const handleStartRename = (world: DreamWorld) => {
    audio.playClick();
    setRenamingId(world.id);
    setRenameText(world.title);
  };

  const handleSaveRename = (id: string) => {
    if (!renameText.trim()) return;
    audio.playClick();
    const updated = renameSavedDreamWorld(id, renameText.trim());
    onRefreshArchive(updated);
    setRenamingId(null);
    toast.success('Dream World renamed!');
  };

  const handleDelete = (id: string, title: string) => {
    audio.playClick();
    if (confirm(`Remove "${title}" from your browser's saved archive?`)) {
      const updated = deleteSavedDreamWorld(id);
      onRefreshArchive(updated);
      toast.success(`Removed "${title}" from archive.`);
    }
  };

  return (
    <div className="bg-card border-[3.5px] border-border rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0_0_hsl(var(--border))] space-y-5 w-full min-w-0">
      {/* Header and Call to Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-border/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Browser Starlight Archive</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif-header text-foreground">
            Saved Dream Worlds
          </h3>
        </div>

        <button
          onClick={() => {
            audio.playClick();
            onCreateNew();
          }}
          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground border-2 border-border shadow-[2px_2px_0_0_hsl(var(--border))] hover:opacity-95 active:scale-95 transition-all touch-manipulation shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Another World</span>
        </button>
      </div>

      {/* Info Notice */}
      <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-secondary shrink-0" />
          <span>
            Stored locally in your browser storage ({savedWorlds.length}/20 saved).
          </span>
        </div>
        <span className="font-mono text-[10px]">No Account Required</span>
      </div>

      {/* Saved Worlds Cards Grid */}
      {savedWorlds.length === 0 ? (
        <div className="py-12 text-center rounded-2xl border-2 border-dashed border-border/80 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Bookmark className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-foreground">
            No saved dream worlds yet
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Generate a dream world above and click "Save World to Archive" to keep it handy in your browser!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedWorlds.map(w => {
            const isActive = w.id === activeWorldId;
            return (
              <div
                key={w.id}
                className={`bg-card rounded-2xl p-4 border-2 transition-all flex flex-col justify-between shadow-[2px_2px_0_0_hsl(var(--border))] ${
                  isActive
                    ? 'border-primary ring-2 ring-primary/40 scale-[1.01]'
                    : 'border-border/80 hover:border-border'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-foreground text-[10px] font-bold uppercase tracking-wider">
                      {w.worldType}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {new Date(w.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {renamingId === w.id ? (
                    <div className="flex items-center gap-1.5 my-1">
                      <input
                        type="text"
                        value={renameText}
                        onChange={e => setRenameText(e.target.value)}
                        className="px-2 py-1 text-xs rounded-lg border border-primary bg-background text-foreground flex-1"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveRename(w.id)}
                        className="p-1 rounded-lg bg-primary text-primary-foreground text-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <h4 className="text-sm font-bold font-serif-header text-foreground line-clamp-1 mb-1">
                      {w.title}
                    </h4>
                  )}

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {w.tagline || w.description}
                  </p>
                </div>

                {/* Actions Toolbar */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-1 text-xs">
                  <button
                    onClick={() => {
                      audio.playClick();
                      onSelectWorld(w);
                      toast.success(`Loaded "${w.title}" into viewer!`);
                    }}
                    className={`min-h-[34px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors touch-manipulation ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/70 hover:bg-muted text-foreground'
                    }`}
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>{isActive ? 'Active' : 'Open'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartRename(w)}
                      className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground min-h-[32px] min-w-[32px] flex items-center justify-center touch-manipulation"
                      title="Rename World"
                      aria-label="Rename World"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleCopyDescription(w)}
                      className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground min-h-[32px] min-w-[32px] flex items-center justify-center touch-manipulation"
                      title="Copy World Lore"
                      aria-label="Copy World Lore"
                    >
                      {copiedId === w.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleExportJSON(w)}
                      className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground min-h-[32px] min-w-[32px] flex items-center justify-center touch-manipulation"
                      title="Export as JSON file"
                      aria-label="Export as JSON file"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(w.id, w.title)}
                      className="p-1.5 rounded-lg border border-border/60 hover:bg-destructive/20 text-muted-foreground hover:text-destructive min-h-[32px] min-w-[32px] flex items-center justify-center touch-manipulation"
                      title="Delete from Archive"
                      aria-label="Delete from Archive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
