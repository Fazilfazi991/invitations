"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Phone } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlessingsWall } from "@/components/event/BlessingsWall";
import { EventCountdown } from "@/components/event/EventCountdown";
import { EventOpening } from "@/components/event/EventOpening";
import { MemoryModePreview } from "@/components/event/MemoryModePreview";
import { BirthdayTemplateRenderer } from "@/components/event/templates/birthday/BirthdayTemplateRenderer";
import { WeddingTemplateRenderer } from "@/components/event/templates/WeddingTemplateRenderer";
import { familyContacts, galleryImages, locations, sampleEvent, schedule } from "@/lib/mock-data";
import { FooterTrust, GuestEventHero, QRCodeCard, RSVPForm, Section, ShareCard, TimelineItem } from "@/components/shared";
import { getDefaultDraft, loadDraft, type EventDraft } from "@/lib/event-draft";
import { formatEventDate, formatEventTime } from "@/lib/date-utils";
import { getEventHeroLabel } from "@/lib/event-types";
import { getDefaultTemplateForType, getTemplateById } from "@/lib/templates";
import { getThemeStyles } from "@/lib/themes";
import { getEventUrl } from "@/lib/event-url";
import { loadPublicEvent } from "@/lib/event-repository";
import { useAuth } from "@/components/auth/AuthProvider";

