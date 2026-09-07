"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Copy, Download, MessageCircle, Share2 } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { EventCompletionChecklist } from "@/components/dashboard/EventCompletionChecklist";
import { ShareActions } from "@/components/share/ShareActions";
import { WhatsAppMessageGenerator } from "@/components/share/WhatsAppMessageGenerator";
import { FooterTrust, Section } from "@/components/shared";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatEventDate, formatEventTime } from "@/lib/date-utils";
import type { EventDraft } from "@/lib/event-draft";
import { loadOrganizerEvents } from "@/lib/event-repository";
import { getEventTypeLabel } from "@/lib/event-types";
import { getEventUrl } from "@/lib/event-url";
import { getDefaultTemplateForType, getTemplateById } from "@/lib/templates";
import { getThemeStyles } from "@/lib/themes";

export default function DashboardDetailPage() {
  const params = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventDraft | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadOrganizerEvents().then((events) => {
      setEvent(events.find((candidate: EventDraft) => candidate.slug === params.id) ?? null);
      setLoaded(true);
    });
  }, [params.id]);

  if (!loaded) return <main className="phone-shell min-h-screen bg-background" aria-busy="true" />;
  if (!event) return <NotFound />;

  const title = event.title;
  const date = formatEventDate(event.date);
  const time = formatEventTime(event.time);
  const location = [event.venueName, event.city].filter(Boolean).join(", ");
  const template = getTemplateById(event.templateId) ?? getDefaultTemplateForType(event.eventType);
  const theme = getThemeStyles(event.theme);
  const publicUrl = getEventUrl(event.slug);

  async function copyEventLink() { await navigator.clipboard.writeText(publicUrl); }
  function downloadQrCode() {
    if (!event?.qrCodeData) return;
    const url = URL.createObjectURL(new Blob([event.qrCodeData], { type: "image/svg+xml;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `occazn-${event.slug}-qr.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="avatar" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted">Manage your wedding invitation</p>
        <Card className="mt-5 flex items-center gap-4 p-4" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
          <img src={event.coverImage || event.templateImage} alt="" className="h-24 w-28 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-2xl font-bold" style={{ color: theme.primary }}>{title}</h2>
            <p className="mt-2 text-muted">{date} - {time}</p>
            <p className="text-muted">{location}</p>
          </div>
          <div className="space-y-2 text-right"><Badge>{event.status === "published" ? "Live" : "Draft"}</Badge><p className="text-xs font-semibold text-muted">{getEventTypeLabel(event.eventType)}</p></div>
        </Card>

        <div className="mt-5"><EventCompletionChecklist event={event} /></div>
        <Card className="mt-5 p-5">
          <h2 className="font-serif text-2xl font-bold">Template</h2>
          <p className="mt-1 text-sm text-muted">Change the invitation style anytime before sharing your event.</p>
          <div className="mt-4 flex gap-4"><TemplatePreview template={template} compact className="w-28 shrink-0" /><div className="min-w-0 flex-1"><Badge>{template.category}</Badge><h3 className="mt-2 font-serif text-2xl font-bold">{template.name}</h3><Button asChild variant="outline" size="sm" className="mt-3"><Link href={`/categories?event=${params.id}&mode=change-template&type=${event.eventType}`}>Change template</Link></Button></div></div>
        </Card>
        <Card className="mt-5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-serif text-2xl font-bold">Guest insights</h2><Badge>Coming soon</Badge></div>
          <p className="mt-2 text-sm text-muted">Verified views and RSVP reporting will appear here after production analytics are connected. No sample counts are shown.</p>
        </Card>
        <Card className="mt-5 p-5">
          <h2 className="font-serif text-2xl font-bold">Share tools</h2>
          <p className="mt-1 text-sm text-muted">{event.status === "published" ? "Copy the event link, download its QR code, or share with guests." : "Publish your event to generate a shareable QR code."}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 max-[360px]:grid-cols-1">
            <Button onClick={copyEventLink} variant="outline"><Copy className="h-4 w-4" />Copy Event Link</Button>
            <Button asChild variant="outline"><Link href={`/event/${event.slug}/share`}><Share2 className="h-4 w-4" />Open share page</Link></Button>
            <Button onClick={downloadQrCode} variant="outline" disabled={!event.qrCodeData}><Download className="h-4 w-4" />Download QR Code</Button>
            <Button asChild variant="soft"><a href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${publicUrl}`)}`} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />Share on WhatsApp</a></Button>
          </div>
          <div className="mt-4"><ShareActions includeOpenSharePage title={title} url={publicUrl} slug={event.slug} /></div>
        </Card>
        <div className="mt-5"><WhatsAppMessageGenerator compact event={{ title, date, time, venue: location, url: publicUrl, eventLabel: event.eventType }} /></div>
      </Section>
      <FooterTrust />
      <BottomNav />
    </main>
  );
}

function NotFound() {
  return <main className="phone-shell min-h-screen pb-20"><MobileHeader action="avatar" /><Section className="pt-12 text-center"><h1 className="font-serif text-4xl font-bold">Event not found</h1><p className="mt-3 text-muted">This event is unavailable or belongs to another organizer.</p><Button asChild className="mt-6"><Link href="/dashboard">Back to dashboard</Link></Button></Section><BottomNav /></main>;
}
