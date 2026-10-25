/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: "#05070d",
        "obsidian-card": "#090d16",
        "obsidian-panel": "#0f1624",
        "obsidian-lowest": "#030408",
        "amber-warn": "#ffb020",
        "amber-bright": "#ffd166",
        primary: {
          DEFAULT: "#00f0ff",
          container: "#00f0ff",
          "fixed-dim": "#00dbe9",
          fixed: "#7df4ff",
          dim: "#00b4c4",
        },
        secondary: {
          DEFAULT: "#a78bfa",
          container: "#4c1a9c",
          fixed: "#e9ddff",
          dim: "#8b5cf6",
        },
        tertiary: {
          DEFAULT: "#ec4899",
          container: "#831843",
        },
        "on-surface": "#d6e5ed",
        "on-surface-variant": "#8ca1ad",
        outline: "#32445e",
        "outline-variant": "#1a273b",
        "surface-base": "#030712",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        grotesk: ["'Space Grotesk'", "sans-serif"],
        "display-hero": ["'Space Grotesk'", "sans-serif"],
        "headline-lg": ["'Space Grotesk'", "sans-serif"],
        "headline-md": ["'Space Grotesk'", "sans-serif"],
        "headline-sm": ["'Space Grotesk'", "sans-serif"],
        "label-telemetry": ["'JetBrains Mono'", "monospace"],
        "label-code": ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "radar-sweep": "spin 4s linear infinite",
        "pulse-glow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}
