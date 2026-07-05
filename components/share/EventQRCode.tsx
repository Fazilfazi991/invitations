"use client";

import { useState } from "react";
import { Copy, Download, ExternalLink, MessageCircle, Printer, QrCode, Share2, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { eventUrl, sampleEvent } from "@/lib/mock-data";
import type { EventTheme } from "@/lib/event-types";
import { getThemeStyles } from "@/lib/themes";

export function EventQRCode({ title = sampleEvent.title, date = sampleEvent.date, location = sampleEvent.location, url = eventUrl, slug = "afsal-fathima", theme: themeId, qrCodeData, published = true }: { title?: string; date?: string; location?: string; url?: string; slug?: string; theme?: EventTheme; qrCodeData?: string; published?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);
  const theme = getThemeStyles(themeId);
  const hasInviteUrl = Boolean(url);
  const qrValue = url;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function shareEvent() {
    if (navigator.share) {
      await navigator.share({
        title,
        text: "Open invitation, location and RSVP on occazn.",
        url,
      });
      return;
    }
    await copyLink();
  }

  function downloadQr() {
    const svg = document.getElementById("event-qr-code");
    if (!svg && !qrCodeData) return;
    const source = svg ? new XMLSerializer().serializeToString(svg) : qrCodeData || "";
    if (!source) return;
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `occazn-${slug}-qr.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!published || !hasInviteUrl) {
    return (
      <Card className="overflow-hidden p-5 text-center" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary-soft">
          <QrCode className="h-6 w-6 text-primary" />
        </div>
        <h2 className="mt-3 font-serif text-2xl font-bold">Event QR Code</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Public invite link is not ready yet. Save event to generate link.</p>
      </Card>
    );
  }

  return (
    <>
      <Card className="mx-auto max-w-[420px] overflow-hidden p-5 text-center" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary-soft">
          <QrCode className="h-6 w-6 text-primary" />
        </div>
        <h2 className="mt-3 font-serif text-2xl font-bold">Event QR Code</h2>
        <p className="mt-1 text-sm leading-6 text-muted">Guests can scan this to open the public wedding invitation.</p>
        <div className="mx-auto mt-5 aspect-square w-[min(280px,80vw)] max-w-full rounded-3xl border border-border bg-white p-5 shadow-card [&_svg]:block [&_svg]:h-auto [&_svg]:w-full">
          <QRCodeSVG id="event-qr-code" value={qrValue} size={240} fgColor={theme.primary} bgColor="#FFFFFF" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-bold" style={{ color: theme.primary }}>{title}</h3>
        <p className="text-sm text-muted">{date}</p>
        {copied && <p className="mt-3 text-sm font-semibold text-emerald-600">Link copied</p>}
        <div className="mt-5 grid grid-cols-2 gap-3 max-[360px]:grid-cols-1">
          <Button onClick={copyLink} variant="outline" className="h-12 justify-center text-center"><Copy className="h-4 w-4" />Copy Link</Button>
          <Button onClick={downloadQr} className="h-12 justify-center text-center"><Download className="h-4 w-4" />Download QR</Button>
          <Button asChild variant="outline" className="h-12 justify-center text-center">
            <a href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />WhatsApp
            </a>
          </Button>
          <Button onClick={shareEvent} variant="outline" className="h-12 justify-center text-center"><Share2 className="h-4 w-4" />Share</Button>
          <Button asChild variant="outline" className="h-12 justify-center text-center">
            <a href={url} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" />Open invite</a>
          </Button>
          <Button onClick={() => setPosterOpen(true)} variant="soft" className="h-12 justify-center text-center"><Printer className="h-4 w-4" />Print</Button>
        </div>
      </Card>
      {posterOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-foreground/30 p-3 sm:items-center sm:justify-center">
          <Card className="max-h-[92vh] w-full overflow-y-auto p-5 sm:max-w-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">QR poster preview</h2>
              <Button variant="ghost" size="icon" onClick={() => setPosterOpen(false)} aria-label="Close poster preview">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="rounded-3xl border p-6 text-center" style={{ borderColor: theme.border, background: `linear-gradient(135deg, ${theme.soft}, ${theme.background})` }}>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-violet">You're invited</p>
              <h3 className="mt-3 font-serif text-3xl font-bold" style={{ color: theme.primary }}>{title}</h3>
              <p className="mt-2 text-sm text-muted">{date} - {location}</p>
              <div className="mx-auto mt-5 w-[min(220px,72vw)] rounded-2xl bg-white p-4 [&_svg]:h-auto [&_svg]:w-full">
                <QRCodeSVG value={qrValue} size={190} fgColor={theme.primary} />
              </div>
              <p className="mt-4 text-sm font-semibold">Scan to view the wedding invitation, location and RSVP</p>
            </div>
            <Button onClick={downloadQr} className="mt-4 w-full"><Download className="h-4 w-4" />Download Poster</Button>
          </Card>
        </div>
      )}
    </>
  );
}
