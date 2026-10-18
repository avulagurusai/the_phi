import React from 'react';
import { GuestbookWall } from '@/components/guestbook/GuestbookWall';
import PageMeta from '@/components/common/PageMeta';
import { MessageSquare, Sparkles, Heart, ShieldCheck, Moon } from 'lucide-react';

export default function GuestbookPage() {
  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0">
      <PageMeta
        title="Live Dream Guestbook • Midnight Nursery Registry | Pip's Dream Atelier"
        description="Live community guestbook powered by Supabase. Leave a bedtime wish for Pip the Skull Baby, receive returning visitor greetings, and browse real-time dream messages."
      />

      {/* Page Header */}
      <div className="flex flex-col items-center text-center px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/30 text-foreground text-xs font-semibold mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Tier 3: Legendary • Live Backend & Visitor Memory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif-header text-foreground">
          Live Midnight Guestbook
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
          Leave your bedtime wishes for Pip and the Midnight Nursery team. Stored persistently in our backend with returning-visitor recognition.
        </p>
      </div>

      {/* Guestbook Wall Component */}
      <GuestbookWall />
    </div>
  );
}
