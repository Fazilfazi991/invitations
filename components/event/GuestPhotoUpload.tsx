"use client";

import { useRef, useState } from "react";
import { Camera, CheckCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loadGuestMemories, saveGuestMemory, type GuestMemory } from "@/lib/guest-memories";
import { getThemeStyles } from "@/lib/themes";
import type { EventTheme } from "@/lib/event-types";

export function GuestPhotoUpload({ slug, theme, onAdded }: { slug: string; theme?: EventTheme; onAdded?: (memory: GuestMemory) => void }) {
  const [guestName, setGuestName] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const colors = getThemeStyles(theme);

  function chooseFile(file?: File) {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please choose an image file.");
    if (file.size > 1_000_000) return setError("For this demo, choose an image smaller than 1 MB.");
    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result || ""));
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!guestName.trim() || !image) return setError("Add your name and choose a photo.");
    const memory: GuestMemory = {
      id: crypto.randomUUID(),
      guestName: guestName.trim(),
      caption: caption.trim(),
      image,
      createdAt: new Date().toISOString(),
    };
    try {
      saveGuestMemory(slug, memory);
    } catch {
      return setError("This browser has no room for another demo photo.");
    }
    onAdded?.(memory);
    setSuccess(true);
    setGuestName("");
    setCaption("");
    setImage("");
    setFileName("");
    window.setTimeout(() => setSuccess(false), 2400);
  }

  return (
    <Card className="overflow-hidden p-5" style={{ borderColor: colors.border, backgroundColor: colors.background }}>
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ backgroundColor: colors.soft, color: colors.primary }}><Camera className="h-5 w-5" /></span>
        <div><h2 className="font-serif text-2xl font-bold">Share a photo</h2><p className="mt-1 text-sm text-muted">Add a favorite moment to this browser-local guest album.</p></div>
      </div>
      <form onSubmit={submit} className="mt-5 space-y-3">
        <Input aria-label="Guest name" placeholder="Your name" value={guestName} onChange={(event) => setGuestName(event.target.value)} />
        <Input aria-label="Photo caption" placeholder="A short caption (optional)" value={caption} onChange={(event) => setCaption(event.target.value)} />
        <button type="button" onClick={() => fileRef.current?.click()} className="flex w-full items-center gap-3 rounded-2xl border border-dashed p-4 text-left" style={{ borderColor: colors.border }}>
          {image ? <img src={image} alt="" className="h-16 w-16 rounded-xl object-cover" /> : <Upload className="h-7 w-7" style={{ color: colors.primary }} />}
          <span className="text-sm font-semibold">{fileName || "Choose a guest photo"}</span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(event) => chooseFile(event.target.files?.[0])} />
        {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p>}
        {success && <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700"><CheckCircle className="h-4 w-4" />Photo added to the album.</p>}
        <Button className="w-full" type="submit" style={{ backgroundColor: colors.primary }}>Add to memories</Button>
      </form>
      <p className="mt-3 text-xs text-muted">{loadGuestMemories(slug).length}/8 demo guest photos saved in this browser.</p>
    </Card>
  );
}
