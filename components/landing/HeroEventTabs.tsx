"use client";

import { Baby, Cake, Church, GlassWater, HeartHandshake, Home, Leaf } from "lucide-react";
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
    <div className={cn("flex max-w-full gap-0.5 overflow-x-auto border border-border bg-white/90 shadow-card backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", compact ? "w-full rounded-[1.75rem] p-1" : "w-max rounded-[1.15rem] p-0.5")}>
      {events.map((event, index) => {
        const Icon = getHeroIcon(event.icon);
        const active = selectedIndex === index;
        return (
          <button
            key={event.id}
            onClick={() => onSelect(index)}
            className={cn("relative flex flex-col items-center gap-0.5 rounded-lg font-semibold leading-tight transition", compact ? "min-w-[5.4rem] px-2 py-2 text-[12px]" : "min-w-[5.25rem] px-2 py-1.5 text-[10px] md:min-w-[6rem] md:text-[11px]", active ? "bg-primary-soft text-primary shadow-card" : "text-muted hover:bg-primary-soft/50")}
          >
            <Icon className={cn(compact ? "h-[18px] w-[18px]" : "h-4 w-4 md:h-[18px] md:w-[18px]")} />
            {event.label}
            {active && <span className="absolute -bottom-0.5 h-1.5 w-1.5 rounded-full bg-primary" />}
          </button>
        );
      })}
    </div>
  );
}
