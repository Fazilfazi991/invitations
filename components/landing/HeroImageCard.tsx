import Image from "next/image";
import type { HeroCategory } from "@/lib/hero-events";
import { cn } from "@/lib/utils";

export function HeroImageCard({ category, className }: { category: HeroCategory; className?: string }) {
  return (
    <div
      className={cn("relative shrink-0 overflow-hidden rounded-[1.75rem] border border-rose-100 bg-white shadow-2xl shadow-rose-200/30", className)}
      style={{ width: 280, height: 360 }}
    >
      <Image
        src={category.image}
        alt={`${category.label} invitation preview`}
        width={280}
        height={360}
        sizes="280px"
        priority={category.id === "birthday"}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
