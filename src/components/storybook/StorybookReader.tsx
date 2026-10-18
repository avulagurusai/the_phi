import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Bookmark,
  Volume2,
  Moon,
  Clock,
  Heart,
  RotateCcw,
} from 'lucide-react';
import { audio } from '@/utils/audio';

interface StoryChapter {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  content: string[];
  illustrationTheme: string;
  verseQuote: string;
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    title: 'The Shift 3 Awakening',
    subtitle: 'Where Baby Skulls Weave Starlight',
    badge: 'Origin',
    content: [
      'Deep inside the clockwork eaves of Midnight Nursery, when clocks strike twelve, the daylight staff departs.',
      'That is when Pip yawns, polishes his lucky nightcap star with an amber flannel cloth, and rolls out his starlight compass.',
      'Unlike noisy daytime engines, Pip’s workbench is silent except for the gentle ticking of pendulum cradles and the whisper of silk moth wings.',
      '“Tonight,” Pip whispers into his tea, “nobody will have a lonely or scary dream. Not on my watch.”',
    ],
    illustrationTheme: 'from-amber-950/40 via-purple-950/50 to-slate-900',
    verseQuote: '“Sleep is not the end of the day; it is the beginning of a better universe.”',
  },
  {
    id: 2,
    title: 'The Stardust Looms',
    subtitle: 'Filtering the Midnight Sky',
    badge: 'Crafting',
    content: [
      'Pip ascends to the Loom Balcony where celestial threads drift down from the Milky Way like silver spiderweb.',
      'Using his bone-porcelain fingers, Pip catches harsh anxieties and prickly thoughts, tossing them gently into the compost bin where sweet nocturnal mushrooms turn them into quiet hums.',
      'He weaves together warm honey vapor, soft dandelion fluff, and low-frequency lullaby chords.',
      'The result is a Dream Core: spherical, warm to the touch, and certified 100% nightmare-free.',
    ],
    illustrationTheme: 'from-pink-950/40 via-rose-950/50 to-slate-900',
    verseQuote: '“Every rough thought softens once you wrap it in three layers of warm milk mist.”',
  },
  {
    id: 3,
    title: 'The Lullaby Couriers',
    subtitle: 'Midnight Moth Express',
    badge: 'Dispatch',
    content: [
      'At 2:00 AM, the delivery fleet reports to Pip’s desk. Velvet dormice in brass goggles, glowing moths with velvet saddlebags, and tiny starlight sprites.',
      'Pip stamps each package with the official Midnight Nursery wax seal: a smiling baby skull under a crescent moon.',
      'The couriers slip out through the chimney flues, gliding noiselessly above sleepy rooftops, dropping warm dreams under children’s and adults’ pillows alike.',
      'Even in noisy cities with siren sounds, Pip’s dream-bubbles create a silent dome of total safety.',
    ],
    illustrationTheme: 'from-indigo-950/40 via-blue-950/50 to-slate-900',
    verseQuote: '“A single sleepy moth can carry ten thousand quiet wishes without breaking a single wing beat.”',
  },
  {
    id: 4,
    title: 'The 13th Hour Sanctuary',
    subtitle: 'Beyond the Reach of Alarms',
    badge: 'Sanctuary',
    content: [
      'Beyond ordinary clocks lies Pip’s greatest engineering secret: the 13th Hour.',
      'In this pocket dimension, time does not race forward to Monday morning meetings or school bells. It moves at the speed of breathing in and breathing out.',
      'Here, restless sleepers can wander through starry libraries, float across warm lavender ponds, or curl up with friendly cloud cats.',
      'You can stay as long as your heart needs to heal and recharge before dawn arrives.',
    ],
    illustrationTheme: 'from-violet-950/40 via-purple-950/50 to-slate-900',
    verseQuote: '“In the 13th hour, there are no deadlines. Only stardust and deep, honest rest.”',
  },
  {
    id: 5,
    title: 'Pip’s Golden Promise',
    subtitle: 'A Lullaby for Every Pillow',
    badge: 'Promise',
    content: [
      'As the first pink slivers of dawn brush the horizon, Pip climbs atop the highest brass bell tower.',
      'He rings the tiny silver chime on his nightcap tip, signaling the end of Shift 3.',
      'All dreams have reached their pillows. Every restless forehead is smooth and relaxed.',
      'Pip sips the last drop of warm chamomile, closes his glowing amber eye sockets, curls up inside a soft cloud basket, and drifts off to sleep, knowing the world is safe.',
    ],
    illustrationTheme: 'from-amber-950/40 via-emerald-950/40 to-slate-900',
    verseQuote: '“Rest now, traveler. Dr. Pip and the Midnight Nursery have kept the night safe for you.”',
  },
];

