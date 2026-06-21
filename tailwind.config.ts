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
        background: "#FEFDFC",
        foreground: "#1F2937",
        card: "#FFFFFF",
        border: "#D0B8D8",
        primary: {
          DEFAULT: "#6C1785",
          dark: "#500D68",
          soft: "#F5EFF8",
        },
        gold: "#7B3892",
        brand: {
          primary: "#6C1785",
          deep: "#500D68",
          violet: "#7B3892",
          lavender: "#A477B4",
          light: "#D0B8D8",
          white: "#FFFFFF",
          offWhite: "#FEFDFC",
        },
        muted: "#6B7280",
        ivory: "#FEFDFC",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 16px 45px rgba(108, 23, 133, 0.10)",
        card: "0 10px 30px rgba(31, 41, 55, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
