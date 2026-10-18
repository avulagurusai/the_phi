import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Heart, Star, Moon, Cloud, Sparkles, Feather, Music, Compass, AlertCircle, UserCheck } from 'lucide-react';
import { audio } from '@/utils/audio';
import { supabase } from '@/db/supabase';

interface GuestNote {
  id: string;
  name: string;
  stampId: string;
  message: string;
  timeAgo: string;
  likes: number;
}

interface Stamp {
  id: string;
  label: string;
  icon: React.ReactNode;
  bg: string;
}

export const GuestbookWall: React.FC = () => {
  const STAMPS: Record<string, Stamp> = {
    star: {
      id: 'star',
      label: 'Lucky Star',
      icon: <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />,
      bg: 'bg-amber-400/15 border-amber-400/40',
    },
    moon: {
      id: 'moon',
      label: 'Crescent Moon',
      icon: <Moon className="w-3.5 h-3.5 text-sky-500 fill-sky-400/40" />,
      bg: 'bg-sky-400/15 border-sky-400/40',
    },
    heart: {
      id: 'heart',
      label: 'Cozy Heart',
      icon: <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400/40" />,
      bg: 'bg-pink-400/15 border-pink-400/40',
    },
    cloud: {
      id: 'cloud',
      label: 'Fluffy Cloud',
      icon: <Cloud className="w-3.5 h-3.5 text-blue-500 fill-blue-400/40" />,
      bg: 'bg-blue-400/15 border-blue-400/40',
    },
    sparkles: {
      id: 'sparkles',
      label: 'Stardust',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-500 fill-purple-400/40" />,
      bg: 'bg-purple-400/15 border-purple-400/40',
    },
    feather: {
      id: 'feather',
      label: 'Soft Feather',
      icon: <Feather className="w-3.5 h-3.5 text-emerald-500" />,
      bg: 'bg-emerald-400/15 border-emerald-400/40',
    },
    music: {
      id: 'music',
      label: 'Chime Note',
      icon: <Music className="w-3.5 h-3.5 text-rose-500" />,
      bg: 'bg-rose-400/15 border-rose-400/40',
    },
    compass: {
      id: 'compass',
      label: 'Dream Route',
      icon: <Compass className="w-3.5 h-3.5 text-amber-600" />,
      bg: 'bg-amber-600/15 border-amber-600/40',
    },
  };

  const defaultNotes: GuestNote[] = [
    {
      id: '1',
      name: 'Barnaby the Ghost',
      stampId: 'music',
      message: 'Pip, your music box reached my teacup all the way in Hazelwood! Fell asleep in three chimes. Keep shining!',
      timeAgo: '12m ago',
      likes: 14,
    },
    {
      id: '2',
      name: 'Mama Robin',
      stampId: 'moon',
      message: 'The cyan nightlight is the perfect hue for the nestlings. No monsters in the branches tonight.',
      timeAgo: '45m ago',
      likes: 9,
    },
    {
      id: '3',
      name: 'Night Watchman Finch',
      stampId: 'compass',
      message: 'Saw Pip flying past the bell tower with his star nightcap. Best dream delivery in town!',
      timeAgo: '2h ago',
      likes: 21,
    },
    {
      id: '4',
      name: 'Cloud Weaver Cici',
      stampId: 'cloud',
      message: 'Left extra marshmallow fluff on the east chimney route for your mid-shift snack!',
      timeAgo: '4h ago',
      likes: 18,
    },
  ];

  const [notes, setNotes] = useState<GuestNote[]>(defaultNotes);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedStamp, setSelectedStamp] = useState('star');
  const [error, setError] = useState('');
  const [visitorGreeting, setVisitorGreeting] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Returning visitor recognition via localStorage
  useEffect(() => {
    try {
      const visitorName = localStorage.getItem('pip_visitor_name');
      const visitCount = Number(localStorage.getItem('pip_visit_count') || '1');
      const newCount = visitCount + 1;
      localStorage.setItem('pip_visit_count', newCount.toString());

      if (visitorName) {
        setName(visitorName);
        setVisitorGreeting(
          `Welcome back, ${visitorName}! Pip remembers you (Visit #${newCount}). The stars are aligned for you tonight.`
        );
      } else {
        setVisitorGreeting(
          `Welcome to the Midnight Nursery! Sign the guestbook below so Pip can remember your visits.`
        );
      }
    } catch {}
  }, []);

  // Fetch persistent notes from Supabase Postgres
  useEffect(() => {
    async function loadBackendNotes() {
      try {
        const { data, error } = await supabase
          .from('guestbook_entries')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (!error && data && data.length > 0) {
          const mapped: GuestNote[] = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            stampId: d.stamp_id || 'star',
            message: d.message,
            timeAgo: 'Live Backend',
            likes: d.likes || 1,
          }));
          setNotes([...mapped, ...defaultNotes]);
        }
      } catch (err) {
        console.warn('Backend load failed, utilizing cached offline notes:', err);
      }
    }
    loadBackendNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please tell Pip your name or nickname!');
      return;
    }
    if (!message.trim()) {
      setError('Please write a bedtime note or dream wish!');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const cleanName = name.trim().slice(0, 30);
    const cleanMsg = message.trim().slice(0, 200);

    // Save visitor memory
    try {
      localStorage.setItem('pip_visitor_name', cleanName);
      setVisitorGreeting(`Welcome back, ${cleanName}! Pip saved your wish in the starlight archives.`);
    } catch {}

    const newNote: GuestNote = {
      id: Date.now().toString(),
      name: cleanName,
      stampId: selectedStamp,
      message: cleanMsg,
      timeAgo: 'Just now',
      likes: 1,
    };

    setNotes((prev) => [newNote, ...prev]);
    setMessage('');
    audio.playFanfare();

    // Persist to Supabase Database
    try {
      await supabase.from('guestbook_entries').insert([
        {
          name: cleanName,
          message: cleanMsg,
          stamp_id: selectedStamp,
        },
      ]);
    } catch (err) {
      console.warn('Backend insert notice:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (id: string) => {
    audio.playClick();
    audio.playChime(659.25, 'triangle', 0.2);
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n))
    );
  };

  return (
    <section className="space-y-6 w-full min-w-0">
      {/* Returning Visitor Recognition Banner */}
      {visitorGreeting && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-secondary/20 border-2 border-secondary/50 text-foreground flex items-center gap-3 text-xs shadow-xs animate-in fade-in">
          <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
            <UserCheck className="w-4 h-4 text-secondary-foreground" />
          </div>
          <div className="min-w-0">
            <span className="font-bold block text-foreground">Visitor Memory Active</span>
            <span className="text-muted-foreground">{visitorGreeting}</span>
          </div>
        </div>
      )}

      {/* Guestbook Form & Live Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full min-w-0">
        {/* Left Column: Bedtime Note Form */}
        <div className="lg:col-span-5 w-full min-w-0">
          <div className="p-5 sm:p-6 rounded-3xl bg-card border-[3px] border-border shadow-[4px_4px_0_0_hsl(var(--border))] space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="text-base sm:text-lg font-bold font-serif-header text-foreground">
                Leave a Bedtime Note
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Your Name or Sleeping Colony
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Stargazer Ellie, Velvet Dormouse..."
                  className="w-full px-3 py-2 text-xs rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Pick a Nursery Wax Stamp
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {Object.values(STAMPS).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        audio.playClick();
                        setSelectedStamp(s.id);
                      }}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedStamp === s.id
                          ? 'border-primary bg-primary/10 shadow-sm scale-105'
                          : 'border-border/60 bg-muted/40 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span className="text-[9px] font-bold truncate max-w-full">
                        {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Your Wish or Lullaby Thought
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  maxLength={200}
                  placeholder="Write a sweet goodnight wish, dream idea, or note for Pip..."
                  className="w-full px-3 py-2 text-xs rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
                />
                <div className="text-right text-[10px] text-muted-foreground font-mono mt-0.5">
                  {message.length} / 200
                </div>
              </div>

              {error && (
                <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/40 text-destructive text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[44px] px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-[2px_2px_0_0_hsl(var(--border))] hover:opacity-95 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all touch-manipulation disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Bedtime Note</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Community Message Board */}
        <div className="lg:col-span-7 w-full min-w-0 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Starlight Registry Feed</span>
            </h4>
            <span className="text-[11px] text-muted-foreground font-mono">
              {notes.length} Dream Notes Recorded
            </span>
          </div>

          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {notes.map((note) => {
              const stamp = STAMPS[note.stampId] || STAMPS.star;
              return (
                <div
                  key={note.id}
                  className="p-4 rounded-2xl bg-card border-2 border-border shadow-[2px_2px_0_0_hsl(var(--border))] space-y-2 hover:border-primary/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`p-1.5 rounded-lg border ${stamp.bg} shrink-0`}>
                        {stamp.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-xs text-foreground block truncate">
                          {note.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {note.timeAgo}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLike(note.id)}
                      className="px-2.5 py-1 rounded-full bg-muted/60 hover:bg-pink-500/10 hover:text-pink-500 text-muted-foreground text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Heart className="w-3 h-3 fill-current text-pink-400" />
                      <span>{note.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs text-foreground/90 leading-relaxed pl-8">
                    {note.message}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
