"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, Menu, Play, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroEventTabs } from "@/components/landing/HeroEventTabs";
import { HeroImageCard } from "@/components/landing/HeroImageCard";
import { HeroOrbitCarousel } from "@/components/landing/HeroOrbitCarousel";
import { heroCategories } from "@/lib/hero-events";
import { playSoftTick } from "@/lib/sound";
import { useAuth } from "@/components/auth/AuthProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";

const SOUND_KEY = "jashnly_hero_sound_muted";

const trustPoints = [
  { label: "Secure & Private", icon: ShieldCheck },
  { label: "Mobile Optimized", icon: Smartphone },
  { label: "Quick to Share", icon: Clock3 },
];

export function RotatingEventHero() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const { user } = useAuth();
  const selected = heroCategories[selectedIndex];

  useEffect(() => {
    setMuted(window.localStorage.getItem(SOUND_KEY) === "true");
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setSelectedIndex((current) => (current + 1) % heroCategories.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [selectedIndex, paused]);

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
    <section
      className="relative overflow-x-hidden bg-background"
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <header className="mx-auto hidden max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 lg:grid lg:px-8">
        <BrandLogo className="w-[128px] shrink-0 xl:w-[144px]" imageClassName="h-10 xl:h-11" />
        <div className="hidden min-w-0 justify-center overflow-x-auto lg:flex" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <HeroEventTabs events={heroCategories} selectedIndex={selectedIndex} onSelect={rotateTo} />
        </div>
        <div className="ml-auto flex shrink-0 gap-2">
          {user ? (
            <Button className="h-10 px-4 text-sm" variant="outline" asChild size="sm"><Link href="/dashboard">{user.name || "Dashboard"}</Link></Button>
          ) : (
            <Button className="h-10 px-4 text-sm" variant="outline" asChild size="sm"><Link href="/login">Log in</Link></Button>
          )}
          <Button className="h-10 px-5 text-sm shadow-soft" asChild size="sm"><Link href={user ? "/categories" : "/register"}>{user ? "Create Event" : "Get Started"}</Link></Button>
        </div>
      </header>

      <div className="hidden mx-auto max-w-[1320px] gap-7 px-5 py-9 md:py-12 lg:-mt-3 lg:grid lg:min-h-[620px] lg:grid-cols-[42fr_58fr] lg:items-center lg:gap-6 lg:px-8 lg:pb-8 lg:pt-4 xl:gap-10">
        <div className="relative z-10 mx-auto max-w-[590px] lg:mx-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            <Sparkles className="h-4 w-4" /> Beautiful moments, perfectly invited
          </span>
          <h1 className="mt-5 max-w-[620px] font-serif text-5xl font-bold leading-[0.98] sm:text-6xl lg:text-[64px] xl:text-[72px]">
            One link for every <span className="text-primary">special</span> occasion
          </h1>
          <p className="mt-5 max-w-[520px] text-lg leading-8 text-muted">
            Create elegant event pages with invitations, RSVP, QR sharing, memories, and guest moments — all in one beautiful place.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="w-full px-6 sm:w-auto" asChild><Link href="/categories">Create Your Event<ArrowRight className="h-4 w-4" /></Link></Button>
            <Button className="w-full bg-transparent px-4 shadow-none sm:w-auto" asChild variant="ghost"><Link href="/categories">Explore Examples<ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs font-medium text-muted sm:gap-x-0">
            {trustPoints.map(({ label, icon: Icon }, index) => (
              <div key={label} className={`flex items-center gap-2 sm:px-4 ${index === 0 ? "sm:pl-0" : "sm:border-l sm:border-border"}`}>
                <Icon className="h-4 w-4 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[680px] min-w-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
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

      <div className="lg:hidden">
        <header className="flex items-center justify-between px-5 pb-2 pt-4">
          <BrandLogo className="w-[122px] shrink-0" imageClassName="h-9" ariaLabel="Home" />
          <div className="flex items-center gap-2">
            <Button className="h-10 px-4 text-sm" variant="outline" asChild size="sm">
              <Link href={user ? "/dashboard" : "/login"}>{user ? "Dashboard" : "Login"}</Link>
            </Button>
            <Button className="h-10 w-10 rounded-full p-0" variant="ghost" asChild size="icon">
              <Link href="/categories" aria-label="Open celebration categories"><Menu className="h-5 w-5" /></Link>
            </Button>
          </div>
        </header>

        <div className="mx-auto max-w-[460px] px-5 pb-8 pt-5">
          <span className="inline-flex h-9 items-center gap-2 rounded-full bg-primary-soft px-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            <Sparkles className="h-4 w-4" /> Celebrate beautifully
          </span>
          <h1 className="mt-4 font-serif text-[42px] font-bold leading-[1.01] min-[390px]:text-[46px]">
            <span className="block">One link for every</span>
            <span className="block"><span className="text-primary">special</span> occasion</span>
          </h1>
          <p className="mt-3 max-w-[410px] text-base leading-6 text-muted">
            Create beautiful event pages in minutes. Invitations, RSVP, memories &amp; more.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button className="h-[52px] px-2 text-[13px] min-[390px]:text-sm" asChild>
              <Link href="/categories">Create Your Event</Link>
            </Button>
            <Button className="h-[52px] px-2 text-[13px] min-[390px]:text-sm" variant="outline" asChild>
              <Link href="#how-it-works"><Play className="h-4 w-4" />See How It Works</Link>
            </Button>
          </div>

          <div className="mt-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroImageCard category={selected} fluid className="aspect-[7/9] w-full max-w-[420px] rounded-[1.5rem]" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3" onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
            <HeroEventTabs events={heroCategories} selectedIndex={selectedIndex} onSelect={rotateTo} compact />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] font-medium text-muted">
            {trustPoints.map(({ label, icon: Icon }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-primary" /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
