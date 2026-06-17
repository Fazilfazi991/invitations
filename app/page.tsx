"use client";

import Link from "next/link";
import { ArrowRight, Heart, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobileHeader } from "@/components/layout/mobile-header";
import { VendorMarketplaceTeaser } from "@/components/landing/VendorMarketplaceTeaser";
import { CategoryCard, FeaturePill, FooterTrust, GuestEventHero, Section } from "@/components/shared";
import { categories, featurePills } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="phone-shell min-h-screen">
      <MobileHeader />
      <Section className="grid gap-8 pt-8 md:grid-cols-[1fr_420px] md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-sm font-semibold text-primary">
            <Heart className="h-4 w-4" /> All your events. One beautiful link.
          </span>
          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight md:text-6xl">
            Create beautiful event pages in <span className="text-primary">minutes</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
            Weddings, birthdays, religious ceremonies, housewarmings and every special moment, beautifully shared in one link.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild><Link href="/categories">Create Your Event</Link></Button>
            <Button asChild variant="soft"><Link href="/event/afsal-fathima"><Play className="h-4 w-4" />View Demo</Link></Button>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted">
            <div className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
            Loved by 10K+ families
          </div>
        </div>
        <GuestEventHero />
      </Section>
      <Section>
        <h2 className="font-serif text-3xl font-bold">For every kind of celebration</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">{categories.slice(0, 5).map((cat) => <CategoryCard key={cat.label} {...cat} href="/categories" />)}</div>
      </Section>
      <Section>
        <h2 className="font-serif text-3xl font-bold">Everything you need, beautifully simple</h2>
        <div className="mt-5 flex flex-wrap gap-3">{featurePills.map((feature) => <FeaturePill key={feature.label} {...feature} />)}</div>
      </Section>
      <Section>
        <Card className="p-5">
          <h2 className="text-center font-serif text-3xl font-bold">How Jashnly works</h2>
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
