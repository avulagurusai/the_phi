import React from 'react';
import { StorybookReader } from '@/components/storybook/StorybookReader';
import PageMeta from '@/components/common/PageMeta';
import { BookOpen, Sparkles, Heart, Moon } from 'lucide-react';

export default function StorybookPage() {
  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0">
      <PageMeta
        title="Interactive Storybook • The Bedtime Chronicles | Pip's Dream Atelier"
        description="Flippable illustrated storybook of Pip the Skull Baby and the Midnight Nursery. Flip through chapters with keyboard arrows or swipe gestures."
      />

      {/* Page Header */}
      <div className="flex flex-col items-center text-center px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/30 text-foreground text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Tier 2: Memorable Standout • Interactive Storybook</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-header text-foreground">
          The Bedtime Chronicles
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
          The illustrated origin story of Pip, The Skull Baby at the Midnight Nursery. Turn pages with realistic animations, sound effects, and keyboard navigation.
        </p>
      </div>

      {/* Storybook Reader Component */}
      <StorybookReader />
    </div>
  );
}
