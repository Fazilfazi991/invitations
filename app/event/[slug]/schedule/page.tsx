"use client";

import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Section, TimelineItem } from "@/components/shared";
import { schedule } from "@/lib/mock-data";

export default function SchedulePage() {
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">Event Schedule</h1>
        <p className="mt-2 text-muted">Here&apos;s what&apos;s happening.</p>
        <div className="mt-6 space-y-4">{schedule.map((item) => <TimelineItem key={item.title} item={item} />)}</div>
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
