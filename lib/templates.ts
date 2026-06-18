import type { EventType, ThemeName } from "@/lib/event-types";

export type TemplateCategory =
  | "wedding"
  | "engagement"
  | "birthday"
  | "housewarming"
  | "naming"
  | "religious"
  | "reception"
  | "business"
  | "custom";

export type EventTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  previewImage: string;
  isPremium: boolean;
  style: {
    primary: string;
    secondary: string;
    background: string;
    headingFont?: string;
    mood: "romantic" | "cute" | "minimal" | "traditional" | "modern" | "spiritual" | "luxury";
  };
};

export const SELECTED_TEMPLATE_KEY = "jashnly_selected_template";

export const templates: EventTemplate[] = [
  {
    id: "floral-wedding",
    name: "Floral Wedding",
    category: "wedding",
    description: "Soft florals and rose details for a romantic wedding page.",
    previewImage: "/event-cards/wedding.webp",
    isPremium: false,
    style: { primary: "#D94F70", secondary: "#D6A84F", background: "#FFF7F4", mood: "romantic" },
  },
  {
    id: "royal-nikah",
    name: "Royal Nikah",
    category: "wedding",
    description: "Elegant gold accents with a graceful traditional mood.",
    previewImage: "/templates/royal-nikah.webp",
    isPremium: true,
    style: { primary: "#9F6B2F", secondary: "#D6A84F", background: "#FFF8EE", mood: "traditional" },
  },
  {
    id: "minimal-wedding",
    name: "Minimal Wedding",
    category: "wedding",
    description: "Clean ivory layout with simple rose typography.",
    previewImage: "/templates/minimal-wedding.webp",
    isPremium: false,
    style: { primary: "#C94B67", secondary: "#E9B8C2", background: "#FFFDF9", mood: "minimal" },
  },
  {
    id: "cute-birthday",
    name: "Cute Birthday",
    category: "birthday",
    description: "Playful pastel invite for sweet birthday celebrations.",
    previewImage: "/event-cards/birthday.webp",
    isPremium: false,
    style: { primary: "#8B5CF6", secondary: "#F9A8D4", background: "#FFF7FD", mood: "cute" },
  },
  {
    id: "pastel-birthday",
    name: "Pastel Birthday",
    category: "birthday",
    description: "Soft balloons, cheerful tones, and a gentle party feel.",
    previewImage: "/templates/pastel-birthday.webp",
    isPremium: true,
    style: { primary: "#EC6F8F", secondary: "#F7C7A9", background: "#FFF4F5", mood: "cute" },
  },
  {
    id: "warm-housewarming",
    name: "Warm Housewarming",
    category: "housewarming",
    description: "Warm home details for a new beginning with loved ones.",
    previewImage: "/event-cards/housewarming.webp",
    isPremium: false,
    style: { primary: "#C4852F", secondary: "#8FA56F", background: "#FFF8EA", mood: "traditional" },
  },
  {
    id: "naming-ceremony-soft",
    name: "Naming Ceremony Soft",
    category: "naming",
    description: "A soft, tender style for welcoming a little one.",
    previewImage: "/event-cards/naming-ceremony.webp",
    isPremium: false,
    style: { primary: "#2BAE9A", secondary: "#A7F3D0", background: "#F2FFFB", mood: "cute" },
  },
  {
    id: "baptism-grace",
    name: "Baptism Grace",
    category: "religious",
    description: "Light blue grace notes for sacred family moments.",
    previewImage: "/event-cards/baptism.webp",
    isPremium: true,
    style: { primary: "#4B8BC8", secondary: "#BFD7F1", background: "#F6FBFF", mood: "spiritual" },
  },
  {
    id: "holy-communion-classic",
    name: "Holy Communion Classic",
    category: "religious",
    description: "Classic gold and ivory styling for a spiritual celebration.",
    previewImage: "/event-cards/holy-communion.webp",
    isPremium: false,
    style: { primary: "#B98A2D", secondary: "#EFE0B8", background: "#FFFDF5", mood: "spiritual" },
  },
  {
    id: "business-opening-modern",
    name: "Business Opening Modern",
    category: "business",
    description: "Modern, polished styling for openings and launch events.",
    previewImage: "/templates/business-opening.webp",
    isPremium: true,
    style: { primary: "#334155", secondary: "#D94F70", background: "#F8FAFC", mood: "modern" },
  },
];

export function getTemplateById(id?: string | null) {
  return templates.find((template) => template.id === id) ?? null;
}

export function getDefaultTemplateForType(eventType: EventType) {
  return templates.find((template) => template.category === eventType) ?? templates[0];
}

export function templateCategoryToEventType(category: TemplateCategory): EventType {
  if (category === "engagement" || category === "reception") return category;
  if (category === "birthday" || category === "housewarming" || category === "naming" || category === "religious" || category === "business" || category === "custom") return category;
  return "wedding";
}

export function templateMoodToTheme(mood: EventTemplate["style"]["mood"]): ThemeName {
  if (mood === "spiritual" || mood === "traditional" || mood === "luxury") return "classic";
  if (mood === "modern") return "royal";
  if (mood === "minimal") return "sage";
  return "blush";
}
