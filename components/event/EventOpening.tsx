"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventDraft } from "@/lib/event-draft";
import { getThemeStyles } from "@/lib/themes";

export function EventOpening({ event, children }: { event: EventDraft; children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const theme = getThemeStyles(event.theme);
  const storageKey = `jashnly_intro_seen_${event.slug}`;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldShow = !reducedMotion && !window.sessionStorage.getItem(storageKey);
    setShow(shouldShow);
    setReady(true);
    if (!shouldShow) return;
    const timer = window.setTimeout(() => close(), 3200);
    return () => window.clearTimeout(timer);
  }, [storageKey]);

  function close() {
    window.sessionStorage.setItem(storageKey, "true");
    setShow(false);
  }

  if (!ready) return <main className="min-h-screen" style={{ backgroundColor: theme.background }} aria-busy="true" />;

  const animation = event.openingAnimation || "minimal";
  const particles = animation === "confetti" ? ["●", "◆", "▲", "●", "■", "◆", "▲", "●"] : ["❀", "✦", "❀", "✧", "❀", "✦"];

  return (
    <>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center overflow-hidden px-6 text-center"
            style={{ background: `radial-gradient(circle, ${theme.soft}, ${theme.background} 68%)` }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.65 }}
            data-testid="event-opening"
          >
            {(animation === "petals" || animation === "confetti") && particles.map((particle, index) => (
              <motion.span
                key={`${particle}-${index}`}
                className="absolute text-2xl"
                style={{ color: index % 2 ? theme.accent : theme.primary, left: `${8 + index * 13}%` }}
                initial={{ y: -80, rotate: 0, opacity: 0 }}
                animate={{ y: "110vh", rotate: 240 + index * 30, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5 + index * 0.12, delay: index * 0.08, ease: "linear" }}
              >
                {particle}
              </motion.span>
            ))}
            <motion.div
              initial={animation === "minimal" ? { opacity: 0 } : { opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: animation === "glow" ? 1.1 : 0.7 }}
              className="relative z-10 max-w-sm"
            >
              <motion.div
                className="mx-auto grid h-16 w-16 place-items-center rounded-full"
                style={{ backgroundColor: theme.soft, color: theme.primary }}
                animate={animation === "glow" ? { boxShadow: [`0 0 0 ${theme.accent}00`, `0 0 70px ${theme.accent}99`, `0 0 0 ${theme.accent}00`] } : undefined}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-8 w-8" />
              </motion.div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em]" style={{ color: theme.accent }}>You&apos;re invited</p>
              <h1 className="mt-3 font-serif text-4xl font-bold" style={{ color: theme.primary }}>{event.title}</h1>
              <p className="mt-3 text-sm text-muted">A celebration made to be remembered.</p>
              <Button onClick={close} variant="outline" className="mt-7 bg-white/75">Open invitation</Button>
            </motion.div>
            <button onClick={close} className="absolute right-5 top-5 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-muted">Skip</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
