"use client";

import Link from "next/link";
import { CalendarDays, Copy, ExternalLink, MessageCircle, Pencil, QrCode, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/date-utils";
import { getEventUrl } from "@/lib/event-url";
import type { OrganizerInvitation } from "@/lib/organizer-data";
import { getDefaultTemplateForType } from "@/lib/templates";

export function InvitationCard({ invitation }: { invitation: OrganizerInvitation }) {
  const { event, status } = invitation;
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const published = status === "published";
  const image = event.coverImage || event.templateImage || getDefaultTemplateForType("wedding").previewImage;
  const publicUrl = published ? getEventUrl(event.slug) : "";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopyError(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-[#E6D8EB]">
      <div className="grid sm:grid-cols-[10rem_1fr]">
        <img src={image} alt="" className="h-36 w-full object-cover sm:h-full" />
        <div className="min-w-0 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="break-words font-serif text-xl font-bold leading-tight text-[#2D1735] sm:text-2xl">{event.title}</h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted"><CalendarDays className="h-4 w-4 text-primary" />{formatEventDate(event.date)}</p>
            </div>
            <Badge className={published ? "bg-[#F1E7F4] text-primary" : "bg-amber-50 text-amber-800"}>{published ? "Published" : "Draft"}</Badge>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span>{event.templateName}</span>
            {published ? <span className="font-semibold text-[#4F3C55]">{invitation.responseCount ? `${invitation.responseCount} ${invitation.responseCount === 1 ? "response" : "responses"}` : "No responses yet"}</span> : null}
          </div>

          {published ? (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <Button asChild size="sm"><Link href={`/dashboard/${event.slug}/rsvps`}><Users className="h-4 w-4" />Manage RSVPs</Link></Button>
                <Button asChild size="sm" variant="outline"><Link href={`/i/${event.slug}`} target="_blank"><ExternalLink className="h-4 w-4" />View Invite</Link></Button>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-primary">
                <Link href={`/create-event?edit=${encodeURIComponent(event.slug)}`} className="inline-flex min-h-11 items-center gap-1.5 hover:underline"><Pencil className="h-4 w-4" />Edit</Link>
                <button type="button" onClick={copyLink} className="inline-flex min-h-11 items-center gap-1.5 hover:underline"><Copy className="h-4 w-4" />{copied ? "Copied" : "Copy link"}</button>
                <a href={`https://wa.me/?text=${encodeURIComponent(`${event.title}\n${publicUrl}`)}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 hover:underline"><MessageCircle className="h-4 w-4" />WhatsApp</a>
                <Link href={`/dashboard/${event.slug}`} className="inline-flex min-h-11 items-center gap-1.5 hover:underline"><QrCode className="h-4 w-4" />Share & QR</Link>
              </div>
              {copyError ? <p role="alert" className="text-sm text-rose-700">Couldn&apos;t copy the link. Open the invitation and copy it from your browser.</p> : null}
            </div>
          ) : (
            <Button asChild className="mt-4 w-full sm:w-auto" size="sm"><Link href="/create-event">Continue Editing</Link></Button>
          )}
        </div>
      </div>
    </article>
  );
}
