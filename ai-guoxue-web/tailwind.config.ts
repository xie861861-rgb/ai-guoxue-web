import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B0000",
          light: "#A52A2A",
          dark: "#5C0000",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#FFD700",
          dark: "#B8860B",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          light: "#2A2A2A",
          dark: "#0D0D0D",
        },
        paper: {
          DEFAULT: "#F5F0E6",
          dark: "#E8E0D0",
        },
      },
      fontFamily: {
        serif: ["Noto Serif SC", "serif"],
        sans: ["Noto Sans SC", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.5)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
