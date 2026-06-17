"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Clock,
  Copy,
  Download,
  Eye,
  MapPin,
  MessageCircle,
  Pencil,
  Play,
  QrCode,
  Send,
  Share2,
  Users,
} from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventCompletionChecklist } from "@/components/dashboard/EventCompletionChecklist";
import { MemoryModeCard } from "@/components/dashboard/MemoryModeCard";
import { ShareActions } from "@/components/share/ShareActions";
import { WhatsAppMessageGenerator } from "@/components/share/WhatsAppMessageGenerator";
import { DashboardMetricCard, FooterTrust, Section } from "@/components/shared";
import { eventUrl, sampleEvent } from "@/lib/mock-data";
import { loadPublishedEvents, type EventDraft } from "@/lib/event-draft";
import { formatEventDate, formatEventTime } from "@/lib/date-utils";

const actions = [
  { label: "Share Link", icon: Share2 },
  { label: "Download QR", icon: QrCode },
  { label: "Edit Event", icon: Pencil },
  { label: "Send Reminder", icon: Send },
];

export default function DashboardDetailPage() {
  const params = useParams<{ id: string }>();
  const [localEvent, setLocalEvent] = useState<EventDraft | null>(null);
  const eventTitle = localEvent?.title ?? sampleEvent.title;
  const eventDate = localEvent ? formatEventDate(localEvent.date) : sampleEvent.date;
  const eventTime = localEvent ? formatEventTime(localEvent.time) : sampleEvent.time;
  const eventLocation = localEvent ? `${localEvent.venueName}, ${localEvent.city}` : sampleEvent.location;

  useEffect(() => {
    setLocalEvent(loadPublishedEvents().find((event) => event.slug === params.id) ?? null);
  }, [params.id]);

  async function copyEventLink() {
    await navigator.clipboard.writeText(localEvent ? `https://jashnly.com/event/${localEvent.slug}` : eventUrl);
  }

  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="avatar" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted">Welcome back, Afsal Events</p>
        <Card className="mt-5 flex items-center gap-4 p-4">
          <img src={sampleEvent.coupleImage} alt="" className="h-24 w-28 rounded-xl object-cover" />
          <div className="flex-1">
            <h2 className="font-serif text-2xl font-bold text-primary">{eventTitle}</h2>
            <p className="mt-2 text-muted">{eventDate} - {eventTime}</p>
            <p className="text-muted">{eventLocation}</p>
          </div>
          <Badge>Live</Badge>
        </Card>

        <div className="mt-5">
          <EventCompletionChecklist />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          <DashboardMetricCard label="Total Views" value="12,842" icon={Eye} trend="+18.6%" />
          <DashboardMetricCard label="RSVPs" value="862" icon={Users} trend="+12.4%" />
          <DashboardMetricCard label="Pending" value="128" icon={Clock} trend="-4.7%" />
          <DashboardMetricCard label="Location Clicks" value="1,245" icon={MapPin} trend="+15.3%" />
          <DashboardMetricCard label="Watch Live" value="642" icon={Play} trend="+20.1%" />
          <DashboardMetricCard label="QR Scans" value="320" icon={QrCode} trend="+11.8%" />
        </div>

        <Card className="mt-5 p-5">
          <h2 className="font-serif text-2xl font-bold">Share tools</h2>
          <p className="mt-1 text-sm text-muted">Copy the event link, open the share screen, or prepare guest messages.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button onClick={copyEventLink} variant="outline"><Copy className="h-4 w-4" />Copy event link</Button>
            <Button asChild variant="outline"><Link href="/event/afsal-fathima/share"><Share2 className="h-4 w-4" />Open share page</Link></Button>
            <Button asChild variant="outline"><Link href="/event/afsal-fathima/share"><Download className="h-4 w-4" />Download QR</Link></Button>
            <Button asChild variant="soft"><Link href="/event/afsal-fathima/share"><MessageCircle className="h-4 w-4" />WhatsApp message</Link></Button>
          </div>
          <div className="mt-4">
            <ShareActions includeOpenSharePage />
          </div>
        </Card>

        <div className="mt-5">
          <WhatsAppMessageGenerator compact />
        </div>

        <div className="mt-5">
          <MemoryModeCard />
        </div>

        <Card className="mt-5 p-5">
          <h2 className="font-serif text-2xl font-bold">Views Over Time</h2>
          <div className="mt-4 h-44 rounded-2xl bg-gradient-to-t from-primary-soft to-white p-4">
            <div className="h-full rounded-xl border-b-2 border-l-2 border-primary/30" />
          </div>
        </Card>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <h2 className="font-serif text-2xl font-bold">Guest Breakdown</h2>
            <div className="mx-auto my-5 grid h-36 w-36 place-items-center rounded-full border-[22px] border-primary">
              <span className="text-center font-serif text-3xl">862<br /><small className="font-sans text-sm text-muted">Total</small></span>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-2xl font-bold">Guest List Preview</h2>
            {["Fahad Ameen", "Noora Fathima", "Rashid K", "Suhana"].map((name, i) => (
              <div key={name} className="flex items-center justify-between border-b border-border py-3 text-sm">
                <span>{name}</span>
                <Badge className={i === 2 ? "bg-orange-50 text-orange-600" : ""}>
                  {i === 3 ? "Not Responded" : i === 2 ? "Maybe" : "Going"}
                </Badge>
              </div>
            ))}
          </Card>
        </div>

        <Card className="mt-5 grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
          {actions.map(({ label, icon: Icon }) => (
            <Button key={label} variant="outline"><Icon className="h-4 w-4" />{label}</Button>
          ))}
        </Card>

        <Card className="mt-5 p-5">
          <h2 className="font-serif text-2xl font-bold">Recent Activity</h2>
          {["New view on your event", "Fahad Ameen RSVP'd Going", "QR Code scanned"].map((item) => (
            <p key={item} className="border-b border-border py-3 text-sm">
              {item}<span className="block text-muted">May 24, 2025 - 10:24 AM</span>
            </p>
          ))}
        </Card>
      </Section>
      <FooterTrust />
      <BottomNav />
    </main>
  );
}
