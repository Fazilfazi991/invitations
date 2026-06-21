"use client";

import { Baby, Cake, ChevronLeft, ChevronRight, Church, GlassWater, HeartHandshake, Home, Leaf } from "lucide-react";
import type { HeroCategory } from "@/lib/hero-events";
import { cn } from "@/lib/utils";

const icons = {
  heart: HeartHandshake,
  cake: Cake,
  cross: Church,
  chalice: GlassWater,
  leaf: Leaf,
  baby: Baby,
  home: Home,
};

export function getHeroIcon(icon: string) {
  return icons[icon as keyof typeof icons] ?? HeartHandshake;
}

export function HeroEventTabs({ events, selectedIndex, onSelect, compact = false }: { events: HeroCategory[]; selectedIndex: number; onSelect: (index: number) => void; compact?: boolean }) {
  return (
    <div className={cn("relative max-w-full", compact && "mx-auto w-full max-w-[430px]")} data-hero-tabs={compact ? "mobile" : "desktop"} role="tablist" aria-label="Celebration categories">
      {compact && (
        <>
          <span className="pointer-events-none absolute left-1 top-1/2 z-10 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-muted shadow-card">
            <ChevronLeft className="h-3.5 w-3.5" />
          </span>
          <span className="pointer-events-none absolute right-1 top-1/2 z-10 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-muted shadow-card">
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </>
      )}
      <div className={cn("flex max-w-full gap-0.5 overflow-x-auto border border-border bg-white/90 shadow-card backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", compact ? "w-full rounded-[1.55rem] px-7 py-1" : "w-max rounded-[1.15rem] p-0.5")}>
        {events.map((event, index) => {
          const Icon = getHeroIcon(event.icon);
          const active = selectedIndex === index;
          return (
            <button
              key={event.id}
              onClick={() => onSelect(index)}
              role="tab"
              aria-selected={active}
              aria-label={`Show ${event.label} invitation`}
              className={cn("relative flex flex-col items-center gap-0.5 rounded-lg font-semibold leading-tight transition", compact ? "min-w-[25%] basis-1/4 px-1 py-1.5 text-[11px]" : "min-w-[4.7rem] px-1.5 py-1.5 text-[10px] xl:min-w-[5.4rem] xl:px-2 xl:text-[11px]", active ? "bg-primary-soft text-primary shadow-card" : "text-muted hover:bg-primary-soft/50")}
            >
              <Icon className={cn(compact ? "h-[17px] w-[17px]" : "h-4 w-4 md:h-[18px] md:w-[18px]")} />
              {event.label}
              {active && <span className="absolute -bottom-0.5 h-1.5 w-1.5 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
