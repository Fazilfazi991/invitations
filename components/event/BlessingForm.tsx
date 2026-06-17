"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Blessing } from "@/components/event/BlessingCard";

const suggestions = [
  "Wishing you both a lifetime of happiness.",
  "May Allah bless your journey together.",
  "So happy for you both!",
];

export function BlessingForm({ onSubmit }: { onSubmit: (blessing: Blessing) => void }) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Name and blessing are required.");
      return;
    }
    onSubmit({
      id: crypto.randomUUID(),
      name: name.trim(),
      relation: relation.trim() || "Guest",
      message: message.trim(),
      createdAt: "Just now",
    });
    setName("");
    setRelation("");
    setMessage("");
    setError("");
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
      <Input value={relation} onChange={(event) => setRelation(event.target.value)} placeholder="Relation / who are you to them? (optional)" />
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="min-h-28 w-full rounded-xl border border-border bg-white p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
        placeholder="Write your blessing..."
      />
      <div className="flex gap-2 overflow-x-auto pb-1">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setMessage(suggestion)}
            className="shrink-0 rounded-full border border-border bg-primary-soft px-3 py-2 text-xs font-semibold text-primary"
          >
            {suggestion}
          </button>
        ))}
      </div>
      {error && <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">{error}</p>}
      <Button type="submit" className="w-full"><Heart className="h-4 w-4" />Send Blessing</Button>
    </form>
  );
}
