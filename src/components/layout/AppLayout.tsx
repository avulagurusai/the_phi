import React from 'react';
import { AppNavbar } from './AppNavbar';
import { SparkleTrail } from '@/components/immersion/SparkleTrail';
import { DreamMasterModal } from '@/components/easteregg/DreamMasterModal';
import { AIDreamSpecialistWidget } from '@/components/specialist/AIDreamSpecialistWidget';
import { useMood } from '@/context/MoodContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sparklesEnabled, isModalOpen, setIsModalOpen } = useMood();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative selection:bg-secondary/30 selection:text-foreground overflow-x-hidden w-full flex flex-col">
      {/* Sparkle cursor trail effect */}
      <SparkleTrail enabled={sparklesEnabled} />

      {/* Modal for Easter Egg */}
      <DreamMasterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Global Header & Navigation */}
      <AppNavbar />

      {/* Page Content Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {children}
      </main>

      {/* Persistent Floating AI Dream Specialist Call Widget */}
      <AIDreamSpecialistWidget />

      {/* Global Footer */}
      <footer className="mt-12 sm:mt-16 border-t-2 border-border/60 bg-card py-8 sm:py-10 px-4 w-full min-w-0">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-6 w-full">
          {/* Authentic 88x31 Vintage Web Badges */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 max-w-full">
            <div className="w-[88px] h-[31px] bg-[#222] border-2 border-[#666] text-[8px] font-mono font-bold flex flex-col justify-center items-center text-white select-none shadow-[2px_2px_0_0_#444] mx-auto">
              <span className="text-amber-400">MADE FOR</span>
              <span className="text-pink-400">haX.baby</span>
            </div>

            <div className="w-[88px] h-[31px] bg-[#1a365d] border-2 border-[#2b6cb0] text-[8px] font-mono font-bold flex flex-col justify-center items-center text-white select-none shadow-[2px_2px_0_0_#2b6cb0] mx-auto">
              <span className="text-cyan-300">WORLD</span>
              <span>ATELIER AI</span>
            </div>

            <div className="w-[88px] h-[31px] bg-[#5c4033] border-2 border-[#8b654f] text-[8px] font-mono font-bold flex flex-col justify-center items-center text-white select-none shadow-[2px_2px_0_0_#5c4033] mx-auto">
              <span className="text-amber-300">TRACK 1</span>
              <span>PIP CANON</span>
            </div>

            <div className="w-[88px] h-[31px] bg-[#3b1227] border-2 border-[#831843] text-[8px] font-mono font-bold flex flex-col justify-center items-center text-white select-none shadow-[2px_2px_0_0_#831843] mx-auto">
              <span className="text-pink-300">100% COZY</span>
              <span>NO NIGHTMARES</span>
            </div>

            <div className="col-span-2 sm:col-span-1 w-[88px] h-[31px] bg-[#14532d] border-2 border-[#16a34a] text-[8px] font-mono font-bold flex flex-col justify-center items-center text-white select-none shadow-[2px_2px_0_0_#14532d] mx-auto">
              <span className="text-emerald-300">WEBGL 3D</span>
              <span>THREE.JS MODEL</span>
            </div>
          </div>

          {/* Webring Navigator */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-muted/60 border border-border inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-muted-foreground font-mono max-w-full">
            <span className="cursor-pointer hover:text-foreground">[← Prev Colony]</span>
            <span className="text-foreground font-bold">Midnight Nursery Webring</span>
            <span className="cursor-pointer hover:text-foreground">[Next Colony →]</span>
          </div>

          <p className="text-xs text-muted-foreground max-w-md px-2 leading-relaxed">
            Pip's Dream Atelier: The Midnight Nursery & Dream World Engine. Multi-page experience with real WebGL 3D, Web Audio synthesis, interactive storybook, and persistent guestbook.
          </p>

          <div className="text-[11px] text-muted-foreground/70 font-mono">
            © 2026 Midnight Nursery • Shift 3 • Tier 1 + Tier 2 + Tier 3 Complete.
          </div>
        </div>
      </footer>
    </div>
  );
};
