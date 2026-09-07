"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventMusic } from "@/lib/event-music";

export function EventMusicControl({ music, eventSlug }: { music?: EventMusic; eventSlug: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [decision, setDecision] = useState<"pending" | "made">("pending");
  const [missing, setMissing] = useState(false);
  const enabled = Boolean(music?.enabled && music.url && !missing);
  const preferenceKey = `occazn_music_${eventSlug}`;

  useEffect(() => {
    if (!enabled) return;
    const preference = window.sessionStorage.getItem(preferenceKey);
    if (preference) setDecision("made");
    if (preference === "muted" || preference === "paused") {
      setMuted(true);
    }
  }, [enabled, preferenceKey]);

  useEffect(() => () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  }, []);

  async function playMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.muted = false;
      setMuted(false);
      await audio.play();
      setIsPlaying(true);
      setDecision("made");
      window.sessionStorage.setItem(preferenceKey, "playing");
    } catch {
      setIsPlaying(false);
    }
  }

  function pauseMusic() {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.muted = true;
    }
    setMuted(true);
    setIsPlaying(false);
    window.sessionStorage.setItem(preferenceKey, "paused");
  }

  function declineMusic() {
    pauseMusic();
    setMuted(true);
    setDecision("made");
    window.sessionStorage.setItem(preferenceKey, "muted");
  }

  if (!music?.enabled || !music.url || missing) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={music.url}
        loop
        preload="none"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onError={() => setMissing(true)}
      />
      {decision === "pending" ? (
        <div className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 mx-auto w-[min(calc(100vw-2rem),340px)] rounded-2xl bg-[#2c2130] p-4 text-white shadow-[0_18px_55px_rgba(24,13,28,0.28)]">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <Music2 className="h-5 w-5 text-primary" />
            </span>
            <div className="min-w-0">
              <p className="font-serif text-xl font-bold">Play celebration music?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={playMusic} size="sm"><Play className="h-4 w-4" />Play Music</Button>
                <Button onClick={declineMusic} size="sm" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">Not now</Button>
              </div>
            </div>
          </div>
        </div>
      ) : <Button
        type="button"
        onClick={isPlaying ? pauseMusic : playMusic}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 h-11 rounded-full bg-[#2c2130] px-3 text-xs text-white shadow-[0_12px_36px_rgba(24,13,28,0.22)]"
        aria-label={isPlaying ? "Pause music" : muted ? "Music muted" : "Play music"}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : muted ? <VolumeX className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {isPlaying ? "Music On" : "Music Off"}
      </Button>}
    </>
  );
}
