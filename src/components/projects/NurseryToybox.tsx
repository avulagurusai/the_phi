import React, { useState } from 'react';
import { Ruler, Sparkles, Shield, Moon, Star, Heart, Cloud, Bell } from 'lucide-react';
import { audio } from '@/utils/audio';

interface ToyItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export const NurseryToybox: React.FC = () => {
  const toyOptions: ToyItem[] = [
    { id: 'moon', name: 'Crescent', icon: <Moon className="w-4 h-4 text-amber-400" />, color: '#fbbf24' },
    { id: 'star', name: 'Star', icon: <Star className="w-4 h-4 text-amber-300 fill-amber-300" />, color: '#f59e0b' },
    { id: 'heart', name: 'Heart', icon: <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />, color: '#ec4899' },
    { id: 'cloud', name: 'Puff', icon: <Cloud className="w-4 h-4 text-sky-400" />, color: '#38bdf8' },
    { id: 'bell', name: 'Chime', icon: <Bell className="w-4 h-4 text-purple-400" />, color: '#a855f7' },
    { id: 'sparkles', name: 'Wish', icon: <Sparkles className="w-4 h-4 text-rose-400" />, color: '#f43f5e' },
  ];

  const [blockTower, setBlockTower] = useState<ToyItem[]>([toyOptions[0], toyOptions[1], toyOptions[2]]);
  const [rattleShake, setRattleShake] = useState(false);

  const addBlock = () => {
    if (blockTower.length >= 6) {
      // Tower topples!
      audio.playChime(329.63, 'sawtooth', 0.2);
      setBlockTower([toyOptions[0]]);
      return;
    }
    audio.playClick();
    audio.playChime(523.25 + blockTower.length * 80, 'sine', 0.2);
    const randomToy = toyOptions[Math.floor(Math.random() * toyOptions.length)];
    setBlockTower(prev => [...prev, randomToy]);
  };

  const shakeRattle = () => {
    setRattleShake(true);
    audio.playChime(880, 'triangle', 0.15);
    setTimeout(() => audio.playChime(1046.5, 'triangle', 0.15), 100);
    setTimeout(() => setRattleShake(false), 400);
  };

  return (
    <div className="bg-card border-[3px] border-border rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0_0_hsl(var(--border))] flex flex-col justify-between h-full w-full min-w-0">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/20 text-foreground text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <span>Showcase Extra</span>
              <span>•</span>
              <span>Nursery Toys</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold font-serif-header text-foreground">
              Pip's Growth Chart & Toybox
            </h3>
          </div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-muted/60 border border-border p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src="https://hax.baby/baby/assets/pip_portrait.png"
              alt="Pip's Official Portrait"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
          Milestones measured on the nursery cedar wall, paired with Pip's tactile bedtime toybox.
        </p>

        {/* Growth Wall Milestones */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-muted/50 border border-border/60">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-secondary shrink-0" />
              Current Height
            </span>
            <span className="font-bold font-mono text-primary">14.5 Dream Inches</span>
          </div>

          <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-muted/50 border border-border/60">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              Lullabies Mastered
            </span>
            <span className="font-bold font-mono text-foreground">142 Tunes</span>
          </div>
        </div>

        {/* Interactive Playable Stacking Blocks */}
        <div className="bg-muted/40 p-3 sm:p-3.5 rounded-2xl border-2 border-border/70 mb-4">
          <div className="flex items-center justify-between text-xs font-bold text-foreground mb-2">
            <span>Bedtime Block Tower:</span>
            <span className="text-[10px] text-muted-foreground">({blockTower.length}/6 blocks)</span>
          </div>

          {/* Render Stacked Blocks with Vector Icon Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 min-h-[52px] bg-background/80 p-2.5 rounded-xl border border-border">
            {blockTower.map((toy, idx) => (
              <button
                key={idx}
                type="button"
                className="w-10 h-10 rounded-xl bg-card border-2 border-border shadow-[2px_2px_0_0_hsl(var(--border))] flex items-center justify-center transform active:scale-95 hover:scale-105 transition-transform touch-manipulation"
                title={`Tap ${toy.name} block!`}
                onClick={() => audio.playChime(400 + idx * 70, 'sine', 0.2)}
              >
                {toy.icon}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={addBlock}
              className="flex-1 min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold bg-primary text-primary-foreground border border-border shadow-[2px_2px_0_0_hsl(var(--border))] hover:opacity-95 active:scale-95 transition-all touch-manipulation"
            >
              {blockTower.length >= 6 ? 'Topple & Reset' : '+ Stack Block'}
            </button>

            <button
              onClick={shakeRattle}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold bg-secondary/30 text-foreground border border-border hover:bg-secondary/40 active:scale-95 transition-all touch-manipulation flex items-center gap-1.5 ${
                rattleShake ? 'rotate-12 scale-110' : ''
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>Rattle</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/50">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-secondary shrink-0" />
          Tactile sound toys
        </span>
        <span className="font-mono text-[10px]">Cedar Wood • Shift 3</span>
      </div>
    </div>
  );
};
