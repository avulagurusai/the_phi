import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { audio } from '@/utils/audio';

export type MoodTheme = 'day' | 'night' | 'dream';

interface MoodContextType {
  theme: MoodTheme;
  setTheme: (theme: MoodTheme) => void;
  sparklesEnabled: boolean;
  setSparklesEnabled: (enabled: boolean) => void;
  eggClicks: number;
  hasUnlockedEgg: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleNightcapClick: () => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<MoodTheme>('day');
  const [sparklesEnabled, setSparklesEnabled] = useState(true);
  const [eggClicks, setEggClicks] = useState(0);
  const [hasUnlockedEgg, setHasUnlockedEgg] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync theme to document element class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-dream');

    if (theme === 'night') {
      root.classList.add('dark');
    } else if (theme === 'dream') {
      root.classList.add('theme-dream');
    }
  }, [theme]);

  // Load persisted theme and easter egg state
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('pip_mood_theme') as MoodTheme;
      if (savedTheme && ['day', 'night', 'dream'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
      const unlocked = localStorage.getItem('pip_unlocked_easter_egg') === 'true';
      if (unlocked) setHasUnlockedEgg(true);
    } catch {}
  }, []);

  const setTheme = (newTheme: MoodTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('pip_mood_theme', newTheme);
    } catch {}
  };

  const handleNightcapClick = () => {
    audio.playClick();
    audio.playChime(659.25, 'triangle', 0.2);

    const nextCount = eggClicks + 1;
    setEggClicks(nextCount);

    if (nextCount >= 5) {
      setEggClicks(0);
      setHasUnlockedEgg(true);
      try {
        localStorage.setItem('pip_unlocked_easter_egg', 'true');
      } catch {}

      audio.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#a34063', '#ec4899', '#ffffff'],
      });

      setIsModalOpen(true);
    }
  };

  return (
    <MoodContext.Provider
      value={{
        theme,
        setTheme,
        sparklesEnabled,
        setSparklesEnabled,
        eggClicks,
        hasUnlockedEgg,
        isModalOpen,
        setIsModalOpen,
        handleNightcapClick,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};
