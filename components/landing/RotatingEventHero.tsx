"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroEventTabs } from "@/components/landing/HeroEventTabs";
import { HeroFeatureCards } from "@/components/landing/HeroFeatureCards";
import { HeroOrbitCarousel } from "@/components/landing/HeroOrbitCarousel";
import { heroCategories } from "@/lib/hero-events";
import { playSoftTick } from "@/lib/sound";
import { getDemoUser, isDemoAuthenticated } from "@/lib/demo-auth";

const SOUND_KEY = "jashnly_hero_sound_muted";

export function RotatingEventHero() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [muted, setMuted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const selected = heroCategories[selectedIndex];

  useEffect(() => {
    setMuted(window.localStorage.getItem(SOUND_KEY) === "true");
    setAuthenticated(isDemoAuthenticated());
    setUserName(getDemoUser()?.name || "");
  }, []);

  function rotateTo(index: number, userAction = true) {
    setSelectedIndex((index + heroCategories.length) % heroCategories.length);
    if (userAction && !muted) playSoftTick();
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    window.localStorage.setItem(SOUND_KEY, String(next));
  }

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-background pb-6">
      <header className="mx-auto grid max-w-[1584px] grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-3 xl:gap-3 xl:px-6">
        <Link href="/" className="w-[145px] shrink-0 font-serif text-4xl font-bold text-primary xl:w-[170px]">
          Jashnly<span className="align-top text-lg text-gold">&hearts;</span>
        </Link>
        <div className="hidden min-w-0 overflow-x-auto md:flex md:justify-center">
          <HeroEventTabs events={heroCategories} selectedIndex={selectedIndex} onSelect={rotateTo} />
        </div>
        <div className="flex shrink-0 gap-1.5">
          {authenticated ? (
            <Button className="h-9 px-4 text-sm" variant="outline" asChild size="sm"><Link href="/dashboard">{userName || "Dashboard"}</Link></Button>
          ) : (
            <Button className="h-9 px-4 text-sm" variant="outline" asChild size="sm"><Link href="/login">Login</Link></Button>
          )}
          <Button className="h-9 px-4 text-sm" asChild size="sm"><Link href={authenticated ? "/categories" : "/register"}>{authenticated ? "Create Event" : "Get Started"}</Link></Button>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1584px] gap-5 px-4 py-6 lg:min-h-[calc(100vh-96px)] lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-5 xl:gap-7 xl:px-6">
        <div className="relative z-10 max-w-[560px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary shadow-card">
            <Sparkles className="h-4 w-4" /> Design once. Celebrate forever.
          </span>
          <h1 className="mt-5 font-serif text-5xl font-bold leading-[0.95] md:text-6xl xl:text-7xl">
            One Hero. <span className="text-primary">Endless</span> Celebrations.
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-7 text-muted">
            Switch any celebration type and watch the hero rotate to reveal your perfect event.
          </p>
          <p className="mt-3 text-base font-semibold text-primary">{selected.heroLine}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild><Link href="/categories">Create Your Event</Link></Button>
            <Button asChild variant="soft"><Link href="#how-it-works"><Play className="h-4 w-4" />See How It Works</Link></Button>
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted">
            <div className="flex -space-x-2">
              {["A", "D", "S", "+2K"].map((item) => (
                <span key={item} className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-primary-soft text-xs font-bold text-primary">{item}</span>
              ))}
            </div>
            Loved by thousands of hosts worldwide <Heart className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="min-w-0 md:hidden">
          <HeroEventTabs events={heroCategories} selectedIndex={selectedIndex} onSelect={rotateTo} compact />
        </div>
        <div className="relative mx-auto w-full max-w-[650px] min-w-0">
          <HeroOrbitCarousel
            events={heroCategories}
            selectedIndex={selectedIndex}
            muted={muted}
            onSelect={rotateTo}
            onPrevious={() => rotateTo(selectedIndex - 1)}
            onNext={() => rotateTo(selectedIndex + 1)}
            onToggleMute={toggleMute}
          />
        </div>
      </div>
      <HeroFeatureCards />
    </section>
  );
}
