import type { EventType } from "@/lib/event-types";

export type OpeningAnimation = "petals" | "confetti" | "glow" | "minimal";

export const openingAnimations: { id: OpeningAnimation; name: string; description: string }[] = [
  { id: "petals", name: "Floating Petals", description: "Soft petals reveal the invitation." },
  { id: "confetti", name: "Celebration Pop", description: "Colorful confetti for joyful events." },
  { id: "glow", name: "Golden Glow", description: "A warm cinematic light reveal." },
  { id: "minimal", name: "Simple Fade", description: "A quiet, elegant entrance." },
];

export function getDefaultOpeningAnimation(eventType: EventType): OpeningAnimation {
  if (eventType === "birthday") return "confetti";
  if (["wedding", "engagement", "reception"].includes(eventType)) return "petals";
  if (eventType === "religious" || eventType === "naming") return "glow";
  return "minimal";
}
