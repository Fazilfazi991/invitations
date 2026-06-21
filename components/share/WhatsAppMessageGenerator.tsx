"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, MessageCircle, RefreshCw, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { eventUrl, sampleEvent } from "@/lib/mock-data";
import { normalizeEventType, type EventType } from "@/lib/event-types";
import { cn } from "@/lib/utils";

const tones = ["Family", "Friends", "Formal", "Malayalam", "Short"] as const;
type Tone = (typeof tones)[number];

type MessageEvent = {
  title: string;
  date: string;
  time: string;
  venue: string;
  url: string;
  eventLabel: EventType;
};

export function getMalayalamEventLabel(eventType: EventType) {
  const labels: Record<EventType, string> = {
    wedding: "വിവാഹ ചടങ്ങിലേക്ക്",
    engagement: "നിശ്ചയ ചടങ്ങിലേക്ക്",
    birthday: "ജന്മദിന ആഘോഷത്തിലേക്ക്",
    housewarming: "ഗൃഹപ്രവേശന ചടങ്ങിലേക്ക്",
    naming: "നാമകരണ ചടങ്ങിലേക്ക്",
    religious: "പ്രത്യേക ചടങ്ങിലേക്ക്",
    reception: "റിസപ്ഷനിലേക്ക്",
    business: "ഉദ്ഘാടന ചടങ്ങിലേക്ക്",
    custom: "ചടങ്ങിലേക്ക്",
  };
  return labels[eventType];
}

export function getMalayalamClosing(eventType: EventType) {
  return ["wedding", "engagement", "naming", "religious", "reception"].includes(eventType)
    ? "നിങ്ങളുടെ സാന്നിധ്യവും അനുഗ്രഹങ്ങളും ഞങ്ങൾക്ക് ഏറെ വിലപ്പെട്ടതാണ്."
    : "നിങ്ങളുടെ സാന്നിധ്യം ഈ ആഘോഷത്തെ കൂടുതൽ മനോഹരമാക്കും.";
}

function buildMessages(event: MessageEvent): Record<Tone, string> {
  return {
    Family: `Assalamu Alaikum dear family,

With happiness, we invite you to ${event.title} on ${event.date} at ${event.time}.

All event details, location, RSVP and live link are available here:
${event.url}

Your presence and blessings mean a lot to us.`,
    Friends: `Big day is here!

Join us for ${event.title} on ${event.date} at ${event.time}.

Check the event details, location and RSVP here:
${event.url}

Come celebrate with us!`,
    Formal: `You are cordially invited to ${event.title}.

Date: ${event.date}
Time: ${event.time}
Venue: ${event.venue}

Please view the invitation, location and RSVP here:
${event.url}`,
    Malayalam: `പ്രിയപ്പെട്ടവരേ,

${event.title} എന്ന ${getMalayalamEventLabel(event.eventLabel)} നിങ്ങളെ സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.

തീയതി: ${event.date}
സമയം: ${event.time}
സ്ഥലം: ${event.venue}

ലൊക്കേഷൻ, RSVP, ലൈവ് ലിങ്ക് എന്നിവ ഇവിടെ കാണാം:
${event.url}

${getMalayalamClosing(event.eventLabel)}`,
    Short: `${event.title}
${event.date} - ${event.time}
Location, RSVP & live link:
${event.url}`,
  };
}

export function WhatsAppMessageGenerator({
  compact = false,
  event,
}: {
  compact?: boolean;
  event?: Partial<Omit<MessageEvent, "eventLabel">> & { eventLabel?: EventType | string };
}) {
  const messageEvent: MessageEvent = {
    title: event?.title || sampleEvent.title,
    date: event?.date || sampleEvent.date,
    time: event?.time || sampleEvent.time,
    venue: event?.venue || sampleEvent.location,
    url: event?.url || eventUrl,
    eventLabel: normalizeEventType(event?.eventLabel),
  };
  const messages = useMemo(
    () => buildMessages(messageEvent),
    [messageEvent.title, messageEvent.date, messageEvent.time, messageEvent.venue, messageEvent.url, messageEvent.eventLabel],
  );
  const [tone, setTone] = useState<Tone>("Family");
  const [message, setMessage] = useState(messages.Family);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMessage(messages[tone]);
  }, [messages, tone]);

  function selectTone(nextTone: Tone) {
    setTone(nextTone);
    setCopied(false);
  }

  async function copyMessage() {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft">
          <MessageCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold">WhatsApp message</h2>
          <p className="mt-1 text-sm leading-6 text-muted">Choose a style and copy a ready message for your guests.</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {tones.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => selectTone(item)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
              tone === item ? "border-primary bg-primary text-white" : "border-border bg-white text-muted",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <textarea
        aria-label="WhatsApp message text"
        value={message}
        onChange={(changeEvent) => setMessage(changeEvent.target.value)}
        className={cn(
          "mt-4 w-full rounded-2xl border border-border bg-white p-4 text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15",
          compact ? "min-h-44" : "min-h-64",
        )}
      />
      {copied && <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600">Message copied</div>}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Button onClick={copyMessage}><Copy className="h-4 w-4" />Copy message</Button>
        <Button onClick={shareWhatsApp} variant="outline"><Send className="h-4 w-4" />Share on WhatsApp</Button>
        <Button onClick={() => setMessage(messages[tone])} variant="soft"><RefreshCw className="h-4 w-4" />Regenerate</Button>
      </div>
      {!compact && (
        <p className="mt-4 flex items-center gap-2 text-xs text-muted">
          <Sparkles className="h-4 w-4 text-gold" /> Tip: personalize the first line before sending to family groups.
        </p>
      )}
    </Card>
  );
}
