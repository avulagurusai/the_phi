import React, { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Moon, Star, Key, Cloud, CloudRain, Lamp, Heart, Scroll, Compass, ShieldCheck } from 'lucide-react';
import { audio } from '@/utils/audio';

interface StoryScene {
  id: number;
  chapter: string;
  title: string;
  badge: string;
  content: string;
  ambientNote: number;
  icons: React.ReactNode;
}

export const BedtimeOriginStory: React.FC = () => {
  const [activeScene, setActiveScene] = useState(0);

  const scenes: StoryScene[] = [
    {
      id: 1,
      chapter: 'Chapter I',
      title: 'The Cloud Cradle of Midnight',
      badge: 'Origin',
      content:
        'Pip was discovered on a calm autumn dusk, swaddled snugly inside a drifting marshmallow cloud. Perched over his round smooth skull was a soft flannel nightcap with embroidered stars, caught on the horn of a crescent moon. Even as an infant, Pip never cried in fear—his round amber eye sockets radiated a gentle warmth that soothed trembling fireflies.',
      ambientNote: 440,
      icons: (
        <div className="flex items-center gap-1.5 p-2 bg-muted/80 rounded-xl border border-border">
          <Cloud className="w-5 h-5 text-sky-400" />
          <Moon className="w-5 h-5 text-amber-400" />
          <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
        </div>
      ),
    },
    {
      id: 2,
      chapter: 'Chapter II',
      title: 'The Apprenticeship at Midnight Nursery',
      badge: 'Learning',
      content:
        'Grand Architect Willow welcomed Pip into the Midnight Nursery, the secret clockwork observatory that crafts dreams for all resting creatures. Willow handed Pip a brass music-box key and a pouch of stardust. Where older artisans forged grand sagas, Pip discovered his true talent was intimate: tiny tinkling lullabies and nightlights that dissolve monster shadows beneath children’s beds.',
      ambientNote: 523.25,
      icons: (
        <div className="flex items-center gap-1.5 p-2 bg-muted/80 rounded-xl border border-border">
          <Key className="w-5 h-5 text-amber-500" />
          <Sparkles className="w-5 h-5 text-pink-400" />
          <Moon className="w-5 h-5 text-primary" />
        </div>
      ),
    },
    {
      id: 3,
      chapter: 'Chapter III',
      title: 'The Night of the Hazelwood Shadows',
      badge: 'The Trial',
      content:
        'When a thunderstorm blew through Hazelwood Valley, darkness swallowed the neighborhood streetlamps, leaving children weeping in the dark. Pip gathered his Lullaby Box and bedside lanterns. Flying low across damp chimneys, he plucked notes on his xylophone. As each chime rang out, gentle golden light pooled in the bedroom windows, turning nightmares into dreams of cotton-candy skies.',
      ambientNote: 659.25,
      icons: (
        <div className="flex items-center gap-1.5 p-2 bg-muted/80 rounded-xl border border-border">
          <CloudRain className="w-5 h-5 text-blue-400" />
          <Lamp className="w-5 h-5 text-amber-400" />
          <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
        </div>
      ),
    },
    {
      id: 4,
      chapter: 'Chapter IV',
      title: 'The Junior Dream Engineer’s Pledge',
      badge: 'Today',
      content:
        'Now an official Junior Dream Engineer, Pip works the third shift from midnight to dawn. Every night, he tunes his pentatonic melodies, tests new lantern glow hues, and charts flight routes over slumbering towns. "Good things start small," whispers Pip with his tiny crooked smile, "and every big dream begins with a sound night’s sleep."',
      ambientNote: 783.99,
      icons: (
        <div className="flex items-center gap-1.5 p-2 bg-muted/80 rounded-xl border border-border">
          <Scroll className="w-5 h-5 text-amber-500" />
          <Compass className="w-5 h-5 text-secondary" />
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
      ),
    },
  ];

  const handleSceneChange = (index: number) => {
    const nextIdx = Math.max(0, Math.min(index, scenes.length - 1));
    setActiveScene(nextIdx);
    audio.playClick();
    audio.playChime(scenes[nextIdx].ambientNote, 'sine', 0.5);
  };

  const scene = scenes[activeScene];

  return (
    <section id="origin-story" className="py-8 sm:py-12 border-t-2 border-border/40 w-full min-w-0">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/40 text-foreground text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-secondary" />
          <span>Module 03 • Illustrated Origin Lore</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-serif-header text-foreground">
          How Pip Found His Nightcap
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mt-2 leading-relaxed">
          Flip through Pip’s illustrated bedtime chronicles. Concise story scenes told in under 150 words per chapter.
        </p>
      </div>

      {/* Storybook Wrapper */}
      <div className="max-w-3xl mx-auto bg-card border-[3px] border-border rounded-3xl p-5 sm:p-8 shadow-[4px_4px_0_0_hsl(var(--border))] sm:shadow-[5px_5px_0_0_hsl(var(--border))] relative overflow-hidden w-full min-w-0">
        {/* Storybook Spine Accent */}
        <div className="absolute top-0 left-0 bottom-0 w-2.5 sm:w-3 bg-primary/20 border-r border-border" />

        {/* Scene Navigation Tabs - Scrollable on mobile */}
        <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3 mb-5 ml-2 sm:ml-3">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[240px] sm:max-w-none no-scrollbar">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSceneChange(idx)}
                className={`min-h-[38px] px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all touch-manipulation ${
                  activeScene === idx
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {s.chapter}
              </button>
            ))}
          </div>

          <div className="text-[11px] sm:text-xs font-mono text-muted-foreground shrink-0">
            {activeScene + 1}/{scenes.length}
          </div>
        </div>

        {/* Scene Content Area */}
        <div className="ml-2 sm:ml-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
              {scene.badge}
            </span>
            <div>{scene.icons}</div>
          </div>

          <h3 className="text-lg sm:text-2xl font-bold font-serif-header text-foreground mb-3 sm:mb-4">
            {scene.title}
          </h3>

          <p className="text-xs sm:text-sm md:text-base leading-relaxed text-foreground/90 font-medium font-serif">
            {scene.content}
          </p>

          {/* Sound cue badge & Prev / Next */}
          <div className="mt-6 pt-4 border-t border-border/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>Chime Frequency: {scene.ambientNote} Hz</span>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => handleSceneChange(activeScene - 1)}
                disabled={activeScene === 0}
                className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border-2 border-border bg-background text-xs font-semibold disabled:opacity-40 hover:bg-muted active:scale-95 transition-all touch-manipulation"
                aria-label="Previous scene"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => handleSceneChange(activeScene + 1)}
                disabled={activeScene === scenes.length - 1}
                className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border-2 border-border bg-primary text-primary-foreground text-xs font-semibold disabled:opacity-40 hover:opacity-95 active:scale-95 transition-all touch-manipulation"
                aria-label="Next scene"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
