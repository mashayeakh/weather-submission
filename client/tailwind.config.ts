import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: "#080f1e",
        deep: "#050c1a",
        panel: "#0d1829",
        card: "#101e33",
        "card-hover": "#152238",
        accent: "#38bdf8",
        cyan: "#06b6d4",
        violet: "#818cf8",
        emerald: "#34d399",
        amber: "#fbbf24",
        rose: "#fb7185",
      },
      fontFamily: {
        sans: ["Inter", "Outfit", "ui-sans-serif", "system-ui"],
        display: ["Outfit", "Inter", "ui-sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
      },
      animation: {
        shimmer: "shimmer 1.8s infinite",
        "fade-in": "fadeInUp 0.5s ease forwards",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(56, 189, 248, 0.3), 0 0 60px rgba(56, 189, 248, 0.1)",
        "glow-sm": "0 0 10px rgba(56, 189, 248, 0.2)",
        card: "0 20px 60px rgba(0, 0, 0, 0.4)",
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
