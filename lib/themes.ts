import type { EventTheme } from "@/lib/event-types";

export const themeStyles: Record<EventTheme, {
  name: string;
  primary: string;
  accent: string;
  background: string;
  soft: string;
  border: string;
  button: string;
}> = {
  blush: {
    name: "Blush",
    primary: "#D94F70",
    accent: "#D6A84F",
    background: "#FFFDF9",
    soft: "#FFF1F4",
    border: "#F3D8DE",
    button: "bg-[#D94F70] text-white",
  },
  sage: {
    name: "Sage",
    primary: "#5F7F61",
    accent: "#C5A45A",
    background: "#FBFDF8",
    soft: "#EEF6ED",
    border: "#DDEBDD",
    button: "bg-[#5F7F61] text-white",
  },
  classic: {
    name: "Classic",
    primary: "#2F3542",
    accent: "#C8A45D",
    background: "#FFFDF8",
    soft: "#F7F3EA",
    border: "#E9E0D2",
    button: "bg-[#2F3542] text-white",
  },
  royal: {
    name: "Royal",
    primary: "#8A3FFC",
    accent: "#D6A84F",
    background: "#FFFBFF",
    soft: "#F5ECFF",
    border: "#E6D7FF",
    button: "bg-[#8A3FFC] text-white",
  },
};

export function getThemeStyles(theme?: EventTheme | null) {
  return themeStyles[theme ?? "blush"] ?? themeStyles.blush;
}