export const StorybookReader: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const totalPages = CHAPTERS.length;
  const chapter = CHAPTERS[currentPage];

  const handleNext = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      audio.playClick();
      audio.playChime(587.33, 'triangle', 0.2);
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 250);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0 && !isFlipping) {
      audio.playClick();
      audio.playChime(440, 'triangle', 0.2);
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 250);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6">
      {/* Chapter Indicator Bar */}
      <div className="w-full flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="font-bold text-foreground">
            Chapter {chapter.id} of {totalPages}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-secondary/30 text-[10px] font-bold text-foreground">
            {chapter.badge}
          </span>
        </div>

        {/* Quick Chapter Tabs */}
        <div className="hidden sm:flex items-center gap-1">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                if (idx !== currentPage && !isFlipping) {
                  audio.playClick();
                  setCurrentPage(idx);
                }
              }}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                idx === currentPage
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {ch.id}
            </button>
          ))}
        </div>
      </div>

      {/* Book Container with Realistic Binding & 3D Shadow */}
      <div className="relative w-full rounded-3xl bg-card border-[3px] border-border shadow-[6px_6px_0_0_hsl(var(--border))] overflow-hidden flex flex-col md:flex-row min-h-[480px] sm:min-h-[520px]">
        {/* Left Book Page (Illustration & Atmospheric Art) */}
        <div
          className={`w-full md:w-5/12 bg-gradient-to-br ${chapter.illustrationTheme} p-6 sm:p-8 flex flex-col justify-between text-white border-b-2 md:border-b-0 md:border-r-2 border-border/60 relative overflow-hidden transition-all duration-300`}
        >
          {/* Subtle Starry overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

          {/* Top Stamp */}
          <div className="flex items-center justify-between text-xs z-10">
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-[10px] font-mono tracking-wider">
              MIDNIGHT ARCHIVES
            </span>
            <Moon className="w-4 h-4 text-amber-300 fill-amber-300" />
          </div>

          {/* Centerpiece Visual Motif */}
          <div className="my-auto py-8 text-center space-y-3 z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-white/10 border-2 border-white/40 flex items-center justify-center shadow-lg backdrop-blur-sm relative">
              <Sparkles className="w-12 h-12 text-amber-300 animate-pulse" />
              <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold">
                Shift 3 Canon
              </div>
            </div>

            <div className="text-center">
              <span className="text-[11px] font-mono tracking-widest text-white/80 uppercase block">
                {chapter.subtitle}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif-header text-amber-200 mt-1">
                {chapter.title}
              </h3>
            </div>
          </div>

          {/* Poetic Bedtime Quote */}
          <div className="z-10 p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <p className="text-xs text-white/90 italic font-serif-header leading-relaxed">
              {chapter.verseQuote}
            </p>
          </div>
        </div>

        {/* Right Book Page (Typeset Text & Interactive Controls) */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between bg-card text-foreground relative">
          {/* Page Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border/40 text-xs text-muted-foreground font-mono">
            <span>Volume I • The Bedtime Chronicles</span>
            <span>Page {chapter.id}</span>
          </div>

          {/* Animated Page Content */}
          <div
            className={`my-auto py-4 space-y-4 transition-all duration-200 ${
              isFlipping
                ? flipDirection === 'next'
                  ? 'opacity-0 translate-x-4'
                  : 'opacity-0 -translate-x-4'
                : 'opacity-100 translate-x-0'
            }`}
          >
            <h2 className="text-xl sm:text-2xl font-bold font-serif-header text-foreground">
              {chapter.title}
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
              {chapter.content.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? 'first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-primary font-medium' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Page Turn Bottom Navigation Bar */}
          <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0 || isFlipping}
              className="px-4 py-2 rounded-xl border-2 border-border bg-card text-xs font-bold text-foreground hover:bg-muted transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 shadow-xs touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            <span className="text-xs font-mono font-bold text-muted-foreground">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1 || isFlipping}
              className="px-4 py-2 rounded-xl border-2 border-border bg-primary text-primary-foreground text-xs font-bold transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 shadow-[2px_2px_0_0_hsl(var(--border))] hover:opacity-95 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none touch-manipulation"
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Hint Pill */}
      <div className="text-[11px] text-muted-foreground font-mono text-center">
        Tip: Press <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">←</kbd> or{' '}
        <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">→</kbd> on your keyboard to turn pages smoothly.
      </div>
    </div>
  );
};
