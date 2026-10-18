import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Award, Volume2, Sparkles, Moon, Heart } from 'lucide-react';
import { audio } from '@/utils/audio';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'dream' | 'star' | 'nightmare';
  radius: number;
}

export const CatchDreamsMiniGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const basketX = useRef(200);
  const itemsRef = useRef<FallingItem[]>([]);
  const gameLoopRef = useRef<number | null>(null);
  const nextItemId = useRef(1);

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pip_dream_catch_highscore');
      if (saved) setHighScore(Number(saved));
    } catch {}
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleGameOver();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, gameOver]);

  const handleGameOver = () => {
    setIsPlaying(false);
    setGameOver(true);
    audio.playFanfare();
    setScore((currentScore) => {
      setHighScore((prevHigh) => {
        const nextHigh = Math.max(prevHigh, currentScore);
        try {
          localStorage.setItem('pip_dream_catch_highscore', nextHigh.toString());
        } catch {}
        return nextHigh;
      });
      return currentScore;
    });
  };

  const handleStartGame = () => {
    audio.playClick();
    audio.playChime(523.25, 'triangle', 0.2);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setIsPlaying(true);
    itemsRef.current = [];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight || 380;
    };
    resize();
    window.addEventListener('resize', resize);

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      basketX.current = Math.max(40, Math.min(canvas.width - 40, clientX - rect.left));
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('touchmove', onPointerMove, { passive: true });

    let spawnTimer = 0;

    const loop = () => {
      gameLoopRef.current = requestAnimationFrame(loop);
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Night Sky Background with Stardust
      ctx.fillStyle = '#1a1423';
      ctx.fillRect(0, 0, w, h);

      if (isPlaying) {
        // Spawn items
        spawnTimer++;
        if (spawnTimer > 35) {
          spawnTimer = 0;
          const rand = Math.random();
          const type = rand > 0.35 ? 'dream' : rand > 0.15 ? 'star' : 'nightmare';
          itemsRef.current.push({
            id: nextItemId.current++,
            x: 30 + Math.random() * (w - 60),
            y: -20,
            speed: 2.2 + Math.random() * 2.5,
            type,
            radius: type === 'star' ? 14 : 18,
          });
        }

        // Update & Render items
        const basketY = h - 45;
        const basketW = 75;

        itemsRef.current.forEach((item, index) => {
          item.y += item.speed;

          // Check Catch Collision
          if (
            item.y + item.radius >= basketY &&
            item.y - item.radius <= basketY + 20 &&
            Math.abs(item.x - basketX.current) < basketW / 2
          ) {
            // Caught!
            if (item.type === 'dream') {
              audio.playChime(659.25, 'sine', 0.15);
              setScore((s) => s + 10);
            } else if (item.type === 'star') {
              audio.playChime(880, 'triangle', 0.2);
              setScore((s) => s + 25);
            } else {
              audio.playChime(220, 'sawtooth', 0.2);
              setScore((s) => Math.max(0, s - 15));
            }
            itemsRef.current.splice(index, 1);
            return;
          }

          // Off screen
          if (item.y > h + 30) {
            itemsRef.current.splice(index, 1);
            return;
          }

          // Draw item
          ctx.save();
          if (item.type === 'dream') {
            ctx.fillStyle = 'rgba(244, 220, 228, 0.9)';
            ctx.strokeStyle = '#a34063';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#5c4033';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('💤', item.x, item.y + 3);
          } else if (item.type === 'star') {
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('⭐', item.x, item.y + 4);
          } else {
            ctx.fillStyle = '#4a044e';
            ctx.beginPath();
            ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('👾', item.x, item.y + 3);
          }
          ctx.restore();
        });

        // Draw Player's Cloud Basket
        const bx = basketX.current;
        ctx.save();
        ctx.fillStyle = '#fff8f1';
        ctx.strokeStyle = '#5c4033';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(bx - basketW / 2, basketY, basketW, 25, 12);
        ctx.fill();
        ctx.stroke();

        // Pip's little face on the basket
        ctx.fillStyle = '#5c4033';
        ctx.font = '12px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🧺 Pip’s Cradle', bx, basketY + 16);
        ctx.restore();
      }
    };

    loop();

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('touchmove', onPointerMove);
    };
  }, [isPlaying]);

  return (
    <div className="space-y-4">
      {/* HUD Header */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-card border-2 border-border shadow-xs text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-foreground">Score: {score}</span>
          <span className="text-muted-foreground font-mono">Time: {timeLeft}s</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-muted-foreground font-mono flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>High: {highScore}</span>
          </span>

          {!isPlaying && (
            <button
              onClick={handleStartGame}
              className="px-4 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{gameOver ? 'Play Again' : 'Start Mini-Game'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[400px] rounded-3xl overflow-hidden border-[3px] border-border shadow-[5px_5px_0_0_hsl(var(--border))] select-none"
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Start Overlay if Idle */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-secondary/30 border-2 border-primary flex items-center justify-center animate-bounce">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif-header text-foreground">
                Catch Falling Dreams & Stardust
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1">
                Slide Pip's cloud basket to catch dreams (+10) and golden stars (+25). Avoid scary nightmares (-15)!
              </p>
            </div>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              Start 30-Second Shift
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3">
            <Award className="w-14 h-14 text-amber-500 animate-bounce" />
            <h3 className="text-xl font-bold font-serif-header text-foreground">
              Shift 3 Complete!
            </h3>
            <p className="text-sm font-bold text-primary">Final Score: {score} Dream Points</p>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Catch More Dreams</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
