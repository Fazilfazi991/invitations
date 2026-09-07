"use client";

import { Copy, MessageCircle, Send, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { eventUrl, sampleEvent } from "@/lib/mock-data";

export function ShareActions({ includeOpenSharePage = false, title = sampleEvent.title, url = eventUrl, slug = "afsal-fathima" }: { includeOpenSharePage?: boolean; title?: string; url?: string; slug?: string }) {
  async function copyLink() {
    await navigator.clipboard.writeText(url);
  }

  async function shareEvent() {
    if (navigator.share) {
      await navigator.share({ title, text: "Join us for the celebration.", url });
      return;
    }
    await copyLink();
  }

  return (
    <div className="grid grid-cols-2 gap-3 max-[360px]:grid-cols-1 lg:grid-cols-3">
      <Button asChild className="h-12 justify-center text-center">
        <a href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`} target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" />WhatsApp
        </a>
      </Button>
      <Button variant="outline" onClick={shareEvent} className="h-12 justify-center text-center"><Share2 className="h-4 w-4" />More</Button>
      <Button variant="outline" onClick={copyLink} className="h-12 justify-center text-center"><Copy className="h-4 w-4" />Copy Link</Button>
      {includeOpenSharePage && (
        <Button asChild variant="soft" className="h-12 justify-center text-center lg:col-span-3">
          <Link href={`/event/${slug}/share`}><Send className="h-4 w-4" />Open share page</Link>
        </Button>
      )}
    </div>
  );
}
