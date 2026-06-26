"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventMusic } from "@/lib/event-music";

export function EventMusicControl({ music, eventSlug }: { music?: EventMusic; eventSlug: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [missing, setMissing] = useState(false);
  const enabled = Boolean(music?.enabled && music.url && !missing);
  const preferenceKey = `occazn_music_${eventSlug}`;

  useEffect(() => {
    if (!enabled) return;
    const preference = window.sessionStorage.getItem(preferenceKey);
    if (preference === "dismissed") setDismissed(true);
    if (preference === "muted") {
      setMuted(true);
      setDismissed(true);
    }
  }, [enabled, preferenceKey]);

  async function playMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.muted = false;
      setMuted(false);
      await audio.play();
      setIsPlaying(true);
      setDismissed(true);
      window.sessionStorage.setItem(preferenceKey, "playing");
    } catch {
      setIsPlaying(false);
    }
  }

  function pauseMusic() {
    audioRef.current?.pause();
    setIsPlaying(false);
    window.sessionStorage.setItem(preferenceKey, "paused");
  }

  function declineMusic() {
    pauseMusic();
    setMuted(true);
    setDismissed(true);
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
      {!dismissed && (
        <div className="fixed bottom-24 right-4 z-40 w-[min(92vw,320px)] rounded-2xl border border-brand-light bg-white/95 p-4 shadow-soft backdrop-blur">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <Music2 className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-serif text-xl font-bold">Play celebration music?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={playMusic} size="sm"><Play className="h-4 w-4" />Play Music</Button>
                <Button onClick={declineMusic} size="sm" variant="outline">No thanks</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Button
        type="button"
        onClick={isPlaying ? pauseMusic : playMusic}
        className="fixed bottom-5 right-4 z-40 rounded-full bg-primary px-4 shadow-soft"
        aria-label={isPlaying ? "Pause music" : muted ? "Music muted" : "Play music"}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : muted ? <VolumeX className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {isPlaying ? "Music On" : "Music Off"}
      </Button>
    </>
  );
}
