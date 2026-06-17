"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { BlessingsWall } from "@/components/event/BlessingsWall";
import { Section } from "@/components/shared";

export default function BlessingsPage() {
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section className="space-y-5">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" aria-label="Back to event">
            <Link href="/event/afsal-fathima"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="font-serif text-4xl font-bold">Blessings & Wishes</h1>
            <p className="mt-1 text-sm text-muted">Write something sweet for the couple.</p>
          </div>
        </div>
        <BlessingsWall showForm />
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
