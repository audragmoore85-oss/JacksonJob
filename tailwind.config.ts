import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
