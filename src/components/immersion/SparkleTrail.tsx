import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
}

interface SparkleTrailProps {
  enabled: boolean;
}

export const SparkleTrail: React.FC<SparkleTrailProps> = ({ enabled }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!enabled) {
      setSparkles([]);
      return;
    }

    let counter = 0;
    const symbols = ['✦', '★', '✧', '⋆', '｡'];
    const colors = ['#f59e0b', '#fbbf24', '#a34063', '#ec4899', '#60a5fa'];

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle spawn rate
      if (Math.random() > 0.35) return;

      const newSparkle: Sparkle = {
        id: counter++,
        x: e.clientX,
        y: e.clientY,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setSparkles(prev => [...prev.slice(-16), newSparkle]);

      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  if (!enabled || sparkles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {sparkles.map(s => (
        <span
          key={s.id}
          className="absolute select-none animate-ping text-xs font-bold"
          style={{
            left: s.x,
            top: s.y,
            color: s.color,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {s.symbol}
        </span>
      ))}
    </div>
  );
};
