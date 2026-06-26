import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // YETI brand red/orange accent
        brand: {
          50: "#fff3ef",
          100: "#ffe2d8",
          200: "#ffc3ac",
          300: "#ff9d76",
          400: "#ff6a2c", // bright orange
          500: "#f24f1e", // primary red-orange
          600: "#d83c12", // hover
          700: "#b32f0d",
          800: "#8f2710",
          900: "#742312",
        },
        ink: {
          900: "#13161b", // near-black text
          800: "#1f242c",
          700: "#363c46",
          600: "#5b6470",
          500: "#7c8593",
          400: "#9aa3b0",
        },
        paper: {
          0: "#ffffff",
          50: "#f7f8fa", // light section bg
          100: "#eef1f4",
          200: "#e2e6eb", // borders
        },
        // dark footer / hero overlays
        carbon: {
          950: "#0c0f14",
          900: "#12161c",
          800: "#1a2028",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px -16px rgba(19,22,27,0.18)",
        lift: "0 24px 60px -24px rgba(19,22,27,0.30)",
        brand: "0 12px 34px -10px rgba(242,79,30,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
