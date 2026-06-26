"use client";

import Link from "next/link";
import { Menu, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function MobileHeader({ action = "create", className }: { action?: "create" | "settings" | "avatar" | "search"; className?: string }) {
  const { user } = useAuth();
  const initial = user?.name?.charAt(0).toUpperCase() || "A";
  return (
    <header className={cn("sticky top-0 z-30 flex h-20 items-center justify-between bg-background/90 px-5 backdrop-blur", className)}>
      <Button variant="ghost" size="icon" aria-label="Open menu"><Menu className="h-6 w-6" /></Button>
      <BrandLogo imageClassName="h-12" />
      {action === "create" ? (
        <Button asChild size="sm"><Link href="/create-event">Create</Link></Button>
      ) : action === "settings" ? (
        <Button variant="outline" size="icon" aria-label="Filters"><Settings2 className="h-5 w-5" /></Button>
      ) : action === "avatar" ? (
        <Link href="/profile" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-primary-soft font-serif text-xl text-primary">{initial}</Link>
      ) : (
        <div className="h-11 w-11" />
      )}
    </header>
  );
}
