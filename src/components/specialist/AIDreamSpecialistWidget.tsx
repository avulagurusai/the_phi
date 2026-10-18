import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneOff,
  PhoneCall,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  Moon,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  X,
  Activity,
} from 'lucide-react';
import { audio } from '@/utils/audio';
import { streamAICall } from '@/lib/aiService';

export const AIDreamSpecialistWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<
    { id: string; sender: 'user' | 'specialist'; text: string; timestamp: string }[]
  >([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [waveHeight, setWaveHeight] = useState([12, 18, 24, 16, 20, 14, 28, 22]);

  const timerRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Quick Consultative Prompts
  const quickChips = [
    'Analyze my weird dream 🌙',
    'I can’t sleep, what should I do? 💤',
    'Give me a nightmare defense formula 🛡️',
    'Prescribe a soothing dream recipe 🍵',
  ];

  // Call duration counter
  useEffect(() => {
    if (callState === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  // Audio waveform animation when AI is thinking or speaking
  useEffect(() => {
    if (callState !== 'connected') return;
    const interval = setInterval(() => {
      setWaveHeight((prev) =>
        prev.map(() => Math.floor(Math.random() * (isAiThinking ? 32 : 18) + 8))
      );
    }, 150);
    return () => clearInterval(interval);
  }, [callState, isAiThinking]);

  // Scroll to bottom of message list
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAiThinking]);

  // Web Speech Synthesis (Dr. Pip speaks aloud like a real phone call!)
  const speakVoice = (text: string) => {
    if (!isSpeakerOn || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean plain text
    const cleanText = text.replace(/[*_#`[\]()]/g, '').slice(0, 240);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    // Pick warm English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    ) || voices.find((v) => v.lang.startsWith('en'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Start the Call (Ringing -> Connected)
  const handleStartCall = () => {
    audio.playClick();
    setIsOpen(true);
    setCallState('calling');

    // Ringing sound simulation
    audio.playChime(440, 'sine', 0.4);
    setTimeout(() => audio.playChime(480, 'sine', 0.4), 200);

    // Realistic pick up after 1.6s
    setTimeout(() => {
      setCallState('connected');
      audio.playChime(587.33, 'triangle', 0.3);
      audio.playLullabyArpeggio();

      const greeting =
        "Hello! This is Dr. Pip, Chief Dream Specialist at Midnight Nursery Shift 3. You're connected to the secure Bedtime Hotline. How can I help your sleep or dream tonight?";

      setMessages([
        {
          id: 'welcome-msg',
          sender: 'specialist',
          text: greeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      speakVoice(greeting);
    }, 1600);
  };

  // End Call
  const handleEndCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    audio.playClick();
    audio.playChime(329.63, 'sine', 0.3);
    setCallState('ended');
    setTimeout(() => {
      setCallState('idle');
      setIsOpen(false);
    }, 1200);
  };

  // Send query to AI Dream Specialist
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isAiThinking) return;

    setInputText('');
    audio.playClick();

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user' as const,
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsAiThinking(true);

    try {
      const contents = [
        {
          role: 'user' as const,
          parts: [
            {
              text: `You are Dr. Pip, the expert AI Dream Specialist and Junior Dream Engineer from Midnight Nursery (haX.baby). You speak warmly, gently, and with compassionate bedtime whimsy like a friendly doctor on a late-night radio call. Keep responses to 2-3 cozy sentences so they sound natural when spoken over a phone call.
User question: "${query}"`,
            },
          ],
        },
      ];

      let fullAiReply = '';
      await streamAICall(contents, (chunk) => {
        fullAiReply += chunk;
      });

      const replyText =
        fullAiReply.trim() ||
        "I prescribe a cup of warm chamomile tea, three slow deep breaths, and a cozy visualization of floating on marshmallow clouds. Sleep peacefully, traveler!";

      const specialistMsg = {
        id: `spec-${Date.now()}`,
        sender: 'specialist' as const,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, specialistMsg]);
      speakVoice(replyText);
    } catch {
      // Friendly in-character fallback
      const fallback =
        "Dr. Pip here! My starlight transceiver had a gentle flutter, but my diagnosis is clear: wrap yourself in a warm blanket, count four shooting stars, and let your eyelids rest. You are completely safe tonight.";
      setMessages((prev) => [
        ...prev,
        {
          id: `spec-${Date.now()}`,
          sender: 'specialist',
          text: fallback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speakVoice(fallback);
    } finally {
      setIsAiThinking(false);
    }
  };

  // Voice speech-to-text (Web Speech Recognition)
  const toggleSpeechRecognition = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your question!');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsListening(true);
        audio.playChime(523.25, 'sine', 0.2);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      rec.onerror = () => {
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch {
      setIsListening(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Trigger Launcher */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            onClick={handleStartCall}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-primary text-primary-foreground border-2 border-primary-foreground/30 shadow-[3px_3px_0_0_#5c4033] hover:scale-105 active:scale-95 transition-all group touch-manipulation"
            aria-label="Call AI Dream Specialist"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
                <PhoneCall className="w-4 h-4 text-primary-foreground animate-bounce" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-card rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border border-card rounded-full" />
            </div>

            <div className="text-left">
              <span className="block text-xs font-bold leading-tight">Call AI Dream Specialist</span>
              <span className="block text-[10px] text-primary-foreground/80 font-mono">
                Dr. Pip • Live Consult
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Floating Call Window Dialog */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[380px] max-h-[88vh] bg-card border-[3px] border-border rounded-3xl shadow-[5px_5px_0_0_hsl(var(--border))] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header Bar */}
          <div className="bg-primary/95 text-primary-foreground px-4 py-3 flex items-center justify-between border-b-2 border-border/40">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-card/20 border border-white/30 flex items-center justify-center shrink-0">
                <Moon className="w-4 h-4 text-amber-300 fill-amber-300" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold truncate">Dr. Pip • AI Dream Specialist</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-primary-foreground/80 font-mono">
                  {callState === 'calling' && <span className="animate-pulse">Dialing Midnight Nursery...</span>}
                  {callState === 'connected' && (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Call • {formatTime(callDuration)}</span>
                    </span>
                  )}
                  {callState === 'ended' && <span>Call Disconnected</span>}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-card/20 transition-colors"
              aria-label="Close specialist window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Calling / Ringing State Screen */}
          {callState === 'calling' && (
            <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 my-auto">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-pulse">
                  <Phone className="w-8 h-8 text-primary animate-bounce" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping pointer-events-none" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Calling Dr. Pip...</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Connecting to Midnight Nursery hotline
                </p>
              </div>
              <button
                onClick={handleEndCall}
                className="px-4 py-2 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          )}

          {/* Connected Call Screen */}
          {callState === 'connected' && (
            <>
              {/* Audio Waveform HUD */}
              <div className="bg-muted/40 border-b border-border/40 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-secondary animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-muted-foreground">
                    VOICE CHANNEL ACTIVE
                  </span>
                </div>

                {/* Animated Waveform */}
                <div className="flex items-end gap-1 h-5">
                  {waveHeight.map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}px` }}
                      className="w-1 bg-secondary rounded-full transition-all duration-150"
                    />
                  ))}
                </div>

                {/* Speaker Mute/Unmute */}
                <button
                  onClick={() => {
                    audio.playClick();
                    setIsSpeakerOn(!isSpeakerOn);
                    if (isSpeakerOn && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    isSpeakerOn ? 'text-primary bg-primary/10' : 'text-muted-foreground bg-muted'
                  }`}
                  title={isSpeakerOn ? 'Speaker Voice On' : 'Speaker Voice Muted'}
                >
                  {isSpeakerOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Consultation Chat Feed */}
              <div
                ref={scrollRef}
                className="flex-1 p-3.5 space-y-3 overflow-y-auto max-h-[300px] text-xs"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                        m.sender === 'user'
                          ? 'bg-primary text-primary-foreground font-medium rounded-tr-sm shadow-sm'
                          : 'bg-muted/80 text-foreground border border-border/60 rounded-tl-sm'
                      }`}
                    >
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-0.5 px-1 font-mono">
                      {m.timestamp}
                    </span>
                  </div>
                ))}

                {isAiThinking && (
                  <div className="flex items-center gap-2 text-muted-foreground text-[11px] italic bg-muted/40 p-2 rounded-xl">
                    <Sparkles className="w-3.5 h-3.5 text-secondary animate-spin" />
                    <span>Dr. Pip is formulating dream advice...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Chips */}
              <div className="px-3 py-1.5 bg-muted/20 border-t border-border/30 overflow-x-auto flex gap-1.5 no-scrollbar">
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-card border border-border hover:border-primary text-foreground font-medium whitespace-nowrap shadow-xs hover:bg-muted/50 transition-all shrink-0"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* In-Call Controls & Input Bar */}
              <div className="p-3 bg-card border-t border-border/40 space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Speak or type to Dr. Pip..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[38px]"
                  />

                  {/* Mic Speech-to-Text Button */}
                  <button
                    type="button"
                    onClick={toggleSpeechRecognition}
                    className={`p-2 rounded-xl border-2 border-border text-xs transition-all ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                    title={isListening ? 'Listening... click to stop' : 'Click to talk (Speech-to-Text)'}
                  >
                    {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isAiThinking}
                    className="p-2 rounded-xl bg-primary text-primary-foreground font-bold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Call Footer Control Buttons */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>Encrypted Bedtime Channel</span>
                  </div>

                  <button
                    onClick={handleEndCall}
                    className="px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground text-[11px] font-bold flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 transition-all"
                  >
                    <PhoneOff className="w-3.5 h-3.5" />
                    <span>End Call</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Ended State */}
          {callState === 'ended' && (
            <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
              <div>
                <p className="text-sm font-bold text-foreground">Call Finished</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sweet dreams from Dr. Pip & Midnight Nursery!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
