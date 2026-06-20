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

export const weddingTemplates: EventTemplate[] = [
  {
    id: "floral-wedding-elegance",
    name: "Floral Wedding Elegance",
    category: "wedding",
    description: "A romantic floral wedding page with soft rose accents and graceful family sections.",
    previewImage: "/templates/previews/floral_wedding_elegance_preview.png",
    isPremium: false,
    style: { primary: "#D94F70", secondary: "#D6A84F", background: "#FFFDF9", mood: "romantic" },
  },
  {
    id: "royal-nikah-elegance",
    name: "Royal Nikah Elegance",
    category: "wedding",
    description: "A refined Nikah-inspired template with arches, lanterns, blush florals and soft gold details.",
    previewImage: "/templates/previews/royal_nikah_elegance_preview.png",
    isPremium: true,
    style: { primary: "#C24D6A", secondary: "#D6A84F", background: "#FFF9F1", mood: "traditional" },
  },
  {
    id: "minimal-editorial-wedding",
    name: "Minimal Editorial Wedding",
    category: "wedding",
    description: "A clean photo-led wedding page with elegant editorial typography and lots of whitespace.",
    previewImage: "/templates/previews/minimal_editorial_wedding_preview.png",
    isPremium: true,
    style: { primary: "#C24D6A", secondary: "#1F2937", background: "#FFFDF9", mood: "minimal" },
  },
  {
    id: "soft-traditional-wedding",
    name: "Soft Traditional Wedding",
    category: "wedding",
    description: "A sweet traditional wedding layout with pastel motifs, family contacts, blessings and WhatsApp sharing.",
    previewImage: "/templates/previews/soft_traditional_wedding_preview.png",
    isPremium: false,
    style: { primary: "#D94F70", secondary: "#E6B8A2", background: "#FFF7F6", mood: "traditional" },
  },
  {
    id: "contemporary-luxe-wedding",
    name: "Contemporary Luxe Wedding",
    category: "wedding",
    description: "A modern photo-forward wedding page with deep rose accents, RSVP insights and live stream blocks.",
    previewImage: "/templates/previews/contemporary_luxe_wedding_preview.png",
    isPremium: true,
    style: { primary: "#B93558", secondary: "#D6A84F", background: "#FFF8F8", mood: "luxury" },
  },
];

export const templates: EventTemplate[] = [
  ...weddingTemplates,
  {
    id: "cute-birthday",
    name: "Cute Birthday",
    category: "birthday",
    description: "Playful pastel invite for sweet birthday celebrations.",
    previewImage: "/templates/previews/cute_birthday_preview.png",
    isPremium: false,
    style: { primary: "#8B5CF6", secondary: "#F9A8D4", background: "#FFF7FD", mood: "cute" },
  },
  {
    id: "pastel-birthday",
    name: "Pastel Birthday",
    category: "birthday",
    description: "Soft balloons, cheerful tones, and a gentle party feel.",
    previewImage: "/templates/previews/pastel_birthday_preview.png",
    isPremium: true,
    style: { primary: "#EC6F8F", secondary: "#F7C7A9", background: "#FFF4F5", mood: "cute" },
  },
  {
    id: "warm-housewarming",
    name: "Warm Housewarming",
    category: "housewarming",
    description: "Warm home details for a new beginning with loved ones.",
    previewImage: "/templates/previews/warm_housewarming_preview.png",
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
