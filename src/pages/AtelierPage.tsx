import React from 'react';
import { WorldAtelierSection } from '@/components/atelier/WorldAtelierSection';
import PageMeta from '@/components/common/PageMeta';
import { Compass, Sparkles, Box, ShieldCheck } from 'lucide-react';

export default function AtelierPage() {
  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0">
      <PageMeta
        title="AI Dream World Builder • World Atelier | Pip's Dream Atelier"
        description="Weave custom nocturnal dreamscapes with Pip's AI Dreamcraft Engine. Procedural starlight synthesis, interactive SVG atlas, waypoint lore, Ask Pip chat, and JSON export."
      />

      {/* Page Header */}
      <div className="flex flex-col items-center text-center px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/30 text-foreground text-xs font-semibold mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Real AI Dream World Builder • World Atelier</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-header text-foreground">
          Pip’s Dream World Atelier
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
          The official nursery loom where bedtime worlds are formed. Enter a seed prompt or spin the surprise compass to generate interactive waypoints, sensory lighting, and exportable dream archives.
        </p>
      </div>

      {/* World Atelier Full Console */}
      <WorldAtelierSection />
    </div>
  );
}
