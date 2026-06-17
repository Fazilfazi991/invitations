"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { familyContacts, galleryImages, locations, sampleEvent, schedule } from "@/lib/mock-data";
import { FooterTrust, GuestEventHero, QRCodeCard, RSVPForm, Section, ShareCard, TimelineItem } from "@/components/shared";

export default function GuestEventPage() {
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section className="space-y-4 pt-3">
        <GuestEventHero />
        <Card className="flex gap-4 p-5">
          <img src={sampleEvent.coupleImage} alt="" className="h-20 w-20 rounded-full object-cover" />
          <div><h2 className="font-serif text-2xl font-bold">Our Story <span className="text-primary">♡</span></h2><p className="text-sm leading-6 text-muted">From a chance meeting to a lifetime of togetherness. We&apos;re so excited to celebrate this special day with our loved ones.</p><Link href="#" className="mt-2 inline-block text-sm font-semibold text-primary">Read Our Story →</Link></div>
        </Card>
        <Card className="p-5"><h2 className="font-serif text-2xl font-bold">Event Schedule</h2><div className="mt-4 grid gap-3">{schedule.map((item) => <TimelineItem key={item.title} item={item} />)}</div></Card>
        <Card className="p-5"><h2 className="font-serif text-2xl font-bold">Venue</h2><div className="mt-3 grid gap-4 sm:grid-cols-2"><div><p className="font-semibold">{locations[1].address}</p><p className="text-sm text-muted">{sampleEvent.location}</p><Button asChild variant="outline" className="mt-4"><Link href="/event/afsal-fathima/locations">Open in Maps</Link></Button></div><div className="map-bg grid h-32 place-items-center rounded-2xl"><span className="text-3xl text-primary">●</span></div></div></Card>
        <Card className="p-5"><div className="flex items-center justify-between"><h2 className="font-serif text-2xl font-bold">Gallery</h2><Link href="/event/afsal-fathima/gallery" className="text-sm font-semibold text-primary">View All →</Link></div><div className="mt-4 flex gap-3 overflow-x-auto">{galleryImages.slice(0, 4).map((src) => <img key={src} src={src} alt="" className="h-24 w-32 shrink-0 rounded-xl object-cover" />)}</div></Card>
        <Card className="p-5"><h2 className="font-serif text-2xl font-bold">Family Contacts</h2><div className="mt-3 grid gap-3 sm:grid-cols-2">{familyContacts.slice(0, 2).map((contact) => <div key={contact.name} className="flex items-center justify-between rounded-xl bg-primary-soft p-4"><div><p className="font-semibold">{contact.name}</p><p className="text-sm text-muted">{contact.phone}</p></div><Phone className="h-5 w-5 text-primary" /></div>)}</div></Card>
        <Card className="p-5"><h2 className="font-serif text-2xl font-bold">Blessings <span className="text-primary">♡</span></h2><p className="mt-3 rounded-xl border border-border p-4 text-sm text-muted">Wishing you both a lifetime of love, laughter and endless happiness. - Farah</p></Card>
        <Card className="p-5"><h2 className="font-serif text-2xl font-bold">RSVP <span className="text-primary">♡</span></h2><p className="mb-4 text-sm text-muted">Kindly respond by {sampleEvent.rsvpDeadline}</p><RSVPForm /></Card>
        <div className="grid gap-4 sm:grid-cols-2"><ShareCard /><QRCodeCard /></div>
      </Section>
      <FooterTrust />
      <BottomNav type="guest" />
    </main>
  );
}
