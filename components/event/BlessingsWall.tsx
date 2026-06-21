"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlessingCard, type Blessing } from "@/components/event/BlessingCard";
import { BlessingForm } from "@/components/event/BlessingForm";
import { blessings as initialBlessings, sampleEvent } from "@/lib/mock-data";

export function BlessingsWall({ showForm = false, compact = false, eventTitle = sampleEvent.couple, slug = "afsal-fathima" }: { showForm?: boolean; compact?: boolean; eventTitle?: string; slug?: string }) {
  const [items, setItems] = useState<Blessing[]>(initialBlessings);
  const [formOpen, setFormOpen] = useState(showForm);
  const [success, setSuccess] = useState(false);

  function addBlessing(blessing: Blessing) {
    setItems((current) => [blessing, ...current]);
    setSuccess(true);
    setFormOpen(false);
    window.setTimeout(() => setSuccess(false), 1800);
  }

  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft">
          <Heart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold">Blessings & Wishes</h2>
          <p className="mt-1 text-sm leading-6 text-muted">Leave a little love for {eventTitle}.</p>
        </div>
      </div>
      {success && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600">Your blessing was added with love.</p>}
      {formOpen && (
        <div className="mt-5 rounded-2xl border border-border bg-primary-soft/30 p-4">
          <BlessingForm onSubmit={addBlessing} />
        </div>
      )}
      <div className="mt-5 space-y-3">
        {items.slice(0, compact ? 3 : items.length).map((blessing) => <BlessingCard key={blessing.id} blessing={blessing} />)}
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => setFormOpen((open) => !open)} className="flex-1">
          <PenLine className="h-4 w-4" />Write a blessing
        </Button>
        {compact && (
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/event/${slug}/blessings`}>View all wishes</Link>
          </Button>
        )}
      </div>
    </Card>
  );
}
