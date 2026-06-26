import type { EventType } from "@/lib/event-types";

export type EventMusic = {
  enabled: boolean;
  trackId: string;
  url: string;
  autoplay: false;
};

export type MusicTrack = {
  id: string;
  label: string;
  eventLabel: string;
  url: string;
};

export const noMusicTrack: MusicTrack = {
  id: "none",
  label: "No music",
  eventLabel: "No music",
  url: "",
};

export const musicTracks: MusicTrack[] = [
  { id: "wedding-romantic", label: "Romantic instrumental", eventLabel: "Wedding", url: "/audio/wedding-romantic.wav" },
  { id: "birthday-cheerful", label: "Cheerful celebration", eventLabel: "Birthday", url: "/audio/birthday-cheerful.wav" },
  { id: "baby-shower-soft", label: "Soft lullaby piano", eventLabel: "Baby Shower", url: "/audio/baby-shower-soft.wav" },
  { id: "housewarming-cozy", label: "Cozy acoustic", eventLabel: "Housewarming", url: "/audio/housewarming-cozy.wav" },
  { id: "naming-gentle", label: "Gentle soft instrumental", eventLabel: "Naming Ceremony", url: "/audio/naming-gentle.wav" },
  { id: "baptism-peaceful", label: "Peaceful piano", eventLabel: "Baptism", url: "/audio/baptism-peaceful.wav" },
  { id: "holy-communion-soft", label: "Soft spiritual instrumental", eventLabel: "Holy Communion", url: "/audio/holy-communion-soft.wav" },
  { id: "engagement-romantic", label: "Elegant romantic", eventLabel: "Engagement", url: "/audio/engagement-romantic.wav" },
  { id: "anniversary-romantic", label: "Romantic soft piano", eventLabel: "Anniversary", url: "/audio/anniversary-romantic.wav" },
];

const defaultTrackByType: Record<EventType, string> = {
  wedding: "wedding-romantic",
  engagement: "engagement-romantic",
  birthday: "birthday-cheerful",
  housewarming: "housewarming-cozy",
  naming: "naming-gentle",
  religious: "baptism-peaceful",
  reception: "wedding-romantic",
  business: "housewarming-cozy",
  custom: "anniversary-romantic",
};

export function getMusicTrack(trackId?: string | null) {
  return musicTracks.find((track) => track.id === trackId) ?? noMusicTrack;
}

export function getDefaultMusicForType(eventType: EventType): EventMusic {
  const track = getMusicTrack(defaultTrackByType[eventType]);
  return {
    enabled: true,
    trackId: track.id,
    url: track.url,
    autoplay: false,
  };
}

export function normalizeMusic(value: Partial<EventMusic> | undefined, eventType: EventType): EventMusic {
  const fallback = getDefaultMusicForType(eventType);
  const track = getMusicTrack(value?.trackId || fallback.trackId);
  const enabled = value?.enabled ?? fallback.enabled;
  return {
    enabled: enabled && track.id !== "none",
    trackId: track.id,
    url: track.url,
    autoplay: false,
  };
}
