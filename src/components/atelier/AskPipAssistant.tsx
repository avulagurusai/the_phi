import React, { useState, useRef, useEffect } from 'react';
import type { DreamWorld, ChatMessage } from '@/types/dreamWorld';
import { askPipAssistantService } from '@/services/dreamWorldService';
import { audio } from '@/utils/audio';
import {
  MessageSquare,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  Lightbulb,
} from 'lucide-react';

interface AskPipAssistantProps {
  currentWorld: DreamWorld;
}

export const AskPipAssistant: React.FC<AskPipAssistantProps> = ({
  currentWorld,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize or reset chat when active dream world changes
  useEffect(() => {
    setMessages([
      {
        id: 'initial-greeting',
        sender: 'pip',
        text: `Greetings, bedtime traveler! I'm Pip, your Junior Dream Engineer. We are currently inside **${currentWorld.title}**. What would you like to explore or imagine together?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'Who lives in this world?',
          'What is the secret discovery?',
          'Suggest a new dream idea',
        ],
      },
    ]);
  }, [currentWorld.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    audio.playClick();
    audio.playChime(659.25, 'triangle', 0.2);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askPipAssistantService(currentWorld, userText, newHistory);
      audio.playChime(880.00, 'sine', 0.35); // A5 chime on arrival
      setMessages(prev => [...prev, response]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'pip',
          text: 'Oops! My starlight transceiver experienced a brief lullaby static. Please try asking again!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    audio.playClick();
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'pip',
        text: `Log cleared! We're back at the start of **${currentWorld.title}**. Ask me anything about our inhabitants or waypoints.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'What lives here?',
          'Tell me a secret',
          'Expand the backstory',
        ],
      },
    ]);
  };

  return (
    <div className="bg-card border-[3.5px] border-border rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0_0_hsl(var(--border))] flex flex-col justify-between h-full w-full min-w-0">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-border/40 gap-2 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#fdfbf7] dark:bg-[#e8e4dc] border-2 border-[#5c4033] p-1 flex items-center justify-center shadow-sm shrink-0">
              <img
                src="https://hax.baby/baby/assets/pip_avatar_cloud.png"
                alt="Pip Assistant"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold font-serif-header text-foreground flex items-center gap-1.5 truncate">
                <span>Ask Pip Dream AI</span>
                <span className="text-[9px] font-sans px-1.5 py-0.2 rounded-full bg-primary/10 text-primary font-bold">
                  Shift 3
                </span>
              </h3>
              <p className="text-[10px] text-muted-foreground truncate">
                Context: {currentWorld.title}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-xl border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all touch-manipulation min-h-[36px] flex items-center gap-1 text-[11px] font-bold px-2.5 shrink-0"
            title="Reset Chat Session"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Message Log */}
        <div
          ref={scrollRef}
          className="space-y-3.5 max-h-[380px] min-h-[260px] overflow-y-auto pr-1 text-xs mb-4"
        >
          {messages.map(m => {
            const isPip = m.sender === 'pip';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isPip ? 'items-start' : 'items-end flex-row-reverse'}`}
              >
                {isPip ? (
                  <div className="w-7 h-7 rounded-full bg-[#5c4033] text-amber-300 border border-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    P
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground border border-border flex items-center justify-center text-[10px] font-bold shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 shadow-sm leading-relaxed ${
                    isPip
                      ? 'bg-muted/60 border border-border text-foreground'
                      : 'bg-primary text-primary-foreground border border-primary/80'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span
                    className={`block text-[9px] font-mono mt-1 ${
                      isPip ? 'text-muted-foreground' : 'text-primary-foreground/70'
                    }`}
                  >
                    {m.timestamp}
                  </span>

                  {/* Suggestion Follow-Up Chips */}
                  {isPip && m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-border/40">
                      {m.suggestedFollowUps.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="px-2 py-1 rounded-lg bg-card border border-border hover:border-primary text-[10px] font-semibold text-foreground hover:text-primary transition-all text-left flex items-center gap-1 shadow-xs touch-manipulation"
                        >
                          <Lightbulb className="w-2.5 h-2.5 text-secondary shrink-0" />
                          <span>{chip}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground italic pl-9">
              <Sparkles className="w-3.5 h-3.5 text-secondary animate-spin" />
              <span>Pip is consulting the Midnight Nursery dream chronicles...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex items-center gap-2 pt-2 border-t border-border/40"
      >
        <input
          type="text"
          maxLength={150}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Pip about this dream world..."
          disabled={isLoading}
          className="flex-1 px-3.5 py-2.5 text-base md:text-xs rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="min-h-[44px] min-w-[44px] px-3.5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold border-2 border-border shadow-[2px_2px_0_0_hsl(var(--border))] hover:opacity-95 active:scale-95 transition-all flex items-center justify-center touch-manipulation disabled:opacity-50 shrink-0"
          title="Send query to Pip"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
