"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Link as LinkIcon, Plus, QrCode, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StepProgress } from "@/components/shared";
import { useEventDraft } from "@/hooks/use-event-draft";

export default function StepThreePage() {
  const router = useRouter();
  const { draft, setDraft } = useEventDraft();
  const [error, setError] = useState("");

  function continueNext() {
    if (draft.youtubeLink && !draft.youtubeLink.startsWith("http")) {
      setError("YouTube link should start with http.");
      return;
    }
    setError("");
    router.push("/create/step-4");
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      <div className="mx-auto w-full max-w-md px-5 py-6">
        <div className="mb-4 flex items-center justify-between">
          <Button asChild variant="ghost" size="icon"><Link href="/create/step-2">←</Link></Button>
          <h1 className="font-serif text-2xl font-bold">Media & Schedule</h1>
          <Button onClick={continueNext} size="sm">Next</Button>
        </div>
        <StepProgress step={3} />
        <div className="space-y-5">
          <Card className="space-y-3 p-5">
            <h2 className="font-serif text-2xl font-bold"><ImagePlus className="mr-2 inline h-5 w-5 text-primary" />Invitation card</h2>
            <label className="block rounded-2xl border border-dashed border-border p-4 text-sm font-semibold">
              {draft.invitationCard || "Select invitation card file"}
              <input type="file" className="hidden" onChange={(event) => setDraft((current) => ({ ...current, invitationCard: event.target.files?.[0]?.name || "" }))} />
            </label>
          </Card>
          <Card className="space-y-3 p-5">
            <h2 className="font-serif text-2xl font-bold"><LinkIcon className="mr-2 inline h-5 w-5 text-primary" />YouTube Live Link</h2>
            <Input value={draft.youtubeLink} onChange={(event) => setDraft((current) => ({ ...current, youtubeLink: event.target.value }))} placeholder="https://youtube.com/live/sample" />
            {error && <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">{error}</p>}
          </Card>
          <Card className="space-y-3 p-5">
            <div className="flex items-center justify-between"><h2 className="font-serif text-2xl font-bold">Event Schedule</h2><Button variant="ghost" size="sm" onClick={() => setDraft((current) => ({ ...current, schedule: [...current.schedule, { id: crypto.randomUUID(), title: "", startTime: "", venue: "" }] }))}><Plus className="h-4 w-4" />Add</Button></div>
            {draft.schedule.map((item, index) => (
              <div key={item.id} className="space-y-2 rounded-2xl border border-border p-3">
                <Input value={item.title} onChange={(event) => setDraft((current) => ({ ...current, schedule: current.schedule.map((entry, i) => i === index ? { ...entry, title: event.target.value } : entry) }))} placeholder="Schedule title" />
                <div className="grid grid-cols-2 gap-2"><Input type="time" value={item.startTime} onChange={(event) => setDraft((current) => ({ ...current, schedule: current.schedule.map((entry, i) => i === index ? { ...entry, startTime: event.target.value } : entry) }))} /><Input type="time" value={item.endTime || ""} onChange={(event) => setDraft((current) => ({ ...current, schedule: current.schedule.map((entry, i) => i === index ? { ...entry, endTime: event.target.value } : entry) }))} /></div>
                <Input value={item.venue || ""} onChange={(event) => setDraft((current) => ({ ...current, schedule: current.schedule.map((entry, i) => i === index ? { ...entry, venue: event.target.value } : entry) }))} placeholder="Venue optional" />
                <Input value={item.description || ""} onChange={(event) => setDraft((current) => ({ ...current, schedule: current.schedule.map((entry, i) => i === index ? { ...entry, description: event.target.value } : entry) }))} placeholder="Description optional" />
                <Button variant="outline" size="sm" onClick={() => setDraft((current) => ({ ...current, schedule: current.schedule.filter((entry) => entry.id !== item.id) }))}><Trash2 className="h-4 w-4" />Remove</Button>
              </div>
            ))}
          </Card>
          <Card className="space-y-3 p-5">
            <h2 className="font-serif text-2xl font-bold">Gallery</h2>
            <label className="block rounded-2xl border border-dashed border-border p-4 text-sm font-semibold">
              {draft.gallery.length ? `${draft.gallery.length} files selected` : "Select gallery images"}
              <input type="file" multiple className="hidden" onChange={(event) => setDraft((current) => ({ ...current, gallery: Array.from(event.target.files || []).map((file) => file.name) }))} />
            </label>
            <div className="flex flex-wrap gap-2">{draft.gallery.map((file) => <span key={file} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">{file}</span>)}</div>
          </Card>
          <Card className="space-y-3 p-5">
            {[
              ["rsvpEnabled", "Enable RSVP", Users],
              ["familyContactsEnabled", "Enable family contacts", Users],
              ["qrEnabled", "Enable QR code", QrCode],
            ].map(([key, label, Icon]) => (
              <label key={key as string} className="flex items-center justify-between rounded-xl border border-border p-3 text-sm font-semibold">
                <span><Icon className="mr-2 inline h-4 w-4 text-primary" />{label as string}</span>
                <input type="checkbox" checked={Boolean(draft[key as "rsvpEnabled"])} onChange={(event) => setDraft((current) => ({ ...current, [key as string]: event.target.checked }))} />
              </label>
            ))}
            {draft.familyContactsEnabled && (
              <div className="space-y-3">
                <Button variant="ghost" size="sm" onClick={() => setDraft((current) => ({ ...current, contacts: [...current.contacts, { id: crypto.randomUUID(), name: "", role: "", phone: "" }] }))}><Plus className="h-4 w-4" />Add contact</Button>
                {draft.contacts.map((contact, index) => (
                  <div key={contact.id} className="space-y-2 rounded-2xl border border-border p-3">
                    <Input value={contact.name} onChange={(event) => setDraft((current) => ({ ...current, contacts: current.contacts.map((entry, i) => i === index ? { ...entry, name: event.target.value } : entry) }))} placeholder="Name" />
                    <Input value={contact.role} onChange={(event) => setDraft((current) => ({ ...current, contacts: current.contacts.map((entry, i) => i === index ? { ...entry, role: event.target.value } : entry) }))} placeholder="Role" />
                    <Input value={contact.phone} onChange={(event) => setDraft((current) => ({ ...current, contacts: current.contacts.map((entry, i) => i === index ? { ...entry, phone: event.target.value } : entry) }))} placeholder="Phone" />
                    <Button variant="outline" size="sm" onClick={() => setDraft((current) => ({ ...current, contacts: current.contacts.filter((entry) => entry.id !== contact.id) }))}><Trash2 className="h-4 w-4" />Remove</Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md bg-white/90 p-5 backdrop-blur"><Button onClick={continueNext} className="w-full">Save & Continue</Button></div>
    </main>
  );
}
