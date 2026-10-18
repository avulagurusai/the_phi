import React, { useState } from 'react';
import { Send, MapPin, Sparkles, Compass, CheckCircle2, Clock } from 'lucide-react';
import { audio } from '@/utils/audio';

interface DeliveryStop {
  id: string;
  name: string;
  recipient: string;
  dreamType: string;
  x: number;
  y: number;
  delivered: boolean;
  color: string;
}

export const DreamDeliveryRoutes: React.FC = () => {
  const [stops, setStops] = useState<DeliveryStop[]>([
    {
      id: 'stop-1',
      name: 'The Orphanage Attic',
      recipient: 'Seven Sleepy Kittens',
      dreamType: 'Warm Fireplace & Cream',
      x: 20,
      y: 75,
      delivered: true,
      color: '#f59e0b',
    },
    {
      id: 'stop-2',
      name: 'Baker’s Loft',
      recipient: 'Tired Cinnamon Buns Baker',
      dreamType: 'Floating Pastry Clouds',
      x: 48,
      y: 40,
      delivered: false,
      color: '#ec4899',
    },
    {
      id: 'stop-3',
      name: 'Willow Tree Hollow',
      recipient: 'Little Screech Owl Chick',
      dreamType: 'Starry Canopy Flight',
      x: 78,
      y: 65,
      delivered: false,
      color: '#38bdf8',
    },
    {
      id: 'stop-4',
      name: 'Coastline Watchtower',
      recipient: 'Old Sea Captain',
      dreamType: 'Calm Harbor Waters',
      x: 90,
      y: 25,
      delivered: false,
      color: '#818cf8',
    },
  ]);

  const [activeStop, setActiveStop] = useState<DeliveryStop>(stops[1]);
  const [isDispatching, setIsDispatching] = useState(false);

  const handleSelectStop = (stop: DeliveryStop) => {
    audio.playClick();
    setActiveStop(stop);
  };

  const dispatchDream = () => {
    if (isDispatching) return;
    setIsDispatching(true);
    audio.playChime(783.99, 'sine', 0.4);

    setTimeout(() => {
      setStops(prev =>
        prev.map(s => (s.id === activeStop.id ? { ...s, delivered: true } : s))
      );
      audio.playLullabyArpeggio();
      setIsDispatching(false);
    }, 800);
  };

  return (
    <div className="bg-card border-[3px] border-border rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0_0_hsl(var(--border))] flex flex-col justify-between h-full w-full min-w-0">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-1.5">
              <span>Project #3</span>
              <span>•</span>
              <span>Constellation Map</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold font-serif-header text-foreground">
              Dream Delivery Routes
            </h3>
          </div>

          <div className="w-10 h-10 rounded-full bg-secondary/20 text-foreground border border-secondary flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 text-secondary animate-spin-slow" />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
          Interactive flight dispatcher. Pip charts midnight routes across sleepy village chimneys, delivering custom dreams to tucked-in residents.
        </p>

        {/* Interactive Constellation Rooftop SVG Canvas */}
        <div className="relative w-full h-40 sm:h-44 rounded-2xl bg-[#0d131f] border-2 border-border overflow-hidden mb-4 p-2">
          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points="20,75 48,40 78,65 90,25"
              fill="none"
              stroke="#a34063"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="opacity-70"
            />
          </svg>

          {/* Interactive Waypoints */}
          {stops.map(stop => (
            <button
              key={stop.id}
              onClick={() => handleSelectStop(stop)}
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center ${
                activeStop.id === stop.id ? 'scale-125 z-20' : 'scale-100 hover:scale-110'
              }`}
              title={`${stop.name}: ${stop.recipient}`}
              aria-label={`Select waypoint ${stop.name}`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-md ${
                  stop.delivered ? 'bg-emerald-500' : 'bg-primary'
                }`}
                style={{ backgroundColor: stop.color }}
              >
                {stop.delivered ? (
                  <CheckCircle2 className="w-3 h-3 text-white" />
                ) : (
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                )}
              </div>
              <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 -bottom-5 whitespace-nowrap text-[9px] font-bold text-white bg-black/75 px-1.5 py-0.5 rounded border border-white/20">
                {stop.name.split(' ')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Route Waypoint Inspector Card */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-muted/60 border border-border/80 text-xs space-y-1.5 mb-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-foreground flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{activeStop.name}</span>
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1 ${
                activeStop.delivered
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
              }`}
            >
              {activeStop.delivered ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Delivered</span>
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3" />
                  <span>Awaiting Pip</span>
                </>
              )}
            </span>
          </div>

          <div className="text-[11px] text-muted-foreground truncate">
            Recipient: <strong className="text-foreground">{activeStop.recipient}</strong>
          </div>
          <div className="text-[11px] text-muted-foreground truncate">
            Dream Payload: <em className="text-primary font-semibold">{activeStop.dreamType}</em>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-border/50">
        <button
          onClick={dispatchDream}
          disabled={isDispatching || activeStop.delivered}
          className="w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-xs bg-primary text-primary-foreground border-2 border-border shadow-[2px_2px_0_0_hsl(var(--border))] hover:opacity-95 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-2 touch-manipulation"
        >
          <Send className="w-3.5 h-3.5 shrink-0" />
          <span>
            {activeStop.delivered
              ? 'Dream Successfully Delivered!'
              : isDispatching
              ? 'Dispatching Pip Over Chimneys...'
              : `Dispatch Dream to ${activeStop.name.split(' ')[0]}`}
          </span>
        </button>
      </div>
    </div>
  );
};
