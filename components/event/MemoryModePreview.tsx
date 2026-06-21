"use client";

import Link from "next/link";
import { Download, Heart, Image, Play, Share2, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlessingsWall } from "@/components/event/BlessingsWall";
import { MemoryGallery } from "@/components/event/MemoryGallery";
import { galleryImages, sampleEvent } from "@/lib/mock-data";
import type { EventDraft } from "@/lib/event-draft";
import { getEventTypeLabel } from "@/lib/event-types";

export function MemoryModePreview({ event }: { event?: EventDraft }) {
  const slug = event?.slug || "afsal-fathima";
  const title = event?.title || sampleEvent.couple;
  const label = event ? getEventTypeLabel(event.eventType) : "Wedding";
  return (
    <div className="space-y-4">
      <Card className="floral p-5 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">{label} Memories</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-primary">Thank you for celebrating with us</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{title}&apos;s memories, blessings and beautiful moments.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button asChild variant="soft"><Link href={`/event/${slug}/gallery`}><Image className="h-4 w-4" />View Gallery</Link></Button>
          <Button variant="outline"><Play className="h-4 w-4" />Watch Highlights</Button>
          <Button asChild variant="outline"><Link href={`/event/${slug}/blessings`}><Heart className="h-4 w-4" />Leave a Blessing</Link></Button>
          <Button asChild><Link href={`/event/${slug}/share`}><Share2 className="h-4 w-4" />Share Memories</Link></Button>
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="font-serif text-2xl font-bold">With grateful hearts</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Thank you for joining us, blessing us, and making the day feel full of warmth.</p>
      </Card>
      <Card className="p-5">
        <div className="grid h-44 place-items-center rounded-2xl bg-primary-soft">
          <div className="text-center">
            <Play className="mx-auto h-12 w-12 text-primary" />
            <p className="mt-3 font-semibold">{label} highlight video</p>
            <Button variant="outline" className="mt-4">Watch Highlights</Button>
          </div>
        </div>
      </Card>
      <MemoryGallery />
      <Card className="p-5">
        <h2 className="font-serif text-2xl font-bold">Photos shared by guests</h2>
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {galleryImages.slice(1, 5).map((src) => <img key={src} src={src} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover" />)}
        </div>
        <Button variant="outline" className="mt-4 w-full"><Upload className="h-4 w-4" />Upload a memory</Button>
      </Card>
      <BlessingsWall compact eventTitle={title} slug={slug} />
      <Card className="p-5">
        <Sparkles className="h-7 w-7 text-gold" />
        <h2 className="mt-3 font-serif text-2xl font-bold">Keep the memories close</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Download the memory album or share this page with loved ones.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button><Download className="h-4 w-4" />Download album</Button>
          <Button asChild variant="outline"><Link href={`/event/${slug}/share`}><Share2 className="h-4 w-4" />Share page</Link></Button>
        </div>
      </Card>
    </div>
  );
}
