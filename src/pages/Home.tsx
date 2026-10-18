import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/common/PageMeta';
import { CharacterHero } from '@/components/character/CharacterHero';
import { TierMatrixShowcase } from '@/components/common/TierMatrixShowcase';
import { useMood } from '@/context/MoodContext';
import {
  Compass,
  Wrench,
  BookOpen,
  Box,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Heart,
  Moon,
} from 'lucide-react';
import { audio } from '@/utils/audio';

export default function Home() {
  const { handleNightcapClick, eggClicks, hasUnlockedEgg, setIsModalOpen } = useMood();

  const featureLaunchers = [
    {
      to: '/atelier',
      title: 'AI Dream World Builder',
      subtitle: 'World Atelier',
      desc: 'Weave custom dreamscapes with real Gemini 2.5 Flash synthesis, interactive SVG atlas, and exportable JSON archives.',
      icon: <Compass className="w-5 h-5 text-primary" />,
      badge: 'AI Engine',
    },
    {
      to: '/sanctuary',
      title: '3D Pip Sanctuary',
      subtitle: 'Legendary Boss Level',
      desc: 'Full 3D WebGL character model with 360° orbit controls, pointer head-tilting, starlight eye bursts, and sleep mode.',
      icon: <Box className="w-5 h-5 text-purple-500" />,
      badge: 'Three.js 3D',
    },
    {
      to: '/workshop',
      title: 'Invention Workshop',
      subtitle: 'Lullaby Lab & Games',
      desc: 'Web Audio synth melodies, flashlight nightlight mask revealing dark layers, and Catch Falling Dreams mini-game.',
      icon: <Wrench className="w-5 h-5 text-amber-500" />,
      badge: 'Tactile Tools',
    },
    {
      to: '/storybook',
      title: 'The Bedtime Chronicles',
      subtitle: 'Interactive Storybook',
      desc: 'Turn illustrated pages with realistic flip animations, keyboard arrow shortcuts, and ambient nursery lore.',
      icon: <BookOpen className="w-5 h-5 text-sky-500" />,
      badge: 'Page-Flip',
    },
    {
      to: '/guestbook',
      title: 'Live Dream Guestbook',
      subtitle: 'Supabase Registry',
      desc: 'Persistent community message board where visitors leave bedtime notes, recognized with personalized greetings.',
      icon: <MessageSquare className="w-5 h-5 text-rose-500" />,
      badge: 'Live Backend',
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 w-full min-w-0">
      <PageMeta
        title="Pip's Dream Atelier • 3-Tier Multi-Page Nursery & AI World Engine"
        description="Official 3-tier multi-page storybook, 3D character sanctuary, and AI dream world engine for Pip, The Skull Baby at the Midnight Nursery (haX.baby)."
      />

      {/* Module 1: Interactive Character Hero Stage (Tier 1 Core) */}
      <section className="w-full">
        <CharacterHero
          onNightcapClick={handleNightcapClick}
          eggProgress={eggClicks}
          unlockedEasterEgg={hasUnlockedEgg}
          onOpenEasterEgg={() => setIsModalOpen(true)}
        />
      </section>

      {/* Multi-Page Portal Launchers */}
      <section className="space-y-4 w-full min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b-2 border-border/60 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold font-serif-header text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Multi-Page Nursery Destinations</span>
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            5 Distinct Interactive Pages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureLaunchers.map((feat) => (
            <Link
              key={feat.to}
              to={feat.to}
              onClick={() => audio.playClick()}
              className="p-5 rounded-3xl bg-card border-[3px] border-border shadow-[4px_4px_0_0_hsl(var(--border))] hover:translate-y-[-2px] hover:border-primary transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-muted/60 border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/30 text-foreground font-mono">
                    {feat.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider block">
                    {feat.subtitle}
                  </span>
                  <h3 className="text-base font-bold font-serif-header text-foreground group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-primary pt-2">
                <span>Enter Destination</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Module 2: The 3-Tier Hackathon Mastery Matrix */}
      <TierMatrixShowcase />
    </div>
  );
}
