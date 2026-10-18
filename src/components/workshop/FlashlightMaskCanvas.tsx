import React, { useRef, useEffect, useState } from 'react';
import { Flashlight, Sparkles, Moon, Eye, Award, CheckCircle2 } from 'lucide-react';
import { audio } from '@/utils/audio';

export const FlashlightMaskCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [flashlightRadius, setFlashlightRadius] = useState(120);
  const [beamColor, setBeamColor] = useState<'amber' | 'cyan' | 'lavender' | 'rose'>('amber');
  const [secretsFound, setSecretsFound] = useState<string[]>([]);

  const mousePos = useRef<{ x: number; y: number }>({ x: 180, y: 150 });
  const isHovering = useRef(false);

  // Hidden secret spots coordinates in canvas percentages
  const hiddenSecrets = [
    { id: 'secret-1', name: 'Sleeping Nebula Cat', x: 22, y: 35, icon: '🐱', hint: 'Curled up on a comet tail' },
    { id: 'secret-2', name: 'Pip’s Spare Gold Star', x: 52, y: 65, icon: '⭐', hint: 'Hidden inside a cloud pocket' },
    { id: 'secret-3', name: '13th Hour Clock Key', x: 78, y: 28, icon: '🗝️', hint: 'Resting on the velvet gear' },
    { id: 'secret-4', name: 'Honey-Milk Thermos', x: 82, y: 75, icon: '🍯', hint: 'Warm bedtime beverage for couriers' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight || 420;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;

    const render = () => {
      animationId = requestAnimationFrame(render);
      const w = canvas.width;
      const h = canvas.height;

      // 1. Draw Deep Nocturnal Layer (Darkness)
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0f0c1b';
      ctx.fillRect(0, 0, w, h);

      // 2. Draw Faint Constellation Grid Lines in darkness
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 3. Cut Flashlight Beam Hole using 'destination-out'
      const { x, y } = mousePos.current;
      const rad = flashlightRadius;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const radGrad = ctx.createRadialGradient(x, y, 10, x, y, rad);
      radGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      radGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.85)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Draw Glow Rim Ring on top
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      const colors = {
        amber: 'rgba(245, 158, 11, 0.35)',
        cyan: 'rgba(6, 182, 212, 0.35)',
        lavender: 'rgba(168, 85, 247, 0.35)',
        rose: 'rgba(244, 63, 94, 0.35)',
      };
      const glowGrad = ctx.createRadialGradient(x, y, rad * 0.8, x, y, rad * 1.05);
      glowGrad.addColorStop(0, 'rgba(0,0,0,0)');
      glowGrad.addColorStop(0.5, colors[beamColor]);
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(x, y, rad * 1.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Check secret collision
      hiddenSecrets.forEach((sec) => {
        const secX = (sec.x / 100) * w;
        const secY = (sec.y / 100) * h;
        const dist = Math.hypot(secX - x, secY - y);
        if (dist < rad * 0.75) {
          setSecretsFound((prev) => {
            if (!prev.includes(sec.id)) {
              audio.playChime(659.25, 'triangle', 0.2);
              return [...prev, sec.id];
            }
            return prev;
          });
        }
      });
    };

    render();

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      mousePos.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      isHovering.current = true;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('touchmove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('touchmove', onPointerMove);
    };
  }, [flashlightRadius, beamColor]);

  return (
    <div className="space-y-4">
      {/* Top Banner Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-card border-2 border-border shadow-xs text-xs">
        <div className="flex items-center gap-2">
          <Flashlight className="w-4 h-4 text-primary" />
          <span className="font-bold text-foreground">Nightlight Beam:</span>
          <span className="text-muted-foreground font-mono">
            {secretsFound.length} of {hiddenSecrets.length} Secrets Revealed
          </span>
        </div>

        {/* Beam Radius & Color Controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground font-bold">Lantern Hue:</span>
          {[
            { id: 'amber', color: 'bg-amber-500' },
            { id: 'lavender', color: 'bg-purple-500' },
            { id: 'cyan', color: 'bg-cyan-500' },
            { id: 'rose', color: 'bg-pink-500' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => {
                audio.playClick();
                setBeamColor(c.id as typeof beamColor);
              }}
              className={`w-5 h-5 rounded-full ${c.color} border-2 ${
                beamColor === c.id ? 'ring-2 ring-primary scale-125' : 'opacity-60'
              } transition-all`}
            />
          ))}

          <button
            onClick={() => {
              audio.playClick();
              setFlashlightRadius((r) => (r >= 160 ? 90 : r + 35));
            }}
            className="ml-2 px-2.5 py-1 rounded-lg bg-muted text-[11px] font-bold text-foreground hover:bg-muted/80 transition-colors"
          >
            Beam Size: {flashlightRadius}px
          </button>
        </div>
      </div>

      {/* Mask Canvas Playground Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border-[3px] border-border shadow-[5px_5px_0_0_hsl(var(--border))] cursor-crosshair select-none bg-[#fff8f1] dark:bg-[#1a1423]"
      >
        {/* UNDERNEATH LAYER: The Illustrated Dream Sanctuary being revealed */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none select-none">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#a34063]">
                CONFIDENTIAL: MIDNIGHT NURSERY SPEC
              </span>
              <h3 className="text-xl font-bold font-serif-header text-foreground">
                The Luminescent Dream Cartography
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl">✨ 🌙 🌌</span>
            </div>
          </div>

          {/* Hidden Interactive Secrets Scattered across the canvas */}
          {hiddenSecrets.map((sec) => (
            <div
              key={sec.id}
              style={{ left: `${sec.x}%`, top: `${sec.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-card/90 border-2 border-primary shadow-md flex items-center justify-center text-xl animate-bounce">
                {sec.icon}
              </div>
              <div className="px-2 py-0.5 rounded-md bg-card/90 border border-border text-[10px] font-bold text-foreground whitespace-nowrap shadow-xs">
                {sec.name}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-end text-xs text-muted-foreground font-mono">
            <span>Coordinates: 37°N Midnight Loom</span>
            <span>Hover lantern over secrets to inspect</span>
          </div>
        </div>

        {/* OVERLAY LAYER: Dark Canvas that gets mask-subtracted */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Discovered Secrets Checklist */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {hiddenSecrets.map((sec) => {
          const isFound = secretsFound.includes(sec.id);
          return (
            <div
              key={sec.id}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                isFound
                  ? 'bg-primary/10 border-primary text-foreground font-bold shadow-xs'
                  : 'bg-muted/40 border-border/60 text-muted-foreground opacity-60'
              }`}
            >
              <span className="text-base">{sec.icon}</span>
              <div className="min-w-0">
                <p className="text-xs truncate">{sec.name}</p>
                <p className="text-[10px] text-muted-foreground truncate font-normal">
                  {isFound ? 'Discovered!' : sec.hint}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
