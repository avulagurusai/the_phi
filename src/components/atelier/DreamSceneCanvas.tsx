import React from 'react';
import type { DreamWorld, LocationMarker } from '@/types/dreamWorld';
import { audio } from '@/utils/audio';
import { LocationDetailPanel } from './LocationDetailPanel';
import { Sparkles, MapPin, Compass, Navigation } from 'lucide-react';

interface DreamSceneCanvasProps {
  world: DreamWorld;
  selectedLocationIndex: number;
  onSelectLocationIndex: (idx: number) => void;
}

export const DreamSceneCanvas: React.FC<DreamSceneCanvasProps> = ({
  world,
  selectedLocationIndex,
  onSelectLocationIndex,
}) => {
  const activeLocation = world.locations[selectedLocationIndex];

  const handleMarkerClick = (idx: number) => {
    audio.playClick();
    audio.playChime(523.25 + idx * 130, 'sine', 0.35);
    onSelectLocationIndex(idx);
  };

  // Generate SVG path through the 3 locations
  const locs = world.locations;
  const pathD = `M ${locs[0].x * 8} ${locs[0].y * 4} Q ${(locs[0].x + locs[1].x) * 4} ${(locs[0].y + locs[1].y) * 1.5}, ${locs[1].x * 8} ${locs[1].y * 4} T ${locs[2].x * 8} ${locs[2].y * 4}`;

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* Top Scene Canvas Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[500px] min-h-[300px] rounded-3xl overflow-hidden border-[3.5px] border-border shadow-[6px_6px_0_0_hsl(var(--border))] select-none">
        {/* Dynamic Sky Gradient */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `linear-gradient(180deg, ${world.visualConfig.skyGradient[0]} 0%, ${world.visualConfig.skyGradient[1]} 55%, ${world.visualConfig.skyGradient[2]} 100%)`,
          }}
        />

        {/* Twinkling Starlight Field */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: world.visualConfig.starDensity || 40 }).map((_, i) => {
            const cx = ((i * 37 + 19) % 100);
            const cy = ((i * 23 + 11) % 65);
            const r = (i % 3 === 0 ? 1.8 : i % 2 === 0 ? 1.2 : 0.8);
            const opacity = 0.35 + (i % 5) * 0.15;
            return (
              <circle
                key={i}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r={r}
                fill="#ffffff"
                opacity={opacity}
                className="animate-pulse"
                style={{ animationDuration: `${2 + (i % 4)}s` }}
              />
            );
          })}
        </svg>

        {/* Ambient Moon / Glowing Orb in the Sky */}
        <div
          className="absolute top-6 right-8 sm:top-8 sm:right-16 w-16 h-16 sm:w-20 sm:h-20 rounded-full pointer-events-none opacity-90 blur-[1px]"
          style={{
            background: 'radial-gradient(circle, #fffdfa 20%, #fef3c7 60%, transparent 80%)',
            boxShadow: `0 0 35px ${world.visualConfig.accentGlow}`,
          }}
        />

        {/* Mountain / Ridge Horizon Silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full h-2/5 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 800 300"
        >
          {/* Back mountains */}
          <path
            d="M 0 300 L 0 140 Q 150 90, 280 160 T 540 120 Q 680 70, 800 150 L 800 300 Z"
            fill={world.visualConfig.terrainColor}
            opacity="0.45"
          />
          {/* Front hills & silhouettes */}
          <path
            d="M 0 300 L 0 200 Q 120 150, 260 210 T 560 170 Q 700 130, 800 200 L 800 300 Z"
            fill={world.visualConfig.terrainColor}
            opacity="0.85"
          />
        </svg>

        {/* Animated Connecting Dream Route SVG Path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-[dash_20s_linear_infinite]"
          />
          {/* Pulsing light traveling on path */}
          <circle
            r="3.5"
            fill="#fbbf24"
            className="animate-ping"
            cx={world.locations[1].x * 8}
            cy={world.locations[1].y * 4}
          />
        </svg>

        {/* Floating Pip Character on Starlight Cloud Glider */}
        <div
          className="absolute z-20 pointer-events-none transition-all duration-700 ease-out flex flex-col items-center"
          style={{
            left: `${Math.max(12, Math.min(84, activeLocation.x))}%`,
            top: `${Math.max(15, Math.min(70, activeLocation.y - 18))}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-card/85 backdrop-blur-md border-2 border-[#5c4033] p-1.5 shadow-[3px_3px_0_0_#5c4033] flex items-center justify-center animate-bounce">
              <img
                src="https://hax.baby/baby/assets/pip_avatar_cloud.png"
                alt="Pip navigating dream coordinates"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#5c4033] text-amber-300 text-[8px] font-bold font-mono px-1.5 py-0.2 rounded-full whitespace-nowrap border border-amber-300/60 shadow-sm">
              Pip on Duty
            </div>
          </div>
        </div>

        {/* 3 Interactive Location Beacons */}
        {world.locations.map((loc, idx) => {
          const isSelected = selectedLocationIndex === idx;
          return (
            <button
              key={loc.id}
              onClick={() => handleMarkerClick(idx)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group focus:outline-none touch-manipulation"
              style={{
                left: `${loc.x}%`,
                top: `${loc.y}%`,
              }}
              title={`Waypoint #${idx + 1}: ${loc.name}`}
              aria-label={`Select ${loc.name}`}
            >
              {/* Pulsing beacon radar ring */}
              <div
                className={`absolute inset-0 rounded-full -m-2 sm:-m-3 animate-ping opacity-40 transition-colors ${
                  isSelected ? 'bg-amber-400' : 'bg-white'
                }`}
              />

              {/* Core Beacon Marker */}
              <div
                className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-amber-400 border-white text-stone-900 scale-125 shadow-[0_0_20px_rgba(251,191,36,0.8)]'
                    : 'bg-card/90 border-[#5c4033] text-foreground hover:scale-110 shadow-md'
                }`}
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center border border-white">
                  {idx + 1}
                </span>
              </div>

              {/* Waypoint Label Tag */}
              <div
                className={`mt-1.5 px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-md border transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-white scale-105'
                    : 'bg-card/95 text-foreground border-border/80 group-hover:scale-105'
                }`}
              >
                {loc.name}
              </div>
            </button>
          );
        })}

        {/* Corner HUD Badge */}
        <div className="absolute top-3 left-3 z-30 flex flex-wrap items-center gap-1.5">
          <div className="px-2.5 py-1 rounded-xl bg-card/90 backdrop-blur-md border border-border text-[10px] font-bold text-foreground flex items-center gap-1 shadow-sm">
            <Compass className="w-3 h-3 text-secondary" />
            <span>{world.title}</span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40 text-[9px] font-bold uppercase tracking-wide shadow-sm">
            Interactive Waypoints Active
          </div>
        </div>

        <div className="absolute bottom-3 right-3 z-30 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[10px] font-mono backdrop-blur-sm">
          Tap waypoints to inspect
        </div>
      </div>

      {/* Waypoint Detail Card */}
      <LocationDetailPanel
        location={activeLocation}
        allLocations={world.locations}
        selectedIndex={selectedLocationIndex}
        onSelectIndex={onSelectLocationIndex}
      />
    </div>
  );
};
