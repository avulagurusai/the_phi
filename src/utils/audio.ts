// Web Audio API Synthesizer for Pip's Lullaby & Soundscape

class AudioManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private listeners: ((muted: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pip_sound_muted');
      this.isMuted = saved === 'true';
    }
  }

  public subscribe(fn: (muted: boolean) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isMuted));
    if (typeof window !== 'undefined') {
      localStorage.setItem('pip_sound_muted', String(this.isMuted));
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.notify();
    if (!this.isMuted) {
      this.playChime(659.25); // E5 unmuted chime
    }
    return this.isMuted;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    this.notify();
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Soft wooden / bell music box chime
  public playChime(freq: number = 523.25, type: OscillatorType = 'sine', duration: number = 0.35) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Bell envelope: instant soft attack, gentle exponential decay
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration + 0.05);
    } catch {
      // AudioContext policy catch
    }
  }

  // Tactile button click sound
  public playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      // AudioContext policy catch
    }
  }

  // Dream lullaby chord
  public playLullabyArpeggio() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((f, i) => {
      setTimeout(() => this.playChime(f, 'sine', 0.45), i * 110);
    });
  }

  // Secret Easter Egg celebration fanfare
  public playFanfare() {
    if (this.isMuted) return;
    const chords = [
      { f: 523.25, d: 150 },
      { f: 659.25, d: 150 },
      { f: 783.99, d: 150 },
      { f: 1046.50, d: 300 },
      { f: 1318.51, d: 450 },
    ];
    let delay = 0;
    chords.forEach(c => {
      setTimeout(() => {
        this.playChime(c.f, 'triangle', c.d / 1000);
      }, delay);
      delay += c.d * 0.85;
    });
  }

  // Pentatonic scale for Lullaby Lab notes
  public playPentatonic(index: number) {
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C, D, E, G, A, C, D, E
    const freq = scale[Math.min(Math.max(0, index), scale.length - 1)];
    this.playChime(freq, 'sine', 0.4);
  }
}

export const audio = new AudioManager();
