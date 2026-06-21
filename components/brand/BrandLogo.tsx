import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, imageClassName, ariaLabel = "occazn home" }: { className?: string; imageClassName?: string; ariaLabel?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label={ariaLabel}>
      <img
        src="/brand/occazn-logo-clean.webp"
        alt="occazn"
        className={cn("h-11 w-auto object-contain", imageClassName)}
      />
    </Link>
  );
}
