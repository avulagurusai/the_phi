import React, { useState } from 'react';
import { LullabyLab } from '@/components/projects/LullabyLab';
import { DreamDeliveryRoutes } from '@/components/projects/DreamDeliveryRoutes';
import { FlashlightMaskCanvas } from '@/components/workshop/FlashlightMaskCanvas';
import { CatchDreamsMiniGame } from '@/components/workshop/CatchDreamsMiniGame';
import PageMeta from '@/components/common/PageMeta';
import {
  Wrench,
  Music,
  Flashlight,
  Compass,
  Sparkles,
  Gamepad2,
} from 'lucide-react';
import { audio } from '@/utils/audio';

export default function WorkshopPage() {
  const [activeTab, setActiveTab] = useState<'lullaby' | 'flashlight' | 'delivery' | 'game'>('lullaby');

  const tabs = [
    { id: 'lullaby', label: 'Lullaby Lab Synth', icon: <Music className="w-3.5 h-3.5" /> },
    { id: 'flashlight', label: 'Flashlight Mask', icon: <Flashlight className="w-3.5 h-3.5" /> },
    { id: 'delivery', label: 'Dream Delivery Map', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'game', label: 'Catch Dreams Game', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0">
      <PageMeta
        title="Invention Workshop • Lullaby Synth & Flashlight Mask | Pip's Dream Atelier"
        description="Tactile bedtime tools in Pip's workshop: Web Audio synthesizer with real melodies, flashlight nightlight mask revealing hidden layers, animated flight routes, and mini-game."
      />

      {/* Page Header */}
      <div className="flex flex-col items-center text-center px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/30 text-foreground text-xs font-semibold mb-2">
          <Wrench className="w-3.5 h-3.5" />
          <span>Tier 2: Memorable Standout • Tactile Workshop</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-header text-foreground">
          Pip’s Invention Workshop
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
          Tactile instruments and bedtime toys engineered by Pip. Compose custom multi-tone lullabies, illuminate dark nocturnal layers with the flashlight mask, and dispatch couriers.
        </p>
      </div>

      {/* Workshop Navigation Tab Selector */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-muted/60 border-2 border-border gap-1 overflow-x-auto max-w-full no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audio.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`min-h-[40px] px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap touch-manipulation ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="w-full">
        {activeTab === 'lullaby' && (
          <div className="space-y-4">
            <LullabyLab />
          </div>
        )}

        {activeTab === 'flashlight' && (
          <div className="space-y-4">
            <FlashlightMaskCanvas />
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-4">
            <DreamDeliveryRoutes />
          </div>
        )}

        {activeTab === 'game' && (
          <div className="space-y-4">
            <CatchDreamsMiniGame />
          </div>
        )}
      </div>
    </div>
  );
}
