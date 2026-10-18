import React from 'react';
import { Award, X, Sparkles, CheckCircle2, Star, Download, Heart } from 'lucide-react';
import { audio } from '@/utils/audio';

interface DreamMasterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DreamMasterModal: React.FC<DreamMasterModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#fffdfa] dark:bg-[#1a1e2b] border-[3.5px] border-[#5c4033] dark:border-[#a34063] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0_0_#5c4033] dark:shadow-[8px_8px_0_0_#a34063] text-foreground max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-title"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full border-2 border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close certificate modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Stamp Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 border-2 border-border flex items-center justify-center shadow-md mb-3 rotate-3 animate-bounce">
            <Award className="w-9 h-9 text-stone-900" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secret Hackathon Quest Unlocked</span>
          </div>

          <h2
            id="certificate-title"
            className="text-2xl sm:text-3xl font-bold font-serif-header text-foreground"
          >
            Dream Master Certificate
          </h2>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Issued by Pip • Midnight Nursery Shift 3
          </p>
        </div>

        {/* Certificate Paper Body */}
        <div className="mt-5 p-5 rounded-2xl bg-[#fff8f1] dark:bg-[#141724] border-2 border-dashed border-[#5c4033]/60 dark:border-primary/60 text-center space-y-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            This is to certify that
          </p>

          <div className="text-lg sm:text-xl font-bold font-serif text-primary underline decoration-secondary decoration-wavy">
            Curious Midnight Traveler
          </div>

          <p className="text-xs text-foreground/90 font-serif leading-relaxed">
            Has discovered Pip’s secret lucky nightcap star and demonstrated exceptional curiosity, gentleness, and an appreciation for cozy early-web whimsy.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/40 text-left text-[11px]">
            <div>
              <span className="text-muted-foreground block text-[10px]">Rank:</span>
              <strong className="text-foreground">Honorary Dream Weaver</strong>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px]">Special Perk:</span>
              <strong className="text-foreground">Guaranteed Sweet Dreams</strong>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              audio.playClick();
              audio.playLullabyArpeggio();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground border-2 border-border shadow-[2px_2px_0_0_hsl(var(--border))] hover:opacity-95 transition-opacity"
          >
            Keep Dreaming (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
