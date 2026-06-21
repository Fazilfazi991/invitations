"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Download, Heart, Image, MapPin, Play, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlessingsWall } from "@/components/event/BlessingsWall";
import { GuestPhotoUpload } from "@/components/event/GuestPhotoUpload";
import { MemoryGallery } from "@/components/event/MemoryGallery";
import { galleryImages, sampleEvent } from "@/lib/mock-data";
import type { EventDraft } from "@/lib/event-draft";
import { formatEventDate } from "@/lib/date-utils";
import { getEventTypeLabel } from "@/lib/event-types";
import { loadGuestMemories, type GuestMemory } from "@/lib/guest-memories";
import { getThemeStyles } from "@/lib/themes";

export function MemoryModePreview({ event }: { event?: EventDraft }) {
  const slug = event?.slug || "afsal-fathima";
  const title = event?.title || sampleEvent.couple;
  const label = event ? getEventTypeLabel(event.eventType) : "Wedding";
  const theme = getThemeStyles(event?.theme);
  const heroImage = event?.coverImage || event?.templateImage || sampleEvent.coupleImage;
  const [guestMemories, setGuestMemories] = useState<GuestMemory[]>([]);

  useEffect(() => { loadGuestMemories(slug).then(setGuestMemories); }, [slug]);

  return (
    <div className="space-y-5">
      <Card className="relative overflow-hidden border-0 p-0 text-white shadow-soft">
        <img src={heroImage} alt="" className="h-[28rem] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: theme.accent }}>{label} Memories</p>
          <h1 className="mt-2 font-serif text-4xl font-bold">Thank you for celebrating with us</h1>
          <p className="mt-2 text-sm text-white/80">{title} became a day we&apos;ll always remember.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/80">
            {event?.date && <span><CalendarDays className="mr-1 inline h-4 w-4" />{formatEventDate(event.date)}</span>}
            {event?.venueName && <span><MapPin className="mr-1 inline h-4 w-4" />{event.venueName}</span>}
          </div>
        </div>
      </Card>

      <Card className="p-5 text-center" style={{ borderColor: theme.border, background: `linear-gradient(135deg, ${theme.soft}, ${theme.background})` }}>
        <Sparkles className="mx-auto h-7 w-7" style={{ color: theme.accent }} />
        <h2 className="mt-3 font-serif text-3xl font-bold" style={{ color: theme.primary }}>With grateful hearts</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Thank you for joining us, sharing your blessings, and filling this celebration with warmth and laughter.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button asChild variant="outline"><Link href={`/event/${slug}/gallery`}><Image className="h-4 w-4" />Full gallery</Link></Button>
          <Button asChild style={{ backgroundColor: theme.primary }}><Link href={`/event/${slug}/share`}><Share2 className="h-4 w-4" />Share album</Link></Button>
        </div>
      </Card>

      <Card className="overflow-hidden p-5" style={{ borderColor: theme.border }}>
        <div className="grid h-52 place-items-center rounded-2xl" style={{ background: `linear-gradient(135deg, ${theme.soft}, ${theme.background})` }}>
          <div className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white shadow-card"><Play className="h-8 w-8" style={{ color: theme.primary }} /></span>
            <p className="mt-4 font-serif text-2xl font-bold">{label} highlights</p>
            <p className="mt-1 text-sm text-muted">{event?.youtubeLink ? "Relive the celebration video." : "Highlight film coming soon."}</p>
            {event?.youtubeLink && <Button asChild variant="outline" className="mt-4"><a href={event.youtubeLink} target="_blank" rel="noreferrer">Watch highlights</a></Button>}
          </div>
        </div>
      </Card>

      <MemoryGallery event={event} guestMemories={guestMemories} />

      <Card className="p-5" style={{ borderColor: theme.border }}>
        <h2 className="font-serif text-2xl font-bold">A little more joy</h2>
        <p className="mt-1 text-sm text-muted">A quick reel of moments from family and friends.</p>
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {galleryImages.slice(1, 5).map((src) => <img key={src} src={src} alt="" className="h-28 w-36 shrink-0 rounded-xl object-cover" />)}
        </div>
      </Card>

      <GuestPhotoUpload slug={slug} theme={event?.theme} onAdded={(memory) => setGuestMemories((current) => [memory, ...current])} />
      <BlessingsWall compact eventTitle={title} slug={slug} />

      <Card className="p-5" style={{ borderColor: theme.border }}>
        <Heart className="h-7 w-7" style={{ color: theme.primary }} />
        <h2 className="mt-3 font-serif text-2xl font-bold">Keep the memories close</h2>
        <p className="mt-2 text-sm leading-6 text-muted">This album stays available as a beautiful post-event home for photos, wishes, and highlights.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline"><Download className="h-4 w-4" />Album export soon</Button>
          <Button asChild style={{ backgroundColor: theme.primary }}><Link href={`/event/${slug}/share`}><Share2 className="h-4 w-4" />Share page</Link></Button>
        </div>
      </Card>
    </div>
  );
}
