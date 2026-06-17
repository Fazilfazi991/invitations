"use client";

import { HeroOrbitWheel } from "@/components/landing/HeroOrbitWheel";
import type { HeroCategory } from "@/lib/hero-events";

export function HeroOrbitCarousel(props: {
  events: HeroCategory[];
  selectedIndex: number;
  muted: boolean;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleMute: () => void;
}) {
  return <HeroOrbitWheel {...props} />;
}
