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

export function HeroEventTabs({ events, selectedIndex, onSelect }: { events: HeroCategory[]; selectedIndex: number; onSelect: (index: number) => void }) {
  return (
    <div className="flex w-max max-w-full gap-0.5 overflow-x-auto rounded-[1.15rem] border border-border bg-white/90 p-0.5 shadow-card backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {events.map((event, index) => {
        const Icon = getHeroIcon(event.icon);
        const active = selectedIndex === index;
        return (
          <button
            key={event.id}
            onClick={() => onSelect(index)}
            className={cn("relative flex min-w-[5.25rem] flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-semibold leading-tight transition md:min-w-[6rem] md:text-[11px]", active ? "bg-primary-soft text-primary shadow-card" : "text-muted hover:bg-primary-soft/50")}
          >
            <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            {event.label}
            {active && <span className="absolute -bottom-0.5 h-1.5 w-1.5 rounded-full bg-primary" />}
          </button>
        );
      })}
    </div>
  );
}
