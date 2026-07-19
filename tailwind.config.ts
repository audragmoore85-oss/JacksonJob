import type { Config } from "tailwindcss";

const kidColors = ["kid-blue", "kid-green", "kid-yellow", "kid-orange", "kid-pink", "kid-purple"];

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    ...kidColors.flatMap((c) => [
      `text-${c}`,
      `bg-${c}`,
      `border-${c}`,
      `hover:bg-${c}`,
      `hover:border-${c}`,
      `hover:text-${c}`,
      `bg-${c}/10`,
      `bg-${c}/20`,
      `bg-${c}/30`,
      `bg-${c}/40`,
      `border-${c}/20`,
      `border-${c}/30`,
      `border-${c}/40`,
      `text-${c}/30`,
      `from-${c}/10`,
      `to-${c}/10`,
      `from-${c}`,
      `to-${c}`,
    ]),
    "bg-gradient-to-b",
    "from-amber-50", "to-orange-50",
    "from-indigo-900", "via-purple-900", "to-blue-900",
    "from-green-700", "via-green-600", "to-emerald-800",
    "from-cyan-400", "via-blue-500", "to-blue-700",
    "from-pink-200", "via-purple-200", "to-pink-300",
    "from-red-700", "via-orange-700", "to-yellow-800",
  ],
  theme: {
    extend: {
      colors: {
        "kid-blue": "#4A90D9",
        "kid-green": "#6BCB77",
        "kid-yellow": "#FFD93D",
        "kid-orange": "#FF8C42",
        "kid-pink": "#FF6B9D",
        "kid-purple": "#A86BE0",
        "kid-cream": "#FFF8E7",
        "desk-wood": "#D4A574",
        "desk-wood-dark": "#B8864F",
      },
      fontFamily: {
        "kid": ["Comic Sans MS", "Chalkboard SE", "Comic Neue", "sans-serif"],
      },
      animation: {
        "wiggle": "wiggle 0.5s ease-in-out infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "pop": "pop 0.3s ease-out",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pop: {
          "0%": { transform: "scale(0)" },
          "80%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
