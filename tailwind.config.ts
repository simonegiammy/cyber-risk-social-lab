import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: { 0: "#05070A", 1: "#0B0F14", 2: "#10161E" },
        fg: { DEFAULT: "#E6F1FF", muted: "#8A95A8", dim: "#3A4453" },
        phos: "#00FF9C",
        alarm: "#FF4D6D",
        insight: "#7C9CFF",
        amber: "#FFC857",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        sans: ["Inter Tight", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.04em" },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        scan: { "0%": { transform: "translateY(0)" }, "100%": { transform: "translateY(4px)" } },
        flicker: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.92" } },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        scan: "scan 0.18s linear infinite",
        flicker: "flicker 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
