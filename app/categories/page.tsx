"use client";

import { Suspense } from "react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Section } from "@/components/shared";
import { TemplateGallery } from "@/components/templates/TemplateGallery";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background pb-20">
      <div className="mx-auto w-full max-w-6xl">
        <MobileHeader action="settings" />
        <Section className="pt-4">
          <h1 className="font-serif text-5xl font-bold leading-tight">Choose your celebration template</h1>
          <p className="mt-3 max-w-2xl text-lg leading-7 text-muted">Pick a beautiful starting style. You can edit details, images, schedule and sharing later.</p>
          <div className="mt-6">
            <Suspense fallback={<div className="rounded-[2rem] border border-border bg-white p-5 text-muted shadow-card">Loading templates...</div>}>
              <TemplateGallery />
            </Suspense>
          </div>
        </Section>
      </div>
    </main>
  );
}
