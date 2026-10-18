import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Moon,
  Sparkles,
  Compass,
  Wrench,
  BookOpen,
  Box,
  MessageSquare,
  Home,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';
import { AudioController } from '@/components/immersion/AudioController';
import { ThemeSwitcher } from '@/components/immersion/ThemeSwitcher';
import { HitCounter } from '@/components/guestbook/HitCounter';
import { useMood } from '@/context/MoodContext';
import { audio } from '@/utils/audio';

export const AppNavbar: React.FC = () => {
  const { theme, setTheme, sparklesEnabled, setSparklesEnabled } = useMood();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { to: '/atelier', label: 'World Atelier', icon: <Compass className="w-3.5 h-3.5" /> },
    { to: '/workshop', label: 'Workshop', icon: <Wrench className="w-3.5 h-3.5" /> },
    { to: '/storybook', label: 'Storybook', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { to: '/sanctuary', label: '3D Pip Sanctuary', icon: <Box className="w-3.5 h-3.5" /> },
    { to: '/guestbook', label: 'Guestbook', icon: <MessageSquare className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b-2 border-border/80 px-3 sm:px-4 py-2 sm:py-2.5 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 w-full">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-2 min-w-0">
          <Link
            to="/"
            onClick={() => audio.playLullabyArpeggio()}
            className="flex items-center gap-2 group min-w-0"
          >
            <div className="w-8 h-8 rounded-full bg-[#fdfbf7] dark:bg-[#e8e4dc] border-2 border-[#5c4033] flex items-center justify-center shadow-[2px_2px_0_0_#5c4033] group-hover:rotate-12 transition-transform shrink-0">
              <Moon className="w-4 h-4 text-[#a34063] fill-[#a34063]/30" />
            </div>
            <div className="min-w-0">
              <span className="font-bold font-serif-header text-xs sm:text-sm text-foreground flex items-center gap-1.5 truncate">
                Pip's Dream Atelier
                <span className="text-[9px] font-sans px-1.5 py-0.2 rounded bg-secondary/30 text-foreground font-semibold shrink-0">
                  Track 1
                </span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground block truncate leading-tight">
                Midnight Nursery • 3-Tier Multi-Page
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-semibold">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => audio.playClick()}
                className={`min-h-[36px] px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap touch-manipulation ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <span className="shrink-0">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Global Controls & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 justify-end shrink-0">
          <div className="hidden md:block">
            <HitCounter />
          </div>

          <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />

          <button
            onClick={() => {
              audio.playClick();
              setSparklesEnabled(!sparklesEnabled);
            }}
            className={`min-h-[38px] min-w-[38px] p-2 rounded-full border-2 border-border text-xs font-bold transition-all touch-manipulation flex items-center justify-center ${
              sparklesEnabled
                ? 'bg-secondary/20 text-foreground shadow-sm'
                : 'bg-muted text-muted-foreground'
            }`}
            title={sparklesEnabled ? 'Disable cursor sparkle trail' : 'Enable cursor sparkle trail'}
            aria-label="Toggle sparkle cursor trail"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
          </button>

          <AudioController />

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => {
              audio.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden min-h-[38px] min-w-[38px] p-2 rounded-xl border-2 border-border bg-card text-foreground hover:bg-muted transition-colors flex items-center justify-center touch-manipulation"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 pt-2 border-t border-border/60 grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-2 bg-card rounded-2xl shadow-lg animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => {
                  audio.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'bg-muted/40 text-foreground hover:bg-muted'
                }`}
              >
                <span className="shrink-0">{link.icon}</span>
                <span className="truncate">{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};
