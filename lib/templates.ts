import type { EventType, ThemeName } from "@/lib/event-types";

export type TemplateCategory =
  | "wedding"
  | "engagement"
  | "birthday"
  | "anniversary"
  | "baby-shower"
  | "housewarming"
  | "corporate"
  | "graduation"
  | "farewell"
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
    mood: "romantic" | "cute" | "minimal" | "traditional" | "modern" | "spiritual" | "luxury" | "princess" | "playful" | "adventure";
  };
};

export const SELECTED_TEMPLATE_KEY = "jashnly_selected_template";

export const weddingTemplates: EventTemplate[] = [
  {
    id: "floral-wedding-elegance",
    name: "Classic Floral Wedding",
    category: "wedding",
    description: "An ivory floral wedding template with soft blush corners, elegant serif type, countdown, story, gallery, RSVP and location sections.",
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
    name: "Luxury Minimal Wedding",
    category: "wedding",
    description: "A premium editorial wedding template with generous white space, charcoal typography, thin dividers and restrained lavender accents.",
    previewImage: "/templates/previews/minimal_editorial_wedding_preview.png",
    isPremium: true,
    style: { primary: "#C24D6A", secondary: "#1F2937", background: "#FFFDF9", mood: "minimal" },
  },
  {
    id: "soft-traditional-wedding",
    name: "Pastel Garden Wedding",
    category: "wedding",
    description: "A light garden wedding template with pastel lavender and pink styling, rounded cards, gentle florals, schedule, RSVP and gallery.",
    previewImage: "/templates/previews/soft_traditional_wedding_preview.png",
    isPremium: false,
    style: { primary: "#D94F70", secondary: "#E6B8A2", background: "#FFF7F6", mood: "traditional" },
  },
  {
    id: "contemporary-luxe-wedding",
    name: "Modern Photo Wedding",
    category: "wedding",
    description: "A modern photo-forward wedding template with a large couple image hero, story-first flow, gallery, countdown, RSVP and location.",
    previewImage: "/templates/previews/contemporary_luxe_wedding_preview.png",
    isPremium: true,
    style: { primary: "#B93558", secondary: "#D6A84F", background: "#FFF8F8", mood: "luxury" },
  },
];

export const weddingTemplateMetadataRegistry = Object.fromEntries(
  weddingTemplates.map((template) => [template.id, template]),
) as Record<(typeof weddingTemplates)[number]["id"], EventTemplate>;

export const birthdayTemplates: EventTemplate[] = [
  {
    id: "pink-teddy-birthday",
    name: "Pink Teddy Birthday",
    category: "birthday",
    description: "A soft pink birthday page with teddy bears, florals, balloons and sweet party details.",
    previewImage: "/templates/previews/birthday/pink-teddy-birthday-preview.png",
    isPremium: false,
    style: { primary: "#E63F76", secondary: "#F7B6C8", background: "#FFF7FA", mood: "cute" },
  },
  {
    id: "blue-sky-birthday",
    name: "Blue Sky Birthday",
    category: "birthday",
    description: "A dreamy blue birthday template with clouds, stars, balloons and a light playful mood.",
    previewImage: "/templates/previews/birthday/blue-sky-birthday-preview.png",
    isPremium: false,
    style: { primary: "#2563EB", secondary: "#F8C7DD", background: "#F1F8FF", mood: "cute" },
  },
  {
    id: "floral-princess-birthday",
    name: "Floral Princess Birthday",
    category: "birthday",
    description: "A graceful princess-style birthday page with purple florals, soft pinks and elegant party sections.",
    previewImage: "/templates/previews/birthday/floral-princess-birthday-preview.png",
    isPremium: true,
    style: { primary: "#A855F7", secondary: "#E85D9E", background: "#FFF9FC", mood: "princess" },
  },
  {
    id: "black-gold-luxe-birthday",
    name: "Black Gold Luxe Birthday",
    category: "birthday",
    description: "A premium black and gold birthday page for stylish milestone celebrations.",
    previewImage: "/templates/previews/birthday/black-gold-luxe-birthday-preview.png",
    isPremium: true,
    style: { primary: "#D6A84F", secondary: "#111827", background: "#090909", mood: "luxury" },
  },
  {
    id: "candyland-birthday",
    name: "Candyland Birthday",
    category: "birthday",
    description: "A playful candy-themed birthday page with sweets, pastel balloons, cake and colorful details.",
    previewImage: "/templates/previews/birthday/candyland-birthday-preview.png",
    isPremium: false,
    style: { primary: "#E83E8C", secondary: "#F9A8D4", background: "#FFF5FB", mood: "playful" },
  },
  {
    id: "dino-adventure-birthday",
    name: "Dino Adventure Birthday",
    category: "birthday",
    description: "A jungle dinosaur birthday page with green adventure styling, playful icons and kid-friendly sections.",
    previewImage: "/templates/previews/birthday/dino-adventure-birthday-preview.png",
    isPremium: true,
    style: { primary: "#2F6B24", secondary: "#A3B18A", background: "#FFFBEA", mood: "adventure" },
  },
];

