"use client";

import { useMemo, useState } from "react";
import { Copy, MessageCircle, RefreshCw, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { eventUrl, sampleEvent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tones = ["Family", "Friends", "Formal", "Malayalam", "Short"] as const;
type Tone = (typeof tones)[number];

function buildMessages(): Record<Tone, string> {
  return {
    Family: `Assalamu Alaikum dear family,

With happiness, we invite you to the wedding of ${sampleEvent.couple} on ${sampleEvent.date} at ${sampleEvent.time}.

All event details, location, RSVP and live link are available here:
${eventUrl}

Your presence and blessings mean a lot to us.`,
    Friends: `Big day is here!

${sampleEvent.couple} are getting married on ${sampleEvent.date} at ${sampleEvent.time}.

Check the event details, location and RSVP here:
${eventUrl}

Come celebrate with us!`,
    Formal: `You are cordially invited to the wedding ceremony of ${sampleEvent.couple}.

Date: ${sampleEvent.date}
Time: ${sampleEvent.time}
Venue: Calicut Convention Centre, Kerala

Please view the invitation, location and RSVP here:
${eventUrl}`,
    Malayalam: `പ്രിയപ്പെട്ടവരേ,

അഫ്സലിന്റെയും ഫാത്തിമയുടെയും വിവാഹ ചടങ്ങിലേക്ക് നിങ്ങളെ സ്നേഹപൂര്‍വ്വം ക്ഷണിക്കുന്നു.

തീയതി: ${sampleEvent.date}
സമയം: ${sampleEvent.time}
സ്ഥലം: Calicut Convention Centre, Kerala

ലൊക്കേഷന്‍, RSVP, live link എന്നിവ ഇവിടെ കാണാം:
${eventUrl}`,
    Short: `${sampleEvent.title}
${sampleEvent.date} - ${sampleEvent.time}
Location, RSVP & live link:
${eventUrl}`,
  };
}

export function WhatsAppMessageGenerator({ compact = false }: { compact?: boolean }) {
  const messages = useMemo(() => buildMessages(), []);
  const [tone, setTone] = useState<Tone>("Family");
  const [message, setMessage] = useState(messages.Family);
  const [copied, setCopied] = useState(false);

  function selectTone(nextTone: Tone) {
    setTone(nextTone);
    setMessage(messages[nextTone]);
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
          <p className="mt-1 text-sm leading-6 text-muted">
            Choose a style and copy a ready message for your guests.
          </p>
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
              tone === item ? "border-primary bg-primary text-white" : "border-border bg-white text-muted"
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className={cn(
          "mt-4 w-full rounded-2xl border border-border bg-white p-4 text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15",
          compact ? "min-h-44" : "min-h-64"
        )}
      />
      {copied && (
        <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600">
          Message copied
        </div>
      )}
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
