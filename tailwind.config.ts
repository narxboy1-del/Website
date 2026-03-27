import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0faf4",
          100: "#d4f0e0",
          200: "#a8e0c0",
          300: "#6dc99a",
          400: "#40916c",
          500: "#2d6a4f",
          600: "#1b4332",
          700: "#143527",
          800: "#0d261b",
          900: "#081a12",
        },
        earth: {
          50: "#faf7f2",
          100: "#f5f0e8",
          200: "#ede0d4",
          300: "#e6ccb2",
          400: "#d4a574",
          500: "#b08450",
          600: "#8b6914",
          700: "#6b4c3b",
          800: "#5c4033",
          900: "#3d2b22",
        },
        gold: {
          50: "#fdf9ef",
          100: "#faf0d3",
          200: "#f4e0a7",
          300: "#e8c96b",
          400: "#d4af37",
          500: "#c9a84c",
          600: "#b8960b",
          700: "#96780a",
          800: "#7a6208",
          900: "#5e4b06",
        },
        cream: {
          50: "#fefcf8",
          100: "#fdf9f1",
          200: "#faf4e6",
          300: "#f5edd8",
          400: "#ede0c4",
          500: "#e0cfaa",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Inter"', '"Segoe UI"', "sans-serif"],
        arabic: ['"Amiri"', "serif"],
      },
      backgroundImage: {
        "islamic-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231b4332' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":
          "linear-gradient(135deg, #1b4332 0%, #2d6a4f 30%, #1b4332 60%, #143527 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.4)" },
          "50%": { boxShadow: "0 0 0 20px rgba(212,175,55,0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        "glass-lg": "0 16px 48px 0 rgba(31, 38, 135, 0.1)",
        premium:
          "0 20px 60px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(212,175,55,0.1)",
        "card-hover":
          "0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(212,175,55,0.2)",
      },
    },
  },
  plugins: [],
};

export default config;