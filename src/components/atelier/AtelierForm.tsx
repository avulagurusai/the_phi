import React, { useState } from 'react';
import {
  Sparkles,
  Dices,
  Trees,
  Cloud,
  Waves,
  BookOpen,
  Sparkle,
  Sliders,
  Send,
  AlertCircle,
  Palette,
  Compass,
} from 'lucide-react';
import type {
  WorldType,
  MoodType,
  WorldSize,
  PaletteId,
  GenerateWorldParams,
} from '@/types/dreamWorld';
import { DREAM_PALETTES, SURPRISE_PROMPTS } from '@/services/dreamWorldService';
import { audio } from '@/utils/audio';

interface AtelierFormProps {
  onGenerate: (params: GenerateWorldParams) => Promise<void>;
  isGenerating: boolean;
}

export const AtelierForm: React.FC<AtelierFormProps> = ({
  onGenerate,
  isGenerating,
}) => {
  const [prompt, setPrompt] = useState('');
  const [worldType, setWorldType] = useState<WorldType>('moonlit-forest');
  const [mood, setMood] = useState<MoodType>('peaceful');
  const [size, setSize] = useState<WorldSize>('little-universe');
  const [paletteId, setPaletteId] = useState<PaletteId>('moon-milk');
  const [error, setError] = useState('');

  const worldTypes: { id: WorldType; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'moonlit-forest',
      label: 'Moonlit Forest',
      icon: <Trees className="w-4 h-4 text-emerald-500" />,
      desc: 'Bioluminescent canopies & humming cedar elders',
    },
    {
      id: 'cloud-city',
      label: 'Floating Cloud City',
      icon: <Cloud className="w-4 h-4 text-sky-400" />,
      desc: 'Marshmallow vapor towers & cotton candy paths',
    },
    {
      id: 'underwater-kingdom',
      label: 'Underwater Kingdom',
      icon: <Waves className="w-4 h-4 text-cyan-500" />,
      desc: 'Warm abyssal coral lagoons & sea-glass bells',
    },
    {
      id: 'dream-library',
      label: 'Dream Library',
      icon: <BookOpen className="w-4 h-4 text-amber-500" />,
      desc: 'Spiral parchment shelves & slumber manuscripts',
    },
    {
      id: 'cosmic-garden',
      label: 'Cosmic Garden',
      icon: <Sparkle className="w-4 h-4 text-purple-400" />,
      desc: 'Interstellar geodes blooming with starfruit',
    },
    {
      id: 'custom',
      label: 'Custom Dream',
      icon: <Sliders className="w-4 h-4 text-pink-500" />,
      desc: 'Boundless dreamcraft tailored to your exact prompt',
    },
  ];

  const moods: { id: MoodType; label: string; color: string }[] = [
    { id: 'peaceful', label: 'Peaceful', color: 'hover:border-sky-400' },
    { id: 'magical', label: 'Magical', color: 'hover:border-purple-400' },
    { id: 'mysterious', label: 'Mysterious', color: 'hover:border-indigo-400' },
    { id: 'playful', label: 'Playful', color: 'hover:border-amber-400' },
    { id: 'nostalgic', label: 'Nostalgic', color: 'hover:border-rose-400' },
    { id: 'cosmic', label: 'Cosmic', color: 'hover:border-cyan-400' },
  ];

  const sizes: { id: WorldSize; label: string; desc: string }[] = [
    { id: 'tiny-dream', label: 'Tiny Dream', desc: 'Miniature pocket sanctuary' },
    { id: 'little-universe', label: 'Little Universe', desc: 'Sprawling nocturnal realm' },
    { id: 'endless-world', label: 'Endless World', desc: 'Infinite starlight expanse' },
  ];

  const handleSurpriseMe = () => {
    audio.playClick();
    audio.playChime(783.99, 'sine', 0.3); // G5 chime

    const randomIndex = Math.floor(Math.random() * SURPRISE_PROMPTS.length);
    const surprise = SURPRISE_PROMPTS[randomIndex];

    setPrompt(surprise.prompt);
    setWorldType(surprise.worldType);
    setMood(surprise.mood);
    setSize(surprise.size);
    setPaletteId(surprise.paletteId);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (worldType === 'custom' && !prompt.trim()) {
      setError('Please provide a short vision or prompt for your Custom Dream World!');
      return;
    }
    setError('');

    audio.playClick();
    audio.playLullabyArpeggio();

    await onGenerate({
      prompt: prompt.trim(),
      worldType,
      mood,
      size,
      paletteId,
    });
  };

  return (
    <div className="bg-card border-[3.5px] border-border rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[4px_4px_0_0_hsl(var(--border))] w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-border/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shift 3 Dreamcraft Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif-header text-foreground">
            Craft a New Dream World
          </h3>
        </div>

        {/* Surprise Me Button */}
        <button
          type="button"
          onClick={handleSurpriseMe}
          disabled={isGenerating}
          className="min-h-[44px] self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-secondary/15 hover:bg-secondary/25 text-foreground border-2 border-secondary/50 active:scale-95 transition-all touch-manipulation disabled:opacity-50"
          title="Randomize prompts and whimsical options"
        >
          <Dices className="w-4 h-4 text-secondary shrink-0" />
          <span>Surprise Me!</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-6">
        {/* Multiline Prompt Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <span>Your Dream World Vision</span>
              <span className="text-[10px] text-muted-foreground font-normal">
                (Optional for presets, required for Custom)
              </span>
            </label>
            <span className="text-[10px] text-muted-foreground font-mono">
              {prompt.length}/300
            </span>
          </div>
          <textarea
            rows={3}
            maxLength={300}
            value={prompt}
            onChange={e => {
              setPrompt(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g., A floating silver observatory with teacup cloud hammocks and owls who sing lullabies in waltz time..."
            className="w-full px-3.5 py-2.5 text-base md:text-xs rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary resize-none min-h-[88px] leading-relaxed"
          />
        </div>

        {/* World Type Selector */}
        <div>
          <label className="block text-xs font-bold text-foreground mb-2">
            1. World Type Archetype
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {worldTypes.map(t => (
              <button
                type="button"
                key={t.id}
                onClick={() => {
                  audio.playClick();
                  setWorldType(t.id);
                }}
                className={`min-h-[60px] p-2.5 rounded-2xl border-2 text-left transition-all touch-manipulation flex flex-col justify-between ${
                  worldType === t.id
                    ? 'border-primary bg-primary/10 shadow-[2px_2px_0_0_hsl(var(--primary))] scale-[1.01]'
                    : 'border-border/60 bg-muted/40 hover:bg-muted/70'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="shrink-0">{t.icon}</span>
                  <span className="text-xs font-bold text-foreground truncate">
                    {t.label}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground line-clamp-1 mt-1">
                  {t.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood & Size in 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Mood Selector */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-2">
              2. Atmospheric Mood
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {moods.map(m => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => {
                    audio.playClick();
                    setMood(m.id);
                  }}
                  className={`min-h-[40px] px-2.5 py-1.5 rounded-xl border text-xs font-semibold text-center transition-all touch-manipulation ${
                    mood === m.id
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : `border-border/60 bg-muted/40 text-foreground ${m.color}`
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block text-xs font-bold text-foreground mb-2">
              3. World Scale
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {sizes.map(s => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => {
                    audio.playClick();
                    setSize(s.id);
                  }}
                  className={`min-h-[40px] px-2 py-1.5 rounded-xl border text-center transition-all touch-manipulation flex flex-col justify-center ${
                    size === s.id
                      ? 'border-secondary bg-secondary/20 text-foreground font-bold shadow-sm'
                      : 'border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground'
                  }`}
                  title={s.desc}
                >
                  <span className="text-xs leading-tight">{s.label}</span>
                  <span className="text-[9px] text-muted-foreground line-clamp-1">
                    {s.desc.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Palette Selector */}
        <div>
          <label className="block text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-primary" />
            <span>4. Visual Palette Atmosphere</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.values(DREAM_PALETTES).map(p => (
              <button
                type="button"
                key={p.id}
                onClick={() => {
                  audio.playClick();
                  setPaletteId(p.id);
                }}
                className={`min-h-[58px] p-2.5 rounded-2xl border-2 text-left transition-all touch-manipulation flex flex-col justify-between ${
                  paletteId === p.id
                    ? 'border-primary ring-2 ring-primary/40 bg-card shadow-[2px_2px_0_0_hsl(var(--border))] scale-[1.02]'
                    : 'border-border/60 bg-muted/30 hover:bg-muted/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-foreground truncate">
                    {p.name}
                  </span>
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/30"
                    style={{ backgroundColor: p.primaryColor }}
                  />
                </div>
                <div className="flex gap-1">
                  {p.skyGradient.map((col, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-1.5 rounded-full"
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-xl bg-destructive/10 border-2 border-destructive/40 text-destructive text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>AI Dream Engine • Real-time Starlight & Lore Synthesis</span>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-2xl font-bold text-sm bg-primary text-primary-foreground border-2 border-border shadow-[3px_3px_0_0_hsl(var(--border))] hover:opacity-95 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2.5 touch-manipulation disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>AI Dream Engine Weaving Starlight...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
                <span>Bring My World to Life (AI Dream Engine)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