export default function GuestEventPage() {
  const params = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [isMemoryMode, setIsMemoryMode] = useState(false);
  const [localEvent, setLocalEvent] = useState<EventDraft | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setIsMemoryMode(search.get("mode") === "memory");
    const previewDraft = search.get("preview") === "draft" && user ? loadDraft() : null;
    if (previewDraft) {
      setLocalEvent(previewDraft);
      setLoaded(true);
      return;
    }
    loadPublicEvent(params.slug).then((event) => {
      setLocalEvent(event);
      setLoaded(true);
    });
  }, [params.slug, user]);

  const eventTitle = localEvent?.title ?? sampleEvent.couple;
  const eventType = localEvent?.eventType ?? "wedding";
  const eventDate = localEvent?.date ?? "2025-05-24";
  const eventTime = localEvent?.time ?? "18:00";
  const venue = localEvent ? `${localEvent.venueName}, ${localEvent.city}` : sampleEvent.location;
  const eventSchedule = localEvent?.schedule.length
    ? localEvent.schedule.map((item) => ({
        title: item.title || "Event moment",
        time: `${formatEventTime(item.startTime)}${item.endTime ? ` - ${formatEventTime(item.endTime)}` : ""}`,
        venue: item.venue || localEvent.venueName,
        description: item.description,
        icon: schedule[0].icon,
      }))
    : schedule;
  const contacts = localEvent?.contacts.length ? localEvent.contacts.map((contact) => ({ name: contact.name, phone: contact.phone })) : familyContacts;
  const template = getTemplateById(localEvent?.templateId) ?? getDefaultTemplateForType(eventType);
  const savedTheme = getThemeStyles(localEvent?.theme);
  const visualStyle = localEvent ? savedTheme : { ...template.style, accent: template.style.secondary };
  const accentStyle = { "--template-primary": visualStyle.primary, "--template-secondary": visualStyle.accent } as CSSProperties;
  const fallbackEventType = params.slug.includes("birthday") ? "birthday" : "wedding";
  const renderedEvent: EventDraft = localEvent ?? {
    ...getDefaultDraft(fallbackEventType),
    slug: params.slug,
    ...(fallbackEventType === "birthday"
      ? {
          templateId: "pink-teddy-birthday",
          title: "Ava's 5th Birthday",
          primaryName: "Ava",
          childName: "Ava",
          birthdayPersonName: "Ava",
          age: "5",
          ageTurning: "5",
          venueName: "The Party Place",
          address: "Bangalore",
          city: "Bangalore",
        }
      : {
          templateId: "floral-wedding-elegance",
          title: sampleEvent.couple,
          primaryName: "Afsal",
          secondaryName: "Fathima",
          groomName: "Afsal",
          brideName: "Fathima",
          venueName: "Grand Seasons",
          address: "Kozhikode, Kerala",
          city: "Kozhikode, Kerala",
        }),
  };
  const isWeddingLike = ["wedding", "engagement", "reception"].includes(renderedEvent.eventType);
  const celebrationCopy = {
    housewarming: { heading: "Our New Beginning", description: `Join ${renderedEvent.primaryName || renderedEvent.hostName || "our family"} as we celebrate a new home filled with warmth, happiness and beautiful memories.` },
    naming: { heading: "A Beautiful Beginning", description: `Join us as we welcome ${renderedEvent.childName || "our little one"} and celebrate this cherished family moment.` },
    religious: { heading: "Together in Blessing", description: "We warmly invite you to join our family for this meaningful gathering and share your blessings." },
    business: { heading: "A New Chapter", description: `Celebrate the opening of ${renderedEvent.businessName || renderedEvent.title} with us. Your presence will make the occasion even more special.` },
    custom: { heading: "Our Celebration", description: "We would love for you to join us and make this special occasion one to remember." },
  }[renderedEvent.eventType as "housewarming" | "naming" | "religious" | "business" | "custom"];
  const heroImage = renderedEvent.coverImage || renderedEvent.templateImage || sampleEvent.coupleImage;
  const publicUrl = getEventUrl(renderedEvent.slug);

  if (!loaded) return <main className="phone-shell min-h-screen bg-background" aria-busy="true" />;

  if (!isMemoryMode && renderedEvent.eventType === "birthday") {
    return <EventOpening event={renderedEvent}><BirthdayTemplateRenderer event={renderedEvent} /></EventOpening>;
  }

  if (!isMemoryMode && isWeddingLike) {
    return <EventOpening event={renderedEvent}><WeddingTemplateRenderer event={renderedEvent} /></EventOpening>;
  }

  const page = (
    <main className="phone-shell min-h-screen pb-20" style={{ background: `linear-gradient(180deg, ${visualStyle.background}, #fffdf9 55%)`, ...accentStyle }}>
      <MobileHeader action="search" />
      <Section className="space-y-4 pt-3">
        {isMemoryMode ? (
          <MemoryModePreview event={renderedEvent} />
        ) : (
          <>
            {localEvent ? (
              <Card className="overflow-hidden p-5 text-center" style={{ background: `linear-gradient(135deg, ${visualStyle.background}, #fff)`, borderColor: localEvent ? savedTheme.border : template.style.secondary }}>
                <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: visualStyle.accent }}>{getEventHeroLabel(eventType)}</p>
                <h1 className="mt-2 font-serif text-5xl font-bold" style={{ color: visualStyle.primary }}>{eventTitle}</h1>
                <img src={heroImage} alt="" className="mx-auto mt-5 h-36 w-36 rounded-full border-4 border-white object-cover shadow-soft" />
                <div className="mt-5 space-y-2 text-sm">
                  <p>{formatEventDate(eventDate)} · {formatEventTime(eventTime)}</p>
                  <p>{venue}</p>
                </div>
                <EventCountdown date={eventDate} time={eventTime} />
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {localEvent.rsvpEnabled && <Button asChild size="sm" style={{ backgroundColor: visualStyle.primary }}><Link href={`/event/${localEvent.slug}/rsvp`}>RSVP</Link></Button>}
                  <Button asChild variant="outline" size="sm"><Link href={`/event/${localEvent.slug}/locations`}>Location</Link></Button>
                  {localEvent.youtubeLink && <Button asChild variant="outline" size="sm"><a href={localEvent.youtubeLink}>Live</a></Button>}
                </div>
              </Card>
            ) : (
              <GuestEventHero />
            )}
            <Card className="flex gap-4 p-5">
              <img src={heroImage} alt="" className="h-20 w-20 rounded-full object-cover" />
              <div>
                <h2 className="font-serif text-2xl font-bold">{celebrationCopy?.heading ?? "Our Celebration"} <span className="text-primary">♡</span></h2>
                <p className="text-sm leading-6 text-muted">{celebrationCopy?.description ?? "We are so excited to celebrate this special day with our loved ones."}</p>
              </div>
            </Card>
            <Card className="p-5">
              <h2 className="font-serif text-2xl font-bold">Event Schedule</h2>
              <div className="mt-4 grid gap-3">{eventSchedule.map((item) => <TimelineItem key={item.title} item={item} />)}</div>
            </Card>
            <Card className="p-5">
              <h2 className="font-serif text-2xl font-bold">Venue</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-semibold">{localEvent?.venueName ?? locations[1].address}</p>
                  <p className="text-sm text-muted">{venue}</p>
                  <Button asChild variant="outline" className="mt-4"><Link href={`/event/${renderedEvent.slug}/locations`}>Open in Maps</Link></Button>
                </div>
                <div className="map-bg grid h-32 place-items-center rounded-2xl"><span className="text-3xl text-primary">●</span></div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold">Gallery</h2>
                <Link href={`/event/${renderedEvent.slug}/gallery`} className="text-sm font-semibold text-primary">View All →</Link>
              </div>
              <div className="mt-4 flex gap-3 overflow-x-auto">{galleryImages.slice(0, 4).map((src) => <img key={src} src={src} alt="" className="h-24 w-32 shrink-0 rounded-xl object-cover" />)}</div>
            </Card>
            <BlessingsWall compact eventTitle={renderedEvent.title} slug={renderedEvent.slug} />
            <Card className="p-5">
              <h2 className="font-serif text-2xl font-bold">Family Contacts</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {contacts.slice(0, 2).map((contact) => (
                  <div key={contact.name} className="flex items-center justify-between rounded-xl bg-primary-soft p-4">
                    <div><p className="font-semibold">{contact.name}</p><p className="text-sm text-muted">{contact.phone}</p></div>
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                ))}
              </div>
            </Card>
            {(!localEvent || localEvent.rsvpEnabled) && <Card className="p-5">
              <h2 className="font-serif text-2xl font-bold">RSVP <span className="text-primary">♡</span></h2>
              <p className="mb-4 text-sm text-muted">Kindly respond before the celebration.</p>
              <RSVPForm />
            </Card>}
            <div className="grid gap-4 sm:grid-cols-2"><ShareCard title={renderedEvent.title} url={publicUrl} /><QRCodeCard /></div>
          </>
        )}
      </Section>
      <FooterTrust />
      <BottomNav type="guest" />
    </main>
  );
  return isMemoryMode ? page : <EventOpening event={renderedEvent}>{page}</EventOpening>;
}
