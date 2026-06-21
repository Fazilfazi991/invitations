"use client";

import { useEffect, useState } from "react";
import { getEventDateTime } from "@/lib/date-utils";

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
};

function calculate(date: string, time: string): CountdownState {
  const target = getEventDateTime(date, time);
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: false };
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    passed: false,
  };
}

export function EventCountdown({ date, time }: { date: string; time: string }) {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<CountdownState>(() => calculate(date, time));

  useEffect(() => {
    setMounted(true);
    setState(calculate(date, time));
    const timer = window.setInterval(() => setState(calculate(date, time)), 1000);
    return () => window.clearInterval(timer);
  }, [date, time]);

  if (!mounted) {
    return <div className="mt-5 rounded-2xl border border-border bg-white/70 p-4 text-sm text-muted">Loading countdown...</div>;
  }

  return (
    <div className="mt-5 rounded-2xl border border-border bg-white/75 p-3">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-violet">
        {state.passed ? "Memories are now live" : "Countdown to celebration"}
      </p>
      <div className="grid grid-cols-4 divide-x divide-border">
        {[
          ["Days", state.days],
          ["Hours", state.hours],
          ["Min", state.minutes],
          ["Sec", state.seconds],
        ].map(([label, value]) => (
          <div key={label} className="text-center">
            <b className="block text-lg text-primary">{String(value).padStart(2, "0")}</b>
            <span className="text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
