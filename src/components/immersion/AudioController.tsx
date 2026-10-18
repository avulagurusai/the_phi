import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audio } from '@/utils/audio';

export const AudioController: React.FC = () => {
  const [isMuted, setIsMuted] = useState(audio.isMuted);

  useEffect(() => {
    return audio.subscribe(muted => {
      setIsMuted(muted);
    });
  }, []);

  const handleToggle = () => {
    audio.toggleMute();
  };

  const handlePlaySample = (e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playLullabyArpeggio();
  };

  return (
    <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm border-2 border-border rounded-full p-0.5 sm:p-1 shadow-sm">
      <button
        onClick={handleToggle}
        type="button"
        className={`min-h-[36px] min-w-[36px] sm:min-w-0 flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all touch-manipulation ${
          isMuted
            ? 'bg-muted text-muted-foreground hover:bg-muted/80'
            : 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm'
        }`}
        aria-label={isMuted ? 'Unmute nursery sounds' : 'Mute nursery sounds'}
        title={isMuted ? 'Click to enable soothing chimes' : 'Click to mute all sounds'}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5 shrink-0" /> : <Volume2 className="w-3.5 h-3.5 shrink-0" />}
        <span className="hidden sm:inline">{isMuted ? 'Sound Off' : 'Sound On'}</span>
      </button>

      {!isMuted && (
        <button
          onClick={handlePlaySample}
          type="button"
          className="min-h-[36px] min-w-[36px] p-1.5 rounded-full text-foreground/80 hover:text-primary hover:bg-muted active:scale-95 transition-all touch-manipulation flex items-center justify-center"
          title="Play lullaby chord sample"
          aria-label="Play lullaby chord"
        >
          <Music className="w-3.5 h-3.5 text-primary animate-pulse" />
        </button>
      )}
    </div>
  );
};
