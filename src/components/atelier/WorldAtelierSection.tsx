import React, { useState, useEffect } from 'react';
import type { DreamWorld, GenerateWorldParams } from '@/types/dreamWorld';
import {
  generateDreamWorldService,
  INITIAL_FEATURED_WORLDS,
  getSavedDreamWorlds,
  saveDreamWorldToArchive,
  exportDreamWorldAsJSON,
} from '@/services/dreamWorldService';
import { AtelierForm } from './AtelierForm';
import { DreamSceneCanvas } from './DreamSceneCanvas';
import { WorldAtlasMap } from './WorldAtlasMap';
import { AskPipAssistant } from './AskPipAssistant';
import { SavedWorldsGallery } from './SavedWorldsGallery';
import { audio } from '@/utils/audio';
import {
  Sparkles,
  Compass,
  PlusCircle,
  Bookmark,
  MessageSquare,
  BookmarkCheck,
  Download,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner';

export const WorldAtelierSection: React.FC = () => {
  const [activeWorld, setActiveWorld] = useState<DreamWorld>(
    INITIAL_FEATURED_WORLDS['moonlit-forest']
  );
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [savedWorlds, setSavedWorlds] = useState<DreamWorld[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'scene' | 'create' | 'atlas' | 'assistant' | 'archive'>('scene');
  const [isSaved, setIsSaved] = useState(false);

  // Load saved worlds from localStorage on mount
  useEffect(() => {
    const list = getSavedDreamWorlds();
    setSavedWorlds(list);
    // If user has saved worlds, keep the current world or match save status
    const alreadySaved = list.some(w => w.id === activeWorld.id);
    setIsSaved(alreadySaved);
  }, [activeWorld.id]);

  const handleGenerate = async (params: GenerateWorldParams) => {
    setIsGenerating(true);
    try {
      const { world, isAiGenerated } = await generateDreamWorldService(params);
      setActiveWorld(world);
      setSelectedLocationIndex(0);
      setIsSaved(false);
      setActiveTab('scene');

      audio.playFanfare();
      toast.success(
        isAiGenerated
          ? `AI Dream Engine synthesized "${world.title}"!`
          : `Synthesized "${world.title}"! Explore the waypoints on the map.`
      );
    } catch {
      toast.error('Failed to weave dream stardust. Please try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCurrent = () => {
    audio.playClick();
    audio.playChime(659.25, 'sine', 0.4);
    const updated = saveDreamWorldToArchive(activeWorld);
    setSavedWorlds(updated);
    setIsSaved(true);
    toast.success(`Saved "${activeWorld.title}" to browser archive!`);
  };

  const handleExportCurrentJSON = () => {
    audio.playClick();
    audio.playChime(783.99, 'sine', 0.3);
    exportDreamWorldAsJSON(activeWorld);
    toast.success(`Exported ${activeWorld.title} as JSON!`);
  };

  const handleSelectSavedWorld = (world: DreamWorld) => {
    setActiveWorld(world);
    setSelectedLocationIndex(0);
    setIsSaved(true);
    setActiveTab('scene');
  };

  return (
    <section id="world-atelier" className="py-10 sm:py-16 border-t-2 border-border/40 w-full min-w-0">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Module 01 • Procedural Dream World Engine</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-serif-header text-foreground">
          World Atelier: AI Dream Builder
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
          Synthesize living dreamscapes with Pip. Design custom realms from your imagination, explore interactive SVG waypoint maps, consult Pip on hidden lore, and export your worlds as JSON.
        </p>

        {/* Studio Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 max-w-full">
          {[
            { id: 'scene', label: 'Dream Scene', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'create', label: 'Create New World', icon: <PlusCircle className="w-3.5 h-3.5" /> },
            { id: 'atlas', label: 'World Atlas & Lore', icon: <Share2 className="w-3.5 h-3.5" /> },
            { id: 'assistant', label: 'Ask Pip AI', icon: <MessageSquare className="w-3.5 h-3.5" /> },
            {
              id: 'archive',
              label: `Saved Archive (${savedWorlds.length})`,
              icon: <Bookmark className="w-3.5 h-3.5" />,
            },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                audio.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all touch-manipulation flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="shrink-0">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* World Atelier Control Bar for Active World */}
      <div className="mb-6 bg-card border-2 border-border/80 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-secondary/15 border border-secondary/40 text-foreground flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4 text-secondary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-serif-header text-foreground truncate">
                {activeWorld.title}
              </h3>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wide shrink-0 border border-primary/30">
                {activeWorld.worldType.replace('-', ' ')}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate">
              {activeWorld.tagline}
            </p>
          </div>
        </div>

        {/* Quick Toolbar Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSaveCurrent}
            className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all flex items-center gap-1.5 touch-manipulation ${
              isSaved
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                : 'bg-card border-border hover:bg-muted text-foreground'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved in Archive' : 'Save World'}</span>
          </button>

          <button
            onClick={handleExportCurrentJSON}
            className="min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all flex items-center gap-1.5 touch-manipulation"
            title="Download world data as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={() => {
              audio.playClick();
              setActiveTab('create');
            }}
            className="min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground border border-primary transition-all flex items-center gap-1.5 touch-manipulation shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New World</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Views */}
      {activeTab === 'scene' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <DreamSceneCanvas
            world={activeWorld}
            selectedLocationIndex={selectedLocationIndex}
            onSelectLocationIndex={setSelectedLocationIndex}
          />

          <WorldAtlasMap
            world={activeWorld}
            selectedLocationIndex={selectedLocationIndex}
            onSelectLocationIndex={setSelectedLocationIndex}
          />
        </div>
      )}

      {activeTab === 'create' && (
        <div className="animate-in fade-in duration-300">
          <AtelierForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>
      )}

      {activeTab === 'atlas' && (
        <div className="animate-in fade-in duration-300">
          <WorldAtlasMap
            world={activeWorld}
            selectedLocationIndex={selectedLocationIndex}
            onSelectLocationIndex={setSelectedLocationIndex}
          />
        </div>
      )}

      {activeTab === 'assistant' && (
        <div className="animate-in fade-in duration-300 max-w-2xl mx-auto">
          <AskPipAssistant currentWorld={activeWorld} />
        </div>
      )}

      {activeTab === 'archive' && (
        <div className="animate-in fade-in duration-300">
          <SavedWorldsGallery
            savedWorlds={savedWorlds}
            onSelectWorld={handleSelectSavedWorld}
            onCreateNew={() => setActiveTab('create')}
            onRefreshArchive={setSavedWorlds}
            activeWorldId={activeWorld.id}
          />
        </div>
      )}
    </section>
  );
};
