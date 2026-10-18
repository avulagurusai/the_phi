import React from 'react';
import {
  Compass,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Eye,
  BookOpen,
} from 'lucide-react';
import type { LocationMarker } from '@/types/dreamWorld';
import { audio } from '@/utils/audio';

interface LocationDetailPanelProps {
  location: LocationMarker;
  allLocations: [LocationMarker, LocationMarker, LocationMarker];
  selectedIndex: number;
  onSelectIndex: (idx: number) => void;
}

export const LocationDetailPanel: React.FC<LocationDetailPanelProps> = ({
  location,
  allLocations,
  selectedIndex,
  onSelectIndex,
}) => {
  const handlePrev = () => {
    audio.playClick();
    const nextIdx = selectedIndex === 0 ? allLocations.length - 1 : selectedIndex - 1;
    onSelectIndex(nextIdx);
    audio.playChime(523.25 + nextIdx * 120, 'sine', 0.3);
  };

  const handleNext = () => {
    audio.playClick();
    const nextIdx = (selectedIndex + 1) % allLocations.length;
    onSelectIndex(nextIdx);
    audio.playChime(523.25 + nextIdx * 120, 'sine', 0.3);
  };

  return (
    <div className="bg-card border-2 border-border rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0_0_hsl(var(--border))] flex flex-col justify-between w-full min-w-0">
      <div>
        {/* Header with Navigation and Station Number */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-border/60">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/40 text-primary flex items-center justify-center font-bold text-xs shrink-0">
              #{selectedIndex + 1}
            </span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block truncate">
                Selected Waypoint
              </span>
              <h4 className="text-sm sm:text-base font-bold font-serif-header text-foreground truncate">
                {location.name}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg border border-border bg-muted/50 hover:bg-muted text-foreground transition-all touch-manipulation min-h-[32px] min-w-[32px] flex items-center justify-center"
              title="Previous Waypoint"
              aria-label="Previous Waypoint"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-muted-foreground px-1">
              {selectedIndex + 1}/3
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg border border-border bg-muted/50 hover:bg-muted text-foreground transition-all touch-manipulation min-h-[32px] min-w-[32px] flex items-center justify-center"
              title="Next Waypoint"
              aria-label="Next Waypoint"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-foreground/90 leading-relaxed mb-3">
          {location.description}
        </p>

        {/* Secret Discovery Pill */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-3 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block uppercase tracking-wider">
              Secret Waypoint Discovery
            </span>
            <p className="text-xs font-semibold text-foreground leading-snug">
              {location.discovery}
            </p>
          </div>
        </div>

        {/* Story Snippet */}
        <div className="p-2.5 rounded-xl bg-muted/60 border border-border/50 text-xs font-serif text-muted-foreground italic flex items-start gap-2">
          <BookOpen className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5 not-italic" />
          <p className="leading-relaxed">
            "{location.storySnippet}"
          </p>
        </div>
      </div>

      {/* Coordinate stamp */}
      <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-secondary" />
          Coordinates: {Math.round(location.x)}°N, {Math.round(location.y)}°W
        </span>
        <span>Midnight Shift 3 Beacon</span>
      </div>
    </div>
  );
};
