import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#ebe1d2",
          300: "#ded0bc",
          400: "#cca87c",
          500: "#ba894a",
          600: "#9e6f33",
          700: "#7c5426",
          800: "#5c3d1c",
          900: "#3d2711",
        },
        ink: {
          50: "#f6f6f8",
          100: "#ededf1",
          200: "#d7d7e0",
          300: "#b5b5c4",
          400: "#8c8ca3",
          500: "#6d6d85",
          600: "#54546a",
          700: "#414153",
          800: "#272733",
          900: "#14141c",
          950: "#0b0b10",
        },
        crimson: {
          50: "#fff1f2",
          100: "#ffe4e6",
          500: "#e11d48",
          600: "#be123c",
          700: "#9f1239",
          800: "#881337",
        },
        amber: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        }
      },
      fontFamily: {
        serif: ["Newsreader", "Playfair Display", "Merriweather", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
      boxShadow: {
        'book': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'book-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.15)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;
