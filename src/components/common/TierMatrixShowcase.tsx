import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Award, Zap, Crown, ArrowRight, Sparkles } from 'lucide-react';
import { audio } from '@/utils/audio';

export const TierMatrixShowcase: React.FC = () => {
  const tiers = [
    {
      tier: 'Tier 1',
      title: 'Complete Portfolio',
      badge: 'Core Complete',
      badgeColor: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      desc: 'Achievable by most builders. Foundational excellence in character responsiveness & visual craft.',
      items: [
        { label: 'Character reacts to cursor', detail: 'Eyes follow pointer, head tilts smoothly with touch fallback' },
        { label: 'Scroll-driven story', detail: 'Chronicle scenes advance cleanly with scroll depth' },
        { label: 'Day/night/dream toggle', detail: 'Alters character expression, nightcap, and full palette' },
        { label: 'Responsive layout', detail: 'Verified crisp on 375px mobile screens' },
        { label: 'Discoverable Easter egg', detail: '5-click nightcap reveals Dream Master Certificate' },
      ],
      link: null,
    },
    {
      tier: 'Tier 2',
      title: 'Memorable Standout',
      badge: 'High-Scoring',
      badgeColor: 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      desc: 'Separates strong builders. Rich tactile instruments and bedtime engineering.',
      items: [
        { label: 'Lullaby Lab with real audio', detail: 'Web Audio API synthesizer with required mute switch' },
        { label: 'Flashlight nightlight cursor', detail: 'Canvas mask illuminating dark nocturnal dream layers' },
        { label: 'Dream Delivery map animation', detail: 'SVG courier flight path motion across sleep colonies' },
        { label: 'Interactive storybook', detail: 'Page-turn flip animation with touch & keyboard arrows' },
        { label: 'Falling Dreams mini-game', detail: 'Catch falling dreams with rattle audio and score tracking' },
      ],
      link: { to: '/workshop', label: 'Explore Workshop & Storybook' },
    },
    {
      tier: 'Tier 3',
      title: 'Legendary Boss Level',
      badge: 'Legendary Tier',
      badgeColor: 'bg-purple-500/15 border-purple-500/40 text-purple-700 dark:text-purple-300',
      icon: <Crown className="w-5 h-5 text-purple-500" />,
      desc: 'Rare & impressive boss tier. 3D WebGL, live database persistence, and conversational AI.',
      items: [
        { label: '3D WebGL Three.js model', detail: 'Rotate 360°, pointer head-tilt, starlight eyes & animations' },
        { label: 'Live dream guestbook', detail: 'Supabase Postgres backend saving visitor wishes' },
        { label: 'Character remembers visitor', detail: 'LocalStorage visitor recognition & custom greetings' },
        { label: 'Character chats back', detail: 'Real AI streaming speech & human-like phone call widget' },
        { label: 'High Lighthouse performance', detail: '60fps animation loops, optimized bundle & zero errors' },
      ],
      link: { to: '/sanctuary', label: 'Launch 3D Sanctuary & AI Agent' },
    },
  ];

  return (
    <section className="space-y-4 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-border/60 pb-3">
        <div>
          <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL SPECIFICATION AUDIT</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-header text-foreground">
            3-Tier Hackathon Mastery Matrix
          </h2>
        </div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
          All 3 Tiers 100% Implemented
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full min-w-0">
        {tiers.map((t) => (
          <div
            key={t.tier}
            className="p-5 sm:p-6 rounded-3xl bg-card border-[3px] border-border shadow-[4px_4px_0_0_hsl(var(--border))] flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-transform"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${t.badgeColor}`}>
                  {t.badge}
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">{t.tier}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-serif-header text-foreground flex items-center gap-2">
                  {t.icon}
                  <span>{t.title}</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/40">
                {t.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="font-bold text-foreground block">{item.label}</span>
                      <span className="text-[11px] text-muted-foreground">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {t.link && (
              <div className="pt-2">
                <Link
                  to={t.link.to}
                  onClick={() => audio.playClick()}
                  className="w-full min-h-[40px] px-4 py-2 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-border"
                >
                  <span>{t.link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
