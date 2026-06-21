import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label="occazn home">
      <img
        src="/brand/occazn-logo.webp"
        alt="occazn"
        className={cn("h-11 w-auto object-contain", imageClassName)}
      />
    </Link>
  );
}
