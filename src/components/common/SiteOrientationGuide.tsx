import React from 'react';
import {
  Compass,
  Wrench,
  BookOpen,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Moon,
  Music,
} from 'lucide-react';
import { audio } from '@/utils/audio';

export const SiteOrientationGuide: React.FC = () => {
  const sections = [
    {
      id: 'world-atelier',
      number: '01',
      title: 'World Atelier',
      badge: 'Interactive AI Dream Studio',
      description:
        'Create living nocturnal dreamscapes using custom prompts, archetypes, and palettes. Inspect layered SVG skies, waypoint lore, and chat directly with Pip.',
      icon: <Compass className="w-5 h-5 text-primary" />,
      actionText: 'Open Dream Studio',
      colorBorder: 'hover:border-primary',
      accentBg: 'bg-primary/10 text-primary',
    },
    {
      id: 'showcase-projects',
      number: '02',
      title: "Pip's Invention Workshop",
      badge: 'Playable Web Audio & Tools',
      description:
        'Experiment with real bedtime prototypes: play the Lullaby Synthesizer keyboard, adjust 5-spectrum nightlights, and inspect dream delivery flight routes.',
      icon: <Music className="w-5 h-5 text-secondary" />,
      actionText: 'Test Inventions',
      colorBorder: 'hover:border-secondary',
      accentBg: 'bg-secondary/15 text-foreground',
    },
    {
      id: 'origin-story',
      number: '03',
      title: "Pip's Origin Story",
      badge: 'Illustrated Lore Chapters',
      description:
        'Discover the illustrated bedside story of how an abandoned skull baby found his nightcap star and became the Junior Dream Engineer of Midnight Nursery.',
      icon: <BookOpen className="w-5 h-5 text-amber-500" />,
      actionText: 'Read Bedtime Lore',
      colorBorder: 'hover:border-amber-500',
      accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'guestbook',
      number: '04',
      title: 'Community Guestbook',
      badge: 'Bedtime Notes & Visitor Counter',
      description:
        'Leave a warm bedtime note for other nocturnal wanderers, check the live odometer visitor counter, and unlock the secret nightcap certificate.',
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
      actionText: 'Leave a Note',
      colorBorder: 'hover:border-emerald-500',
      accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ];

  const handleCardClick = (id: string) => {
    audio.playClick();
    audio.playChime(587.33, 'sine', 0.25);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-card/95 border-[3px] border-border rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[4px_4px_0_0_hsl(var(--border))] my-6 sm:my-8 w-full min-w-0">
      {/* Purpose Banner */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-border/40">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/15 text-foreground text-[11px] font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-secondary" />
            <span>Orientation Hub • What Is This Website?</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif-header text-foreground">
            Welcome to Pip's Midnight Nursery & Dream Atelier
          </h2>
          <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
            This website is the official creative portfolio and interactive playground for{' '}
            <strong className="text-foreground font-semibold">Pip, The Skull Baby</strong> (Junior Dream Engineer at Midnight Nursery). Pip manufactures comforting dreams, tests melodic sleep aids, and ensures bedtime is 100% cozy with zero nightmares.
          </p>
        </div>

        {/* Quick Highlights Badge */}
        <div className="bg-muted/50 border border-border/80 rounded-2xl p-3 sm:p-3.5 self-start sm:self-auto shrink-0 flex items-center gap-3 text-xs text-muted-foreground">
          <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-foreground block">100% Real Features</span>
            <span>Web Audio • SVG Atlas • Full Lore</span>
          </div>
        </div>
      </div>

      {/* 4 Clear Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {sections.map(sec => (
          <div
            key={sec.id}
            onClick={() => handleCardClick(sec.id)}
            className={`p-4 sm:p-5 rounded-2xl bg-muted/30 border-2 border-border transition-all cursor-pointer shadow-[2px_2px_0_0_hsl(var(--border))] hover:shadow-[4px_4px_0_0_hsl(var(--border))] hover:scale-[1.01] ${sec.colorBorder} flex flex-col justify-between group touch-manipulation`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${sec.accentBg}`}>
                  {sec.badge}
                </span>
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  {sec.number}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold font-serif-header text-foreground flex items-center gap-2 mb-1.5">
                <span>{sec.icon}</span>
                <span>{sec.title}</span>
              </h3>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {sec.description}
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
              <span>{sec.actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
