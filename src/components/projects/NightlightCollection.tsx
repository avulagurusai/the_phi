import React, { useState } from 'react';
import { Lamp, Moon, Sparkles, Sliders, Flame } from 'lucide-react';
import { audio } from '@/utils/audio';

type GlowMode = 'amber' | 'cyan' | 'lavender';

export const NightlightCollection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<GlowMode>('amber');
  const [brightness, setBrightness] = useState(85);
  const [isFlickering, setIsFlickering] = useState(true);

  const moods = [
    {
      id: 'amber' as GlowMode,
      name: 'Candlelight Amber',
      hex: '#f59e0b',
      desc: 'Warm comforting hearth glow to dissolve monster shadows',
      icon: <Flame className="w-4 h-4 text-amber-500" />,
    },
    {
      id: 'cyan' as GlowMode,
      name: 'Moonlit Cyan',
      hex: '#38bdf8',
      desc: 'Cool serene starlight for hot summer dreamers',
      icon: <Moon className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'lavender' as GlowMode,
      name: 'Starlight Lavender',
      hex: '#c084fc',
      desc: 'Magical dreamland lavender for deep restful slumber',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    },
  ];

  const currentMood = moods.find(m => m.id === activeMode) || moods[0];

  const handleSelectMode = (id: GlowMode) => {
    audio.playClick();
    setActiveMode(id);
    audio.playChime(659.25, 'triangle', 0.3);
  };

  return (
    <div className="bg-card border-[3px] border-border rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0_0_hsl(var(--border))] flex flex-col justify-between h-full w-full min-w-0">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/20 text-foreground text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <span>Project #2</span>
              <span>•</span>
              <span>Bedside Luminescence</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold font-serif-header text-foreground">
              Nightlight Collection
            </h3>
          </div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-muted/60 border border-border p-1.5 flex items-center justify-center shrink-0">
            <img
              src="https://hax.baby/baby/assets/pip_dream_lantern.png"
              alt="Pip's Dream Nightlight Lantern"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
          Hand-forged brass bedside lanterns with variable mood luminescence. Dial the soothing glow that best comforts your thoughts.
        </p>

        {/* Interactive Lantern Visual Glow Display */}
        <div className="relative w-full h-32 sm:h-36 rounded-2xl bg-[#141824] border-2 border-border overflow-hidden flex items-center justify-center mb-4">
          {/* Radial Ambient Glow Aura */}
          <div
            className={`absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full blur-2xl transition-all duration-500 ${
              isFlickering ? 'animate-pulse' : ''
            }`}
            style={{
              backgroundColor: currentMood.hex,
              opacity: (brightness / 100) * 0.75,
              transform: `scale(${0.8 + (brightness / 100) * 0.4})`,
            }}
          />

          {/* Central Lantern Icon & Status with vector styling */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-1.5 shadow-sm">
              <Lamp className="w-6 h-6" style={{ color: currentMood.hex }} />
            </div>
            <div
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20 text-white backdrop-blur-md flex items-center gap-1.5"
              style={{ backgroundColor: `${currentMood.hex}55` }}
            >
              <span>{currentMood.name}</span>
              <span>•</span>
              <span>{brightness}%</span>
            </div>
          </div>
        </div>

        {/* Glow Mood Switchers */}
        <div className="space-y-1.5 mb-4">
          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Select Glow Aura:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {moods.map(m => (
              <button
                key={m.id}
                onClick={() => handleSelectMode(m.id)}
                className={`min-h-[44px] p-2 sm:p-2.5 rounded-xl border-2 text-xs font-semibold flex items-center sm:flex-col sm:items-center justify-start sm:justify-center gap-2 transition-all touch-manipulation ${
                  activeMode === m.id
                    ? 'border-foreground bg-primary/10 shadow-[2px_2px_0_0_hsl(var(--border))] text-foreground'
                    : 'border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted'
                }`}
              >
                <div className="p-1 rounded-lg bg-card border border-border/40 shrink-0">
                  {m.icon}
                </div>
                <span className="text-xs truncate">{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Brightness Dimmer Control */}
        <div className="bg-muted/40 p-3 rounded-2xl border border-border/60 space-y-2 mb-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Sliders className="w-3.5 h-3.5 text-secondary" />
              Luminescence Dimmer:
            </span>
            <span className="font-mono font-bold text-primary">{brightness}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={brightness}
            onChange={e => setBrightness(Number(e.target.value))}
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary touch-manipulation"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/50">
        <label className="flex items-center gap-1.5 cursor-pointer touch-manipulation">
          <input
            type="checkbox"
            checked={isFlickering}
            onChange={e => setIsFlickering(e.target.checked)}
            className="w-4 h-4 rounded accent-primary cursor-pointer"
          />
          <span className="text-foreground/90 font-medium">Soft Candle Pulse</span>
        </label>
        <span className="italic text-[10px] hidden sm:inline">{currentMood.desc.slice(0, 32)}...</span>
      </div>
    </div>
  );
};
