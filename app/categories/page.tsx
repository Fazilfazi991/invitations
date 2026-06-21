"use client";

import { Suspense } from "react";
import { TemplateGallery } from "@/components/templates/TemplateGallery";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFDF9] px-4 py-10">
      <div className="mx-auto max-w-[1320px]">
        <header className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">START YOUR CELEBRATION ♡</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#2B171C] sm:text-5xl md:text-6xl">What are you planning?</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted sm:text-lg">Choose an event type and we&apos;ll shape the setup around your celebration.</p>
        </header>
        <div className="mt-10">
          <Suspense fallback={<div className="rounded-[2rem] border border-border bg-white p-5 text-muted shadow-card">Loading templates...</div>}>
            <TemplateGallery />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
