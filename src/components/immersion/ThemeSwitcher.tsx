import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { audio } from '@/utils/audio';

export type MoodTheme = 'day' | 'night' | 'dream';

interface ThemeSwitcherProps {
  currentTheme: MoodTheme;
  onThemeChange: (theme: MoodTheme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const themes: { id: MoodTheme; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'day',
      label: 'Day',
      icon: <Sun className="w-3.5 h-3.5" />,
      desc: 'Warm cream & berry daylight',
    },
    {
      id: 'night',
      label: 'Night',
      icon: <Moon className="w-3.5 h-3.5" />,
      desc: 'Deep indigo midnight nursery',
    },
    {
      id: 'dream',
      label: 'Dream',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      desc: 'Pastel stardust lullaby haze',
    },
  ];

  const handleSelect = (id: MoodTheme) => {
    audio.playClick();
    onThemeChange(id);
  };

  return (
    <div className="flex items-center bg-card/90 backdrop-blur-sm border-2 border-border rounded-full p-0.5 sm:p-1 shadow-sm gap-0.5">
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => handleSelect(t.id)}
          className={`min-h-[36px] min-w-[36px] sm:min-w-0 flex items-center justify-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold transition-all touch-manipulation ${
            currentTheme === t.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          title={t.desc}
          aria-label={`Switch to ${t.label} mood`}
        >
          {t.icon}
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
};
