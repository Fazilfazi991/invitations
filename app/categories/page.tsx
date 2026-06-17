"use client";

import { MobileHeader } from "@/components/layout/mobile-header";
import { CategoryCard, Section, TemplateCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { categories, galleryImages, sampleEvent } from "@/lib/mock-data";
import { Search } from "lucide-react";

export default function CategoriesPage() {
  return (
    <main className="phone-shell min-h-screen pb-28">
      <MobileHeader action="settings" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">What are you planning? <span className="text-primary">♡</span></h1>
        <p className="mt-3 text-lg text-muted">Choose an event type to get started.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{categories.map((cat) => <CategoryCard key={cat.label} {...cat} />)}</div>
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
        <Button className="w-full">Continue</Button>
      </div>
    </main>
  );
}
