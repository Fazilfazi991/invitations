"use client";

import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroImageCard } from "@/components/landing/HeroImageCard";
import { getHeroIcon } from "@/components/landing/HeroEventTabs";
import type { HeroCategory } from "@/lib/hero-events";
import { cn } from "@/lib/utils";

const premiumTransition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const };
const orbitDots = Array.from({ length: 18 }, (_, index) => {
  const angle = (index / 18) * Math.PI * 2;
  return {
    x: (Math.cos(angle) * 214).toFixed(3),
    y: (Math.sin(angle) * 214).toFixed(3),
  };
});

function desktopCardPose(relative: number, total: number) {
  if (relative === 0) return { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 };
  if (relative === 1) return { x: 145, y: 8, scale: 0.5, rotate: 8, opacity: 0.45, zIndex: 12 };
  if (relative === total - 1) return { x: -145, y: 8, scale: 0.5, rotate: -8, opacity: 0.45, zIndex: 12 };
  if (relative === 2) return { x: 215, y: -60, scale: 0.34, rotate: 12, opacity: 0.18, zIndex: 5 };
  if (relative === total - 2) return { x: -215, y: -60, scale: 0.34, rotate: -12, opacity: 0.18, zIndex: 5 };
  return { x: 0, y: 210, scale: 0.35, rotate: 0, opacity: 0, zIndex: 0 };
}

function mobileCardPose(relative: number, total: number) {
  if (relative === 0) return { x: 0, y: 0, scale: 0.92, rotate: 0, opacity: 1, zIndex: 20 };
  if (relative === 1) return { x: 122, y: 8, scale: 0.72, rotate: 7, opacity: 0.55, zIndex: 8 };
  if (relative === total - 1) return { x: -122, y: 8, scale: 0.72, rotate: -7, opacity: 0.55, zIndex: 8 };
  return { x: 0, y: 0, scale: 0.45, rotate: 0, opacity: 0, zIndex: 0 };
}

function Controls({ muted, onPrevious, onNext, onToggleMute }: Pick<HeroOrbitWheelProps, "muted" | "onPrevious" | "onNext" | "onToggleMute">) {
  return (
    <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-white/95 p-1 shadow-card backdrop-blur">
      <Button className="h-8 w-8" variant="ghost" size="icon" onClick={onPrevious} aria-label="Previous celebration"><ChevronLeft className="h-4 w-4" /></Button>
      <button onClick={onToggleMute} className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-primary" aria-label="Toggle carousel sound">
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
      <Button className="h-8 w-8" variant="ghost" size="icon" onClick={onNext} aria-label="Next celebration"><ChevronRight className="h-4 w-4" /></Button>
    </div>
  );
}

type HeroOrbitWheelProps = {
  events: HeroCategory[];
  selectedIndex: number;
  muted: boolean;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleMute: () => void;
};

export function HeroOrbitWheel({ events, selectedIndex, muted, onSelect, onPrevious, onNext, onToggleMute }: HeroOrbitWheelProps) {
  const total = events.length;
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? { duration: 0 } : premiumTransition;

  return (
    <>
      <div className="relative mx-auto hidden w-full overflow-hidden lg:block" style={{ maxWidth: 620, height: 520 }}>
        <div className="absolute left-1/2 top-1/2 h-[448px] w-[448px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-light/60 bg-[radial-gradient(circle,rgba(208,184,216,0.38),rgba(254,253,252,0.04)_60%,transparent_72%)] shadow-[0_0_70px_rgba(108,23,133,0.10)]" />
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
        <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-lavender/35" />
        {orbitDots.map((dot, index) => {
          return (
            <span
              key={index}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-primary/35"
              style={{ transform: `translate(${dot.x}px, ${dot.y}px)` }}
            />
          );
        })}
        {events.map((event, index) => {
          const Icon = getHeroIcon(event.icon);
          const angle = ((index - selectedIndex) / total) * Math.PI * 2 - Math.PI / 2;
          const active = index === selectedIndex;
          const x = Math.cos(angle) * 210;
          const y = Math.sin(angle) * 210;
          return (
            <motion.button
              key={event.id}
              onClick={() => onSelect(index)}
              className="absolute left-1/2 top-1/2 z-30"
              animate={{ x: x - (active ? 39 : 27), y: y - (active ? 39 : 27), scale: active ? 1 : 0.92 }}
              transition={transition}
            >
              <span className={cn("flex flex-col items-center justify-center rounded-full border bg-white text-[9px] font-semibold shadow-card", active ? "h-[78px] w-[78px] border-primary bg-primary text-white ring-8 ring-primary/15" : "h-[54px] w-[54px] border-border text-muted")}>
                <Icon className="mb-1 h-5 w-5" />
                <span>{event.label.split(" ")[0]}</span>
              </span>
            </motion.button>
          );
        })}
        <div className="absolute left-1/2 top-1/2">
          {events.map((event, index) => {
            const relative = (index - selectedIndex + total) % total;
            const pose = desktopCardPose(relative, total);
            return (
              <motion.div
                key={event.id}
                className="absolute"
                animate={{ x: pose.x - 140, y: pose.y - 180, scale: pose.scale, rotate: pose.rotate, opacity: pose.opacity, zIndex: pose.zIndex }}
                transition={transition}
                style={{ pointerEvents: relative === 0 ? "auto" : "none" }}
              >
                <HeroImageCard category={event} />
              </motion.div>
            );
          })}
        </div>
        <Controls muted={muted} onPrevious={onPrevious} onNext={onNext} onToggleMute={onToggleMute} />
      </div>

      <div className="relative mx-auto w-full max-w-sm overflow-hidden lg:hidden" style={{ height: 540 }}>
        <div className="absolute left-1/2 top-[48%] h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-light/60 bg-primary-soft/30" />
        <div className="absolute left-1/2 top-[48%]">
          {events.map((event, index) => {
            const relative = (index - selectedIndex + total) % total;
            const pose = mobileCardPose(relative, total);
            return (
              <motion.div
                key={event.id}
                className="absolute"
                animate={{ x: pose.x - 140, y: pose.y - 180, scale: pose.scale, rotate: pose.rotate, opacity: pose.opacity, zIndex: pose.zIndex }}
                transition={transition}
                style={{ pointerEvents: relative === 0 ? "auto" : "none" }}
              >
                <HeroImageCard category={event} />
              </motion.div>
            );
          })}
        </div>
        <Controls muted={muted} onPrevious={onPrevious} onNext={onNext} onToggleMute={onToggleMute} />
      </div>
    </>
  );
}