const occasionTemplates: EventTemplate[] = [
  {
    id: "engagement-couple-story",
    name: "Couple Story",
    category: "engagement",
    description: "A romantic engagement template for ring ceremonies, couple stories and elegant family gatherings.",
    previewImage: "/templates/previews/floral_wedding_elegance_preview.png",
    isPremium: false,
    style: { primary: "#6C1785", secondary: "#D0B8D8", background: "#FFF7FC", mood: "romantic" },
  },
  {
    id: "engagement-royal-rings",
    name: "Royal Engagement",
    category: "engagement",
    description: "A premium purple and gold engagement design with ceremonial details and a polished timeline.",
    previewImage: "/templates/previews/royal_nikah_elegance_preview.png",
    isPremium: true,
    style: { primary: "#500D68", secondary: "#D6A84F", background: "#FFF9F1", mood: "luxury" },
  },
  {
    id: "anniversary-elegant-milestone",
    name: "Elegant Anniversary",
    category: "anniversary",
    description: "A warm milestone celebration template with refined typography, memories, RSVP and sharing sections.",
    previewImage: "/templates/previews/minimal_editorial_wedding_preview.png",
    isPremium: false,
    style: { primary: "#7B3892", secondary: "#D0B8D8", background: "#FDFBFE", mood: "modern" },
  },
  {
    id: "baby-shower-pastel-cloud",
    name: "Pastel Baby Shower",
    category: "baby-shower",
    description: "A soft pastel baby shower design with cloud-like sections, family details and sweet event moments.",
    previewImage: "/event-cards/baby-shower.webp",
    isPremium: false,
    style: { primary: "#A855F7", secondary: "#F7B6C8", background: "#FFF9FC", mood: "cute" },
  },
  {
    id: "baby-shower-floral-soft",
    name: "Floral Baby Shower",
    category: "baby-shower",
    description: "A gentle floral baby shower template with tender copy, gallery, location and RSVP blocks.",
    previewImage: "/event-cards/baby-shower.webp",
    isPremium: true,
    style: { primary: "#8A3A88", secondary: "#E9B8D5", background: "#FFF7FA", mood: "romantic" },
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
    id: "housewarming-minimal-home",
    name: "Minimal Home",
    category: "housewarming",
    description: "A clean housewarming invite with calm spaces, location details and an elegant welcome message.",
    previewImage: "/templates/previews/warm_housewarming_preview.png",
    isPremium: false,
    style: { primary: "#6C1785", secondary: "#D0B8D8", background: "#FDFBFE", mood: "minimal" },
  },
  {
    id: "corporate-modern-agenda",
    name: "Corporate Agenda",
    category: "corporate",
    description: "A polished business event template with agenda, venue, speakers and professional sharing sections.",
    previewImage: "/templates/business-opening.webp",
    isPremium: false,
    style: { primary: "#334155", secondary: "#A477B4", background: "#F8FAFC", mood: "modern" },
  },
  {
    id: "graduation-proud-moment",
    name: "Proud Graduation",
    category: "graduation",
    description: "A celebratory graduation template with achievement-focused copy, timeline and guest sharing.",
    previewImage: "/event-cards/wedding.webp",
    isPremium: false,
    style: { primary: "#6C1785", secondary: "#D6A84F", background: "#FFFDF9", mood: "traditional" },
  },
  {
    id: "farewell-warm-wishes",
    name: "Warm Farewell",
    category: "farewell",
    description: "A heartfelt farewell design with memories, schedule, venue and one-tap WhatsApp sharing.",
    previewImage: "/event-cards/housewarming.webp",
    isPremium: false,
    style: { primary: "#7B3892", secondary: "#D0B8D8", background: "#F6F0F8", mood: "modern" },
  },
  {
    id: "custom-modern-invite",
    name: "Modern Invite",
    category: "custom",
    description: "A flexible modern invitation for custom celebrations, community events and family gatherings.",
    previewImage: "/templates/previews/minimal_editorial_wedding_preview.png",
    isPremium: false,
    style: { primary: "#6C1785", secondary: "#D0B8D8", background: "#FDFBFE", mood: "modern" },
  },
  {
    id: "custom-premium-dark",
    name: "Premium Dark Invite",
    category: "custom",
    description: "A dramatic dark premium template for stylish celebrations and special announcements.",
    previewImage: "/templates/previews/contemporary_luxe_wedding_preview.png",
    isPremium: true,
    style: { primary: "#D0B8D8", secondary: "#7B3892", background: "#15051F", mood: "luxury" },
  },
];

export const templates: EventTemplate[] = [
  ...weddingTemplates,
  ...birthdayTemplates,
  ...occasionTemplates,
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
  return templates.find((template) => template.category === eventType)
    ?? templates.find((template) => template.category === "custom")
    ?? templates[0];
}

export function templateCategoryToEventType(category: TemplateCategory): EventType {
  if (category === "engagement" || category === "reception") return category;
  if (category === "birthday" || category === "anniversary" || category === "baby-shower" || category === "housewarming" || category === "corporate" || category === "graduation" || category === "farewell" || category === "naming" || category === "religious" || category === "business" || category === "custom") return category;
  return "wedding";
}

export function templateMoodToTheme(mood: EventTemplate["style"]["mood"]): ThemeName {
  if (mood === "spiritual" || mood === "traditional" || mood === "luxury") return "classic";
  if (mood === "modern") return "royal";
  if (mood === "minimal" || mood === "adventure") return "sage";
  if (mood === "princess" || mood === "playful") return "royal";
  return "blush";
}
