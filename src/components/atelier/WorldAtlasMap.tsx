import React, { useState } from 'react';
import type { DreamWorld } from '@/types/dreamWorld';
import {
  Compass,
  MapPin,
  Sparkles,
  Users,
  Eye,
  BookOpen,
  CloudMoon,
  Key,
} from 'lucide-react';
import { audio } from '@/utils/audio';

interface WorldAtlasMapProps {
  world: DreamWorld;
  selectedLocationIndex: number;
  onSelectLocationIndex: (idx: number) => void;
}

export const WorldAtlasMap: React.FC<WorldAtlasMapProps> = ({
  world,
  selectedLocationIndex,
  onSelectLocationIndex,
}) => {
  const [activeTab, setActiveTab] = useState<'lore' | 'inhabitants' | 'secret' | 'story'>('lore');
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);

  const handleSelectWaypoint = (idx: number) => {
    audio.playClick();
    audio.playChime(587.33 + idx * 100, 'sine', 0.3);
    onSelectLocationIndex(idx);
  };

  const handleRevealSecret = () => {
    audio.playClick();
    audio.playChime(1046.50, 'triangle', 0.4);
    setIsSecretRevealed(true);
  };

  return (
    <div className="bg-card border-[3.5px] border-border rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0_0_hsl(var(--border))] space-y-6 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b-2 border-border/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/15 text-foreground text-[11px] font-bold uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5 text-secondary" />
            <span>Nursery Cartography Atlas</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif-header text-foreground">
            World Lore & Route Map
          </h3>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 no-scrollbar">
          {[
            { id: 'lore', label: 'Atmosphere', icon: <CloudMoon className="w-3.5 h-3.5" /> },
            { id: 'inhabitants', label: 'Inhabitants', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'secret', label: 'Secret', icon: <Eye className="w-3.5 h-3.5" /> },
            { id: 'story', label: 'Full Story', icon: <BookOpen className="w-3.5 h-3.5" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                audio.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all touch-manipulation flex items-center gap-1.5 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive SVG Dream Map on Left, Detailed Lore Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 2D Dream Map (5 Columns) */}
        <div className="lg:col-span-5 bg-muted/40 border-2 border-border rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold font-serif-header text-foreground flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-secondary" />
              <span>Route Dispatch Grid</span>
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              Scale: 1:5000 Reveries
            </span>
          </div>

          {/* Cartographic SVG Mini Map */}
          <div className="relative w-full aspect-square bg-[#131826] rounded-xl overflow-hidden border border-border/80 p-2 shadow-inner">
            {/* Latitude & Longitude Grid Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="3 3" />
            </svg>

            {/* Connecting Route Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              <path
                d={`M ${world.locations[0].x} ${world.locations[0].y} L ${world.locations[1].x} ${world.locations[1].y} L ${world.locations[2].x} ${world.locations[2].y}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
            </svg>

            {/* 3 Clickable Map Markers */}
            {world.locations.map((loc, idx) => {
              const isSelected = selectedLocationIndex === idx;
              return (
                <button
                  key={loc.id}
                  onClick={() => handleSelectWaypoint(idx)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none touch-manipulation"
                  style={{
                    left: `${loc.x}%`,
                    top: `${loc.y}%`,
                  }}
                  title={loc.name}
                >
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${
                      isSelected
                        ? 'bg-amber-400 border-white text-stone-900 scale-125 shadow-[0_0_12px_#f59e0b]'
                        : 'bg-[#211b31] border-border text-white hover:scale-110'
                    }`}
                  >
                    {idx + 1}
                  </div>
                </button>
              );
            })}

            {/* Compass Rose in Corner */}
            <div className="absolute bottom-2 right-2 p-1 rounded-full bg-black/60 border border-border/40 text-[8px] font-mono text-cyan-300 pointer-events-none">
              N ↑
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Click any numbered beacon to sync scene</span>
            <span className="font-bold text-primary">Synchronized Bi-directionally</span>
          </div>
        </div>

        {/* Right: Tabbed Lore Panels (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          {activeTab === 'lore' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border-2 border-border/60 space-y-3">
              <h4 className="text-sm font-bold font-serif-header text-foreground flex items-center gap-2">
                <CloudMoon className="w-4 h-4 text-primary" />
                <span>Atmosphere & Lighting Condition</span>
              </h4>
              <p className="text-xs text-foreground/90 leading-relaxed">
                {world.atmosphereAndLighting}
              </p>
              <div className="p-3 rounded-xl bg-card border border-border text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground block mb-1">Archival Description:</strong>
                {world.description}
              </div>
            </div>
          )}

          {activeTab === 'inhabitants' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border-2 border-border/60 space-y-3">
              <h4 className="text-sm font-bold font-serif-header text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                <span>Friendly Imaginary Inhabitants</span>
              </h4>
              <p className="text-xs text-muted-foreground">
                Creatures observed on midnight patrol by Pip and the Shift 3 cartographers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {world.inhabitants.map((inh, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-card border border-border flex items-center gap-2 text-xs font-semibold text-foreground shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{inh}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'secret' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border-2 border-border/60 space-y-3">
              <h4 className="text-sm font-bold font-serif-header text-foreground flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-500" />
                <span>Hidden Discovery</span>
              </h4>
              <p className="text-xs text-muted-foreground">
                Every dream world engineered by Pip contains a confidential easter egg for curious dreamers.
              </p>

              {isSecretRevealed ? (
                <div className="p-4 rounded-xl bg-amber-400/15 border-2 border-amber-400/50 text-foreground animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Secret Unlocked:</span>
                  </div>
                  <p className="text-xs font-serif font-bold text-foreground leading-relaxed">
                    "{world.hiddenDiscovery}"
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleRevealSecret}
                  className="w-full py-3.5 px-4 rounded-xl bg-card border-2 border-dashed border-border hover:border-primary text-xs font-bold text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 transition-all touch-manipulation group"
                >
                  <Key className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform" />
                  <span>Click to Unlock Pip’s Hidden Discovery</span>
                </button>
              )}
            </div>
          )}

          {activeTab === 'story' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-muted/30 border-2 border-border/60 space-y-3">
              <h4 className="text-sm font-bold font-serif-header text-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>The Legend of {world.title}</span>
              </h4>
              <div className="p-3.5 rounded-xl bg-card border border-border text-xs font-serif leading-relaxed text-foreground/90 space-y-2">
                <p>{world.worldStory}</p>
                <div className="text-[10px] text-muted-foreground font-sans pt-2 border-t border-border/40 flex items-center justify-between">
                  <span>Midnight Nursery Chronicles</span>
                  <span>Verified by Pip • Shift 3</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
