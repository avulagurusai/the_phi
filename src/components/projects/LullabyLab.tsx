import React, { useState } from 'react';
import { Music, Play, Disc, Sparkles } from 'lucide-react';
import { audio } from '@/utils/audio';

export const LullabyLab: React.FC = () => {
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const [activeKey, setActiveKey] = useState<number | null>(null);

  const keys = [
    { note: 'C5', name: 'Do', freq: 523.25, color: '#f87171' },
    { note: 'D5', name: 'Re', freq: 587.33, color: '#fb923c' },
    { note: 'E5', name: 'Mi', freq: 659.25, color: '#fbbf24' },
    { note: 'G5', name: 'Sol', freq: 783.99, color: '#34d399' },
    { note: 'A5', name: 'La', freq: 880.00, color: '#38bdf8' },
    { note: 'C6', name: 'High Do', freq: 1046.50, color: '#818cf8' },
    { note: 'D6', name: 'High Re', freq: 1174.66, color: '#c084fc' },
    { note: 'E6', name: 'High Mi', freq: 1318.51, color: '#f472b6' },
  ];

  const playKey = (idx: number) => {
    setActiveKey(idx);
    audio.playChime(keys[idx].freq, 'sine', 0.45);
    setTimeout(() => setActiveKey(null), 250);
  };

  const playMelody = (melodyName: 'twinkle' | 'brahms') => {
    if (isPlayingMelody) return;
    setIsPlayingMelody(true);

    let melody: number[] = [];
    if (melodyName === 'twinkle') {
      melody = [0, 0, 3, 3, 4, 4, 3, 2, 2, 1, 1, 0];
    } else {
      melody = [2, 2, 3, 2, 2, 3, 2, 3, 5, 4, 3, 2, 0];
    }

    melody.forEach((noteIdx, i) => {
      setTimeout(() => {
        playKey(noteIdx);
        if (i === melody.length - 1) {
          setIsPlayingMelody(false);
        }
      }, i * 360);
    });
  };

  return (
    <div className="bg-card border-[3px] border-border rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0_0_hsl(var(--border))] flex flex-col justify-between h-full w-full min-w-0">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <span>Project #1</span>
              <span>•</span>
              <span>Web Audio Synth</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold font-serif-header text-foreground">
              The Lullaby Lab
            </h3>
          </div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-muted/60 border border-border p-1.5 flex items-center justify-center shrink-0">
            <img
              src="https://hax.baby/baby/assets/pip_lullaby_box.png"
              alt="Pip's Lullaby Music Box"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
          Pip’s handcrafted clockwork music box. Synthesizes soothing pentatonic frequencies in real time to calm bedtime jitters.
        </p>

        {/* Preset Melody Auto-Players */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] font-semibold text-muted-foreground">Sleep Tunes:</span>
          <button
            onClick={() => playMelody('twinkle')}
            disabled={isPlayingMelody}
            className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary/20 text-foreground border border-secondary/50 hover:bg-secondary/30 active:scale-95 transition-all disabled:opacity-50 touch-manipulation"
          >
            <Play className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>Twinkle Star</span>
          </button>
          <button
            onClick={() => playMelody('brahms')}
            disabled={isPlayingMelody}
            className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/20 text-foreground border border-primary/50 hover:bg-primary/30 active:scale-95 transition-all disabled:opacity-50 touch-manipulation"
          >
            <Disc className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Brahms Cradle</span>
          </button>
        </div>

        {/* 8-Key Playable Xylophone Chime Keyboard */}
        <div className="bg-muted/50 p-2.5 sm:p-3 rounded-2xl border-2 border-border/80 mb-4">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
            {keys.map((k, idx) => (
              <button
                key={k.note}
                onClick={() => playKey(idx)}
                className={`min-h-[56px] flex flex-col items-center justify-between p-2 sm:p-2.5 rounded-xl border-2 border-border text-center transition-all touch-manipulation active:translate-y-1 ${
                  activeKey === idx
                    ? 'translate-y-1 bg-amber-300 shadow-none'
                    : 'bg-card hover:-translate-y-0.5 shadow-[2px_2px_0_0_hsl(var(--border))]'
                }`}
                style={{
                  borderTopColor: k.color,
                  borderTopWidth: '4px',
                }}
              >
                <span className="text-[10px] font-mono font-bold text-muted-foreground">
                  {k.note}
                </span>
                <span className="text-xs font-bold text-foreground my-0.5">
                  {k.name}
                </span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: k.color }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/50">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-secondary shrink-0" />
          Tap any chime key to play live
        </span>
        <span className="font-mono text-[10px]">Pentatonic • 440-1318Hz</span>
      </div>
    </div>
  );
};
