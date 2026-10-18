import React, { useEffect, useState } from 'react';

export const HitCounter: React.FC = () => {
  const [count, setCount] = useState<number>(1042);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pip_visitor_count');
      const current = saved ? parseInt(saved, 10) + 1 : 1042;
      localStorage.setItem('pip_visitor_count', current.toString());
      setCount(current);
    } catch {
      setCount(1043);
    }
  }, []);

  const formatted = String(count).padStart(6, '0');

  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#12161f] text-emerald-400 font-mono text-[11px] sm:text-xs rounded-xl border-2 border-border shadow-[2px_2px_0_0_hsl(var(--border))] shrink-0">
      <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="hidden sm:inline">Dream Visitors:</span>
        <span className="sm:hidden">Visits:</span>
      </span>
      <div className="flex gap-0.5">
        {formatted.split('').map((digit, idx) => (
          <span
            key={idx}
            className="bg-black/90 text-amber-300 font-bold px-1 sm:px-1.5 py-0.5 rounded text-[10px] sm:text-xs border border-zinc-700 shadow-inner"
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
};
