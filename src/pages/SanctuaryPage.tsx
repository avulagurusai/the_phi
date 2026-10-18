import React from 'react';
import { PipThreeCanvas } from '@/components/character3d/PipThreeCanvas';
import PageMeta from '@/components/common/PageMeta';
import {
  Sparkles,
  Box,
  RotateCw,
  Eye,
  Moon,
  ShieldCheck,
  CheckCircle2,
  Award,
  Layers,
} from 'lucide-react';

export default function SanctuaryPage() {
  const specs = [
    { label: 'Cool Skull 💀 Eyes', val: 'Dynamic cursor-tracking glowing pupils & iris starlight' },
    { label: 'Eye Emission Colors', val: 'Starlight Amber, Celestial Cyan, Mystic Lavender, Ghost Emerald' },
    { label: 'Cranium Material', val: 'Porcelain Bone White (Roughness 0.28)' },
    { label: 'Nightcap Cloth', val: 'Star-Spun Flannel with Physics Tassel' },
    { label: 'Cloud Propulsion', val: 'Marshmallow Zephyr with 60fps Floating Bob' },
    { label: 'Rendering API', val: 'Three.js WebGL with ACES Filmic Tone Mapping' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0">
      <PageMeta
        title="3D Pip Sanctuary • Cool Skull Eyes Cursor Tracking | Pip's Dream Atelier"
        description="Interact with Pip, The Skull Baby in real-time 3D WebGL Three.js. Watch cool skull eyes follow your cursor, rotate 360 degrees, and trigger starlight bursts."
      />

      {/* Page Header */}
      <div className="flex flex-col items-center text-center px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-2">
          <Box className="w-3.5 h-3.5" />
          <span>Tier 3: Legendary Boss Level • 3D WebGL Starlight Sanctuary</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-header text-foreground flex items-center justify-center gap-2 flex-wrap">
          <span>Pip’s 3D Starlight Sanctuary</span>
          <span className="text-2xl sm:text-4xl">💀✨</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
          Full interactive 3D WebGL model of Pip, The Skull Baby. Watch his cool glowing skull eyes and head follow your cursor across the screen, drag to rotate 360°, and customize his eye glow hues.
        </p>
      </div>

      {/* 3D Canvas Stage */}
      <div className="w-full">
        <PipThreeCanvas />
      </div>

      {/* Technical & Character Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Spec 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border-2 border-border shadow-[3px_3px_0_0_hsl(var(--border))]">
          <h3 className="text-sm font-bold font-serif-header text-foreground flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-amber-500" />
            <span>Cool Skull 💀 Eyes Tracking</span>
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Pip’s glowing skull pupils glide inside deep socket cavities in real-time, tracking your cursor with smooth interpolation and natural pupil dilation.
          </p>
        </div>

        {/* Spec 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border-2 border-border shadow-[3px_3px_0_0_hsl(var(--border))]">
          <h3 className="text-sm font-bold font-serif-header text-foreground flex items-center gap-2 mb-2">
            <Moon className="w-4 h-4 text-primary" />
            <span>360° Drag & Head Tilt</span>
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Drag anywhere to rotate Pip 360 degrees. Pip’s head gently tilts toward your pointer with soft physics damping while resting on a marshmallow cloud.
          </p>
        </div>

        {/* Spec 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-card border-2 border-border shadow-[3px_3px_0_0_hsl(var(--border))]">
          <h3 className="text-sm font-bold font-serif-header text-foreground flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Multi-Spectrum Glow Customizer</span>
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Switch between Starlight Amber, Celestial Cyan, Mystic Lavender, and Ghost Emerald with dynamic intensity modes (Cozy, Radiant, Supernova).
          </p>
        </div>
      </div>
    </div>
  );
}
