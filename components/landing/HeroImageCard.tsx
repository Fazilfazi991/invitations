import Image from "next/image";
import type { HeroCategory } from "@/lib/hero-events";
import { cn } from "@/lib/utils";

export function HeroImageCard({ category, className, fluid = false }: { category: HeroCategory; className?: string; fluid?: boolean }) {
  return (
    <div
      className={cn("relative shrink-0 overflow-hidden rounded-[1.75rem] border border-brand-light bg-white shadow-2xl shadow-brand-light/30", className)}
      style={fluid ? undefined : { width: 280, height: 360 }}
    >
      <Image
        src={category.image}
        alt={`${category.label} invitation preview`}
        width={280}
        height={360}
        sizes={fluid ? "(max-width: 480px) calc(100vw - 40px), 420px" : "280px"}
        unoptimized
        priority={category.id === "birthday"}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
