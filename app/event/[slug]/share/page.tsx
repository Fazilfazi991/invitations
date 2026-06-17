"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventQRCode } from "@/components/share/EventQRCode";
import { ShareActions } from "@/components/share/ShareActions";
import { WhatsAppMessageGenerator } from "@/components/share/WhatsAppMessageGenerator";
import { Section } from "@/components/shared";
import { eventUrl, sampleEvent } from "@/lib/mock-data";

export default function SharePage() {
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section className="space-y-5">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" aria-label="Back to event">
            <Link href="/event/afsal-fathima"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="font-serif text-4xl font-bold">Share this event</h1>
            <p className="mt-1 text-sm text-muted">Invite your family and friends.</p>
          </div>
        </div>
        <Card className="flex items-center gap-4 p-4">
          <img src={sampleEvent.coupleImage} alt="" className="h-20 w-24 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-xl font-bold text-primary">{sampleEvent.title}</h2>
            <p className="text-sm text-muted">{sampleEvent.date}</p>
            <p className="mt-1 truncate text-xs text-muted">{eventUrl}</p>
          </div>
        </Card>
        <ShareActions />
        <EventQRCode />
        <WhatsAppMessageGenerator />
        <p className="rounded-2xl bg-primary-soft p-4 text-sm leading-6 text-muted">
          Tip: Add this QR code to your printed invitation card so guests can instantly open location, RSVP and live link.
        </p>
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
