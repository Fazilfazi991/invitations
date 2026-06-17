"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Section, TemplateCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { categories, galleryImages, sampleEvent } from "@/lib/mock-data";
import { EVENT_TYPE_KEY } from "@/lib/event-draft";
import { type EventType } from "@/lib/event-types";

const categoryType: Record<string, EventType> = {
  Wedding: "wedding",
  Engagement: "engagement",
  Birthday: "birthday",
  "Naming Ceremony": "naming",
  Housewarming: "housewarming",
  "Religious Event": "religious",
  Reception: "reception",
  "Other Events": "custom",
};

export default function CategoriesPage() {
  const router = useRouter();

  function selectType(label: string) {
    const type = categoryType[label] ?? "custom";
    window.localStorage.setItem(EVENT_TYPE_KEY, type);
    router.push(`/create/step-1?type=${type}`);
  }

  return (
    <main className="phone-shell min-h-screen pb-28">
      <MobileHeader action="settings" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">What are you planning? <span className="text-primary">♡</span></h1>
        <p className="mt-3 text-lg text-muted">Choose an event type to get started.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => selectType(label)}
              className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-white p-4 text-center shadow-card transition hover:border-primary"
            >
              <Icon className="h-8 w-8 text-primary" />
              <span className="text-sm font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </Section>
      <Section>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-card">
          <Search className="h-5 w-5 text-muted" /><span className="text-muted">Search templates...</span>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <TemplateCard title="Minimal Wedding" image={sampleEvent.coverImage} tags={["Minimal", "Elegant"]} />
          <TemplateCard title="Floral Nikah" image={galleryImages[0]} tags={["Floral", "Traditional"]} />
          <TemplateCard title="Modern Reception" image={galleryImages[3]} tags={["Modern", "Luxury"]} />
          <TemplateCard title="Cute Birthday" image={galleryImages[5]} tags={["Cute", "Pastel"]} />
        </div>
      </Section>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md rounded-t-3xl border border-border bg-white p-5 shadow-soft">
        <Button onClick={() => selectType("Wedding")} className="w-full">Continue</Button>
      </div>
    </main>
  );
}
