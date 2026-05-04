import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F3",
        ink: "#1A1A1A",
        charcoal: "#0F1115",
        parchment: "#EFEAE0",
        curiosity: {
          DEFAULT: "#F59E0B",
          soft: "#FEF3C7",
          deep: "#B45309",
        },
        rigor: {
          DEFAULT: "#4338CA",
          soft: "#E0E7FF",
          deep: "#312E81",
        },
        skepticism: {
          DEFAULT: "#E11D48",
          soft: "#FFE4E6",
          deep: "#9F1239",
        },
        ownership: {
          DEFAULT: "#059669",
          soft: "#D1FAE5",
          deep: "#065F46",
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-lg": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "heading-1": ["clamp(1.875rem, 3.5vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "heading-2": ["clamp(1.5rem, 2.5vw, 1.875rem)", { lineHeight: "1.2", letterSpacing: "-0.005em" }],
        "heading-3": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.3" }],
        "heading-4": ["clamp(1.0625rem, 1.5vw, 1.25rem)", { lineHeight: "1.4" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        email: "0 20px 50px -20px rgba(67, 56, 202, 0.25), 0 10px 20px -12px rgba(0, 0, 0, 0.1)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
        "pulse-soft": "pulseSoft 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
