import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFDF9",
        foreground: "#1F2937",
        card: "#FFFFFF",
        border: "#F3D8DE",
        primary: {
          DEFAULT: "#D94F70",
          dark: "#B93558",
          soft: "#FFF1F4",
        },
        gold: "#D6A84F",
        muted: "#6B7280",
        ivory: "#FFFDF9",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 16px 45px rgba(217, 79, 112, 0.10)",
        card: "0 10px 30px rgba(31, 41, 55, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
