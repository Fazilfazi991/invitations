"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDemoUser } from "@/lib/demo-auth";

export function MobileHeader({ action = "create", className }: { action?: "create" | "settings" | "avatar" | "search"; className?: string }) {
  const [initial, setInitial] = useState("A");
  useEffect(() => setInitial(getDemoUser()?.name?.charAt(0).toUpperCase() || "A"), []);
  return (
    <header className={cn("sticky top-0 z-30 flex h-20 items-center justify-between bg-background/90 px-5 backdrop-blur", className)}>
      <Button variant="ghost" size="icon" aria-label="Open menu"><Menu className="h-6 w-6" /></Button>
      <Link href="/" className="font-serif text-4xl font-bold text-primary">
        Jashnly<span className="align-top text-lg text-gold">♥</span>
      </Link>
      {action === "create" ? (
        <Button asChild size="sm"><Link href="/categories">Create</Link></Button>
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
