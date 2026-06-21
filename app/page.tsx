"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotatingEventHero } from "@/components/landing/RotatingEventHero";
import { VendorMarketplaceTeaser } from "@/components/landing/VendorMarketplaceTeaser";
import { CategoryCard, FeaturePill, FooterTrust, Section } from "@/components/shared";
import { categories, featurePills } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden lg:[zoom:0.9]">
      <RotatingEventHero />
      <Section>
        <h2 className="font-serif text-3xl font-bold">For every kind of celebration</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">{categories.slice(0, 5).map((cat) => <CategoryCard key={cat.label} {...cat} href="/categories" />)}</div>
      </Section>
      <Section id="how-it-works">
        <h2 className="font-serif text-3xl font-bold">Everything you need, beautifully simple</h2>
        <div className="mt-5 flex flex-wrap gap-3">{featurePills.map((feature) => <FeaturePill key={feature.label} {...feature} />)}</div>
      </Section>
      <Section>
        <Card className="p-5">
          <h2 className="text-center font-serif text-3xl font-bold">How occazn works</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Create", "Customize", "Share", "Celebrate"].map((step, index) => (
              <div key={step} className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-bold text-white">{index + 1}</div>
                <h3 className="mt-3 font-semibold">{step}</h3>
                <p className="text-sm text-muted">{["Set up your event.", "Add details and style.", "Share your link.", "Collect RSVPs."][index]}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>
      <Section>
        <Card className="floral overflow-hidden p-6">
          <p className="text-sm font-bold uppercase text-primary">Live Preview</p>
          <h2 className="mt-2 font-serif text-3xl font-bold">See your event come to life</h2>
          <p className="mt-2 text-muted">Beautiful on any device. Easy for everyone.</p>
        </Card>
      </Section>
      <Section>
        <VendorMarketplaceTeaser />
      </Section>
      <Section>
        <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-serif text-3xl font-bold">Make every moment memorable</h2><p className="text-muted">Create your beautiful event link today.</p></div>
          <Button asChild><Link href="/categories">Create Your Event<ArrowRight className="h-4 w-4" /></Link></Button>
        </Card>
      </Section>
      <FooterTrust />
    </main>
  );
}
