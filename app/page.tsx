"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EverythingSimpleSection } from "@/components/landing/EverythingSimpleSection";
import { LivePreviewShowcase } from "@/components/landing/LivePreviewShowcase";
import { RotatingEventHero } from "@/components/landing/RotatingEventHero";
import { WhyChooseOccazn } from "@/components/landing/WhyChooseOccazn";
import { GlobalFooter } from "@/components/layout/global-footer";
import { CategoryCard, Section } from "@/components/shared";
import { categories } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <RotatingEventHero />
      <Section>
        <h2 className="font-serif text-3xl font-bold">For every kind of celebration</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">{categories.slice(0, 5).map((cat) => <CategoryCard key={cat.label} {...cat} href="/categories" />)}</div>
      </Section>
      <Section>
        <EverythingSimpleSection />
      </Section>
      <Section>
        <LivePreviewShowcase />
      </Section>
      <Section>
        <WhyChooseOccazn />
      </Section>
      <Section>
        <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-serif text-3xl font-bold">Make every moment memorable</h2><p className="text-muted">Create your beautiful event link today.</p></div>
          <Button asChild><Link href="/create-event">Create Your Event<ArrowRight className="h-4 w-4" /></Link></Button>
        </Card>
      </Section>
      <GlobalFooter />
    </main>
  );
}
