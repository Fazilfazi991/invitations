"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, Menu, Play, Search, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
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

const navItems = ["Wedding", "Birthday", "Baptism", "Holy Communion", "Naming Ceremony", "Baby Shower", "Housewarming"];

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
    }, 3000);
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
      <div className="sticky top-0 z-40 hidden px-5 pt-5 lg:block lg:px-8">
        <header className="mx-auto grid max-w-[1320px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-[2rem] border border-brand-light/80 bg-white/90 px-7 py-5 shadow-[0_18px_60px_rgba(108,23,133,0.10)] backdrop-blur-xl xl:gap-6 xl:px-8">
          <BrandLogo className="w-[132px] shrink-0 xl:w-[158px]" imageClassName="h-11 xl:h-12" />
          <nav className="min-w-0" aria-label="Event types">
            <div className="mx-auto grid min-w-0 max-w-[820px] grid-cols-7 items-stretch rounded-[1.35rem] border border-brand-light/70 bg-white/75 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
              {navItems.map((item) => {
                const active = item === "Housewarming";
                return (
                  <Link
                    key={item}
                    href={`/categories?type=${encodeURIComponent(item.toLowerCase().replaceAll(" ", "-"))}`}
                    className={`relative flex min-w-0 items-center justify-center rounded-[1rem] px-2 py-3 text-center text-[12px] font-semibold leading-tight transition hover:bg-primary-soft hover:text-primary xl:px-3 xl:text-sm ${
                      active ? "bg-primary-soft text-primary shadow-[inset_0_1px_8px_rgba(108,23,133,0.08)]" : "text-[#4B5563]"
                    }`}
                  >
                    <span className="truncate">{item}</span>
                    {active && <span className="absolute -bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </div>
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-3">
            <Link href="/categories" className="grid h-11 w-11 place-items-center rounded-2xl border border-brand-light bg-white/90 text-[#4B5563] shadow-[0_10px_28px_rgba(108,23,133,0.06)] transition hover:-translate-y-0.5 hover:text-primary" aria-label="Search events">
              <Search className="h-5 w-5" />
            </Link>
            <Link href={user ? "/dashboard" : "/login"} className="inline-flex h-11 items-center rounded-2xl border border-brand-light bg-white px-6 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary-soft">
              {user ? "Dashboard" : "Log in"}
            </Link>
            <Link href="/create-event" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-brand-violet px-6 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(108,23,133,0.25)] transition hover:-translate-y-0.5">
              {user ? "Create Event" : "Get Started"}
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </header>
      </div>

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
            <Button className="w-full px-6 sm:w-auto" asChild><Link href="/create-event">Create Your Event<ArrowRight className="h-4 w-4" /></Link></Button>
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
        <header className="mx-4 mt-4 flex items-center justify-between rounded-[1.75rem] border border-brand-light/80 bg-white/90 px-4 py-3 shadow-[0_14px_40px_rgba(108,23,133,0.10)] backdrop-blur-xl">
          <BrandLogo className="w-[126px] shrink-0" imageClassName="h-10" ariaLabel="Home" />
          <div className="flex items-center gap-2">
            <Button className="h-10 px-4 text-sm shadow-soft" asChild size="sm">
              <Link href="/create-event">{user ? "Create" : "Get Started"}</Link>
            </Button>
            <Button className="h-10 w-10 rounded-full border border-brand-light bg-white p-0" variant="ghost" asChild size="icon">
              <Link href="/categories" aria-label="Open celebration categories"><Menu className="h-5 w-5" /></Link>
            </Button>
          </div>
        </header>
        <nav className="mx-4 mt-3 flex gap-2 overflow-x-auto rounded-2xl border border-brand-light/70 bg-white/75 p-2 text-sm font-semibold text-[#4B5563]" aria-label="Browse event categories">
          {navItems.map((item) => (
            <Link key={item} href={`/categories?type=${encodeURIComponent(item.toLowerCase().replaceAll(" ", "-"))}`} className={`shrink-0 rounded-xl px-3 py-2 ${item === "Housewarming" ? "bg-primary-soft text-primary" : ""}`}>
              {item}
            </Link>
          ))}
        </nav>

        <div className="mx-auto max-w-[460px] px-5 pb-8 pt-5">
          <h1 className="font-serif text-[clamp(31px,8.7vw,42px)] font-bold leading-[1.02]">
            <span className="block whitespace-nowrap">One link for every</span>
            <span className="block whitespace-nowrap"><span className="text-primary">special</span> occasion</span>
          </h1>
          <p className="mt-3 whitespace-nowrap text-[clamp(13px,3.6vw,15px)] leading-6 text-muted">
            Beautiful invitations, RSVPs and memories—all in one place.
          </p>
          <div className="mt-5 grid grid-cols-2 items-stretch gap-2.5">
            <Button className="h-12 w-full px-2 text-xs min-[390px]:text-[13px]" asChild>
              <Link href="/create-event">Create Your Event</Link>
            </Button>
            <Button className="h-12 w-full px-2 text-xs min-[390px]:text-[13px]" variant="outline" asChild>
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
                <HeroImageCard category={selected} fluid className="mx-auto aspect-[7/9] w-[90%] max-w-[378px] rounded-[1.5rem]" />
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
