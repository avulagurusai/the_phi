import React, { useState } from 'react';
import { PipEyeTracker } from '@/components/immersion/PipEyeTracker';
import { Sparkles, Moon, Star, Heart, ShieldCheck, Wand2, Award, Compass, Coffee, Clock } from 'lucide-react';
import { audio } from '@/utils/audio';

interface CharacterHeroProps {
  onNightcapClick: () => void;
  eggProgress: number;
  unlockedEasterEgg: boolean;
  onOpenEasterEgg: () => void;
}

export const CharacterHero: React.FC<CharacterHeroProps> = ({
  onNightcapClick,
  eggProgress,
  unlockedEasterEgg,
  onOpenEasterEgg,
}) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'official'>('interactive');

  const stats = [
    { label: 'Sleepiness', value: '98%', icon: <Moon className="w-3.5 h-3.5 text-amber-500" />, desc: 'Ready for cozy naps' },
    { label: 'Dream Crafting', value: 'Level 7', icon: <Wand2 className="w-3.5 h-3.5 text-primary" />, desc: 'Certified lullaby weaver' },
    { label: 'Cuteness', value: '100%', icon: <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />, desc: 'Clinically proven cozy' },
    { label: 'Nightmare Defense', value: '99.9%', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />, desc: 'Soft lantern shield' },
  ];

  const handleModeToggle = (mode: 'interactive' | 'official') => {
    audio.playClick();
    setViewMode(mode);
  };

  return (
    <section className="relative pt-2 sm:pt-4 pb-8 sm:pb-12 overflow-hidden w-full min-w-0">
      {/* Decorative Vector Accents (Accessible background) */}
      <div className="absolute top-4 left-3 text-secondary/30 pointer-events-none" aria-hidden="true">
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>
      <div className="absolute top-16 right-4 text-primary/30 pointer-events-none" aria-hidden="true">
        <Star className="w-4 h-4 animate-bounce" />
      </div>

      {/* Hero Header Pill */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8 px-2">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[11px] sm:text-xs font-semibold mb-3 max-w-full">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">haX.baby Hackathon 2026 • Track 1</span>
          <span className="hidden sm:inline text-foreground/70">"Good things start small"</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-header text-foreground tracking-tight max-w-2xl px-2">
          Meet <span className="text-primary underline decoration-secondary decoration-wavy decoration-2">Pip</span>, The Skull Baby
        </h1>

        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-base text-muted-foreground max-w-xl font-medium px-2 leading-relaxed">
          Junior Dream Engineer at <strong className="text-foreground font-semibold">Midnight Nursery</strong>. Designing soothing lullabies, glowing bedside nightlights, and starry bedtime journeys for sleepy creatures everywhere.
        </p>

        {/* Easter Egg Progress pill or badge */}
        {unlockedEasterEgg ? (
          <button
            onClick={onOpenEasterEgg}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 text-stone-900 rounded-full text-xs font-bold shadow-[2px_2px_0_0_#5c4033] hover:scale-105 active:scale-95 transition-transform"
          >
            <Award className="w-4 h-4 shrink-0" />
            <span>Dream Master Certificate Unlocked! View</span>
          </button>
        ) : (
          <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
            <Star className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
            <span>Secret quest: Tap Pip's starry nightcap 5 times! ({eggProgress}/5)</span>
          </div>
        )}
      </div>

      {/* Character Center Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full min-w-0">
        {/* Left Character Sheet Details */}
        <div className="lg:col-span-4 space-y-3 order-2 lg:order-1 w-full min-w-0">
          <div className="bg-card border-2 border-border rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0_0_hsl(var(--border))]">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 fill-secondary text-secondary shrink-0" />
              <span>Character Dossier</span>
            </h2>

            <dl className="space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-border/50 pb-1.5">
                <dt className="text-muted-foreground flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>Species</span>
                </dt>
                <dd className="font-semibold text-foreground text-right">Skull Baby (Sleepy Genus)</dd>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-1.5">
                <dt className="text-muted-foreground flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Profession</span>
                </dt>
                <dd className="font-semibold text-foreground text-right">Junior Dream Engineer</dd>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-1.5">
                <dt className="text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Workplace</span>
                </dt>
                <dd className="font-semibold text-foreground text-right">Midnight Nursery (Shift 3)</dd>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-1.5">
                <dt className="text-muted-foreground flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Favorite Snack</span>
                </dt>
                <dd className="font-semibold text-foreground text-right truncate max-w-[170px]">Star Marshmallows & Milk</dd>
              </div>
              <div className="flex justify-between items-center pb-0.5">
                <dt className="text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Quirk</span>
                </dt>
                <dd className="font-semibold text-foreground text-right">Glows softly when sleepy</dd>
              </div>
            </dl>
          </div>

          <div className="bg-card/70 border-2 border-border rounded-2xl p-3.5 sm:p-4 text-xs text-muted-foreground space-y-1.5">
            <p className="flex items-start gap-2">
              <span className="text-primary font-bold text-sm leading-none shrink-0">“</span>
              <span className="italic leading-relaxed">
                Never scary, gory, or creepy! Pip has smooth round bone cheeks, huge warm glowing amber eye sockets, and a soft bedtime cap.
              </span>
            </p>
          </div>
        </div>

        {/* Center Character Interactive Avatar Canvas */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 w-full min-w-0">
          {/* Avatar Mode Switcher */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-full border border-border mb-3 sm:mb-4 text-xs">
            <button
              onClick={() => handleModeToggle('interactive')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-full font-semibold transition-all touch-manipulation ${
                viewMode === 'interactive'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Interactive Eyes
            </button>
            <button
              onClick={() => handleModeToggle('official')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-full font-semibold transition-all touch-manipulation ${
                viewMode === 'official'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Official Render
            </button>
          </div>

          {/* Interactive Eye Tracking Avatar */}
          {viewMode === 'interactive' ? (
            <div className="my-1 sm:my-2 flex justify-center">
              <PipEyeTracker
                onNightcapClick={onNightcapClick}
                eggProgress={eggProgress}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                audio.playClick();
                onNightcapClick();
              }}
              className="relative group cursor-pointer touch-manipulation"
              title="Click Pip's official cloud avatar!"
            >
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-card border-[3px] border-border p-3 shadow-[4px_4px_0_0_hsl(var(--border))] flex items-center justify-center overflow-hidden">
                <img
                  src="https://hax.baby/baby/assets/pip_avatar_cloud.png"
                  alt="Pip The Skull Baby on fluffy clouds"
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full border border-border shadow-sm">
                Official haX Cutout
              </div>
            </div>
          )}

          <p className="text-[11px] sm:text-xs text-muted-foreground mt-3 text-center max-w-xs">
            {viewMode === 'interactive'
              ? 'Move cursor or touch screen to watch Pip’s amber eyes track you!'
              : 'Official character transparent render from haX.baby asset pack.'}
          </p>
        </div>

        {/* Right Stats & Superpowers */}
        <div className="lg:col-span-4 space-y-2.5 sm:space-y-3 order-3 w-full min-w-0">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5 w-full">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-card border-2 border-border rounded-2xl p-3 sm:p-3.5 shadow-[2px_2px_0_0_hsl(var(--border))] flex flex-col justify-between min-w-0"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="p-1 rounded-lg bg-muted border border-border/40 shrink-0">
                      {s.icon}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-foreground truncate">
                      {s.label}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold font-mono text-primary shrink-0">
                    {s.value}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
