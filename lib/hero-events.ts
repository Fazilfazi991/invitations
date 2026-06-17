export type HeroAccent = "rose" | "purple" | "blue" | "gold" | "green" | "sky" | "amber";

export type HeroCategory = {
  id: string;
  label: string;
  icon: string;
  accent: HeroAccent;
  heroLine: string;
  image: string;
};

export const heroCategories: HeroCategory[] = [
  {
    id: "wedding",
    label: "Wedding",
    icon: "heart",
    accent: "rose",
    heroLine: "A romantic invitation for your special day.",
    image: "/event-cards/wedding.webp",
  },
  {
    id: "birthday",
    label: "Birthday",
    icon: "cake",
    accent: "purple",
    heroLine: "A joyful birthday page full of smiles.",
    image: "/event-cards/birthday.webp",
  },
  {
    id: "baptism",
    label: "Baptism",
    icon: "cross",
    accent: "blue",
    heroLine: "A graceful page for sacred moments.",
    image: "/event-cards/baptism.webp",
  },
  {
    id: "holy-communion",
    label: "Holy Communion",
    icon: "chalice",
    accent: "gold",
    heroLine: "A soft spiritual invitation experience.",
    image: "/event-cards/holy-communion.webp",
  },
  {
    id: "naming",
    label: "Naming Ceremony",
    icon: "leaf",
    accent: "green",
    heroLine: "A sweet page for a new beginning.",
    image: "/event-cards/naming-ceremony.webp",
  },
  {
    id: "baby-shower",
    label: "Baby Shower",
    icon: "baby",
    accent: "sky",
    heroLine: "A cute celebration page for the little one.",
    image: "/event-cards/baby-shower.webp",
  },
  {
    id: "housewarming",
    label: "Housewarming",
    icon: "home",
    accent: "amber",
    heroLine: "A warm invite to your new beginning.",
    image: "/event-cards/housewarming.webp",
  },
];
