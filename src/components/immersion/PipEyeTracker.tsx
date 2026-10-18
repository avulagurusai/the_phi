import React, { useEffect, useRef, useState } from 'react';
import { audio } from '@/utils/audio';
import { Star, Sparkles, Music } from 'lucide-react';

interface PipEyeTrackerProps {
  onNightcapClick?: () => void;
  eggProgress?: number;
}

export const PipEyeTracker: React.FC<PipEyeTrackerProps> = ({
  onNightcapClick,
  eggProgress = 0,
}) => {
  const headRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headRef.current) return;
      const rect = headRef.current.getBoundingClientRect();
      const headCenterX = rect.left + rect.width / 2;
      const headCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - headCenterX;
      const deltaY = e.clientY - headCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(5, Math.hypot(deltaX, deltaY) / 35);

      setEyeOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Occasional sleepy slow blink
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 240);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleHeadClick = () => {
    audio.playClick();
    audio.playLullabyArpeggio();
  };

  return (
    <div className="relative inline-block select-none group max-w-full">
      {/* Cloud Base Platform */}
      <div className="absolute -bottom-3 -left-4 -right-4 sm:-bottom-4 sm:-left-6 sm:-right-6 h-8 sm:h-10 bg-white/70 dark:bg-card/80 rounded-full blur-sm border border-border/40 pointer-events-none" />

      {/* Main Head Container */}
      <div
        ref={headRef}
        onClick={handleHeadClick}
        className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-[#fdfbf7] dark:bg-[#e8e4dc] border-[3px] sm:border-[3.5px] border-[#5c4033] shadow-[3px_3px_0_0_#5c4033] sm:shadow-[4px_4px_0_0_#5c4033] dark:shadow-[3px_3px_0_0_#a34063] sm:dark:shadow-[4px_4px_0_0_#a34063] cursor-pointer transform hover:scale-[1.02] transition-transform duration-200 flex flex-col items-center justify-center touch-manipulation"
        title="Pip: 'Click me to hear a lullaby!'"
      >
        {/* Nightcap with Pink Bow & Stars (Easter egg target) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (onNightcapClick) onNightcapClick();
          }}
          className="absolute -top-5 -right-2 sm:-top-8 sm:-right-4 cursor-pointer transform rotate-[14deg] hover:scale-110 active:rotate-12 transition-transform p-1"
          title="Pip's Bedtime Nightcap! (Tap the star for a surprise!)"
          role="button"
          tabIndex={0}
          aria-label="Tap Pip's lucky nightcap star"
        >
          <div className="relative">
            {/* Cone cap */}
            <div className="w-14 h-12 sm:w-20 sm:h-16 bg-[#5c4033] dark:bg-[#a34063] rounded-tl-full rounded-tr-md rounded-b-sm border-2 border-[#5c4033] flex items-center justify-center shadow-sm">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-pulse" />
            </div>
            {/* Fluffy pom-pom star tip with polished Lucide Star vector */}
            <div className="absolute -top-3 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-300 border-2 border-[#5c4033] flex items-center justify-center shadow-sm animate-bounce">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-900 fill-amber-400" />
            </div>
            {/* Cute Pink Bow */}
            <div className="absolute -bottom-2 sm:-bottom-2.5 left-1.5 sm:left-2 flex items-center">
              <div className="w-3.5 h-2.5 sm:w-4 sm:h-3 bg-[#e879a9] rounded-sm transform -rotate-12 border border-[#5c4033]" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#d14f85] border border-[#5c4033] z-10" />
              <div className="w-3.5 h-2.5 sm:w-4 sm:h-3 bg-[#e879a9] rounded-sm transform rotate-12 border border-[#5c4033]" />
            </div>
            {eggProgress > 0 && (
              <span className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold border border-border animate-bounce">
                {eggProgress}/5
              </span>
            )}
          </div>
        </div>

        {/* Sleepy Rosy Blush Cheeks */}
        <div className="absolute left-3 sm:left-4 top-24 sm:top-32 w-5 sm:w-6 h-2.5 sm:h-3 bg-[#f8b4c9]/60 rounded-full blur-[1px]" />
        <div className="absolute right-3 sm:right-4 top-24 sm:top-32 w-5 sm:w-6 h-2.5 sm:h-3 bg-[#f8b4c9]/60 rounded-full blur-[1px]" />

        {/* Big Soft Eye Sockets */}
        <div className="flex gap-6 sm:gap-9 items-center mt-1 sm:mt-2">
          {/* Left Eye Socket */}
          <div
            className={`w-9 h-10 sm:w-12 sm:h-14 bg-[#422d23] dark:bg-[#1a1412] rounded-[48%] flex items-center justify-center relative overflow-hidden border-2 border-[#5c4033] transition-all duration-150 ${
              isBlinking ? 'h-1 scale-y-10' : ''
            }`}
          >
            {/* Glowing Warm Amber Pinprick Pupil */}
            {!isBlinking && (
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] transition-transform duration-75"
                style={{
                  transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                }}
              />
            )}
          </div>

          {/* Right Eye Socket */}
          <div
            className={`w-9 h-10 sm:w-12 sm:h-14 bg-[#422d23] dark:bg-[#1a1412] rounded-[48%] flex items-center justify-center relative overflow-hidden border-2 border-[#5c4033] transition-all duration-150 ${
              isBlinking ? 'h-1 scale-y-10' : ''
            }`}
          >
            {/* Glowing Warm Amber Pinprick Pupil */}
            {!isBlinking && (
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b] transition-transform duration-75"
                style={{
                  transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                }}
              />
            )}
          </div>
        </div>

        {/* Heart-Shaped Tiny Skull Nose Cavity */}
        <div className="w-2 h-1.5 sm:w-2.5 sm:h-2 bg-[#5c4033] mt-1.5 sm:mt-2 rounded-t-sm transform rotate-180" />

        {/* Tiny Crooked Sweet Smile */}
        <div className="relative mt-1.5 sm:mt-2 flex items-center justify-center">
          <div className="w-5 sm:w-6 h-2 sm:h-2.5 border-b-[2px] sm:border-b-[2.5px] border-[#5c4033] rounded-full transform rotate-2" />
          {/* Tiny cute stitch notches */}
          <div className="absolute w-[2px] h-1.5 bg-[#5c4033] left-1 bottom-0.5" />
          <div className="absolute w-[2px] h-1.5 bg-[#5c4033] right-1 bottom-0.5" />
        </div>

        {/* Interactive Speech Hint with Lucide Music Icon */}
        <div className="absolute -bottom-3 bg-card text-[#5c4033] dark:text-foreground text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full border border-border shadow-sm flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
          <Music className="w-3 h-3 text-primary animate-pulse" />
          <span>tap me for lullaby</span>
        </div>
      </div>
    </div>
  );
};
