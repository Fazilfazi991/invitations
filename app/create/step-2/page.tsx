"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StepProgress } from "@/components/shared";
import { useEventDraft } from "@/hooks/use-event-draft";

export default function StepTwoPage() {
  const router = useRouter();
  const { draft, setDraft } = useEventDraft();
  const [error, setError] = useState("");

  function update(key: "venueName" | "address" | "city" | "mapLink", value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function continueNext() {
    if (!draft.venueName.trim() || !draft.address.trim() || !draft.city.trim()) {
      setError("Venue name, address and city are required.");
      return;
    }
    setError("");
    router.push("/create/step-3");
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      <div className="mx-auto w-full max-w-md px-5 py-6">
        <div className="mb-4 flex items-center justify-between">
          <Button asChild variant="ghost" size="icon"><Link href="/create/step-1">←</Link></Button>
          <h1 className="font-serif text-2xl font-bold">Location Details</h1>
          <Button onClick={continueNext} size="sm">Next</Button>
        </div>
        <StepProgress step={2} />
        <Card className="space-y-4 p-5">
          <h2 className="font-serif text-2xl font-bold"><MapPin className="mr-2 inline h-5 w-5 text-primary" />Add Locations</h2>
          <label className="block space-y-2 text-sm font-semibold"><span>Venue name</span><Input value={draft.venueName} onChange={(event) => update("venueName", event.target.value)} /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Address</span><Input value={draft.address} onChange={(event) => update("address", event.target.value)} /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>City</span><Input value={draft.city} onChange={(event) => update("city", event.target.value)} /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>Google Maps link</span><Input value={draft.mapLink} onChange={(event) => update("mapLink", event.target.value)} placeholder="https://maps.google.com/..." /></label>
          {error && <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">{error}</p>}
        </Card>
        <Card className="mt-5 p-5">
          <div className="map-bg grid h-36 place-items-center rounded-2xl"><MapPin className="h-12 w-12 text-primary" /></div>
          <h3 className="mt-4 font-serif text-xl font-bold">{draft.venueName || "Venue preview"}</h3>
          <p className="text-sm text-muted">{draft.address}{draft.city ? `, ${draft.city}` : ""}</p>
          {draft.mapLink && <Button asChild variant="outline" className="mt-4"><a href={draft.mapLink} target="_blank" rel="noreferrer">Open in Maps</a></Button>}
        </Card>
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md bg-white/90 p-5 backdrop-blur"><Button onClick={continueNext} className="w-full">Continue</Button></div>
    </main>
  );
}
