import React, { useState } from 'react';
import { LullabyLab } from './LullabyLab';
import { NightlightCollection } from './NightlightCollection';
import { DreamDeliveryRoutes } from './DreamDeliveryRoutes';
import { NurseryToybox } from './NurseryToybox';
import { Sparkles, Music, Lamp, Compass, ToyBrick, Layers } from 'lucide-react';
import { audio } from '@/utils/audio';

export const ProjectsShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'audio' | 'lighting' | 'flight' | 'toy'>('all');

  const filters = [
    { id: 'all', label: 'All Inventions', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'audio', label: 'Lullaby Lab', icon: <Music className="w-3.5 h-3.5" /> },
    { id: 'lighting', label: 'Nightlights', icon: <Lamp className="w-3.5 h-3.5" /> },
    { id: 'flight', label: 'Delivery Map', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'toy', label: 'Toybox & Growth', icon: <ToyBrick className="w-3.5 h-3.5" /> },
  ];

  const handleFilter = (id: typeof filter) => {
    audio.playClick();
    setFilter(id);
  };

  return (
    <section id="showcase-projects" className="py-8 sm:py-12 border-t-2 border-border/40 w-full min-w-0">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/40 text-foreground text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5 text-secondary" />
          <span>Module 02 • Pip's Invention Workshop</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-serif-header text-foreground">
          Pip’s Dream Laboratory
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
          Pip's hands-on bedtime inventions. Play the interactive Web Audio Lullaby Synthesizer keyboard, switch 5-spectrum bedroom lanterns, track nocturnal delivery flight routes, and inspect the nursery growth toybox.
        </p>

        {/* Filter Pills - Responsive & touch-friendly */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5 max-w-full">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => handleFilter(f.id as typeof filter)}
              className={`min-h-[38px] px-3 py-1.5 rounded-full text-xs font-semibold transition-all touch-manipulation flex items-center gap-1.5 ${
                filter === f.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="shrink-0">{f.icon}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 w-full min-w-0">
        {(filter === 'all' || filter === 'audio') && (
          <div className="w-full min-w-0">
            <LullabyLab />
          </div>
        )}
        {(filter === 'all' || filter === 'lighting') && (
          <div className="w-full min-w-0">
            <NightlightCollection />
          </div>
        )}
        {(filter === 'all' || filter === 'flight') && (
          <div className="w-full min-w-0">
            <DreamDeliveryRoutes />
          </div>
        )}
        {(filter === 'all' || filter === 'toy') && (
          <div className="w-full min-w-0">
            <NurseryToybox />
          </div>
        )}
      </div>
    </section>
  );
};
