import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Rajdhani", "system-ui", "sans-serif"],
        display: ["Orbitron", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Ocean Custom Colors
        ocean: {
          abyss: "#020617",
          deep: "#0a192f",
          mid: "#112240",
          surface: "#1e3a5f",
        },
        bio: {
          cyan: "#06b6d4",
          teal: "#14b8a6",
          emerald: "#10b981",
          mint: "#14f195",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 0 30px hsla(189, 94%, 43%, 0.4)",
        "glow-lg": "0 0 60px hsla(189, 94%, 43%, 0.3)",
        "glow-teal": "0 0 30px hsla(168, 76%, 42%, 0.4)",
        "glow-bio": "0 0 40px hsla(158, 64%, 52%, 0.5)",
        ocean: "0 8px 32px rgba(0,0,0,0.4), 0 0 60px hsla(189, 94%, 43%, 0.1)",
        "ocean-lg": "0 12px 48px rgba(0,0,0,0.5), 0 0 80px hsla(189, 94%, 43%, 0.15)",
      },
      backgroundImage: {
        "gradient-abyss": "linear-gradient(180deg, hsl(222, 47%, 3%) 0%, hsl(217, 33%, 7%) 100%)",
        "gradient-surface": "linear-gradient(135deg, hsl(217, 33%, 8%) 0%, hsl(222, 47%, 5%) 100%)",
        "gradient-current": "linear-gradient(90deg, hsl(189, 94%, 43%) 0%, hsl(168, 76%, 42%) 100%)",
        "gradient-bio": "linear-gradient(90deg, hsl(158, 64%, 52%) 0%, hsl(152, 76%, 62%) 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 20px hsla(189, 94%, 43%, 0.3)" },
          "50%": { opacity: "1", boxShadow: "0 0 40px hsla(189, 94%, 43%, 0.5)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 50%" },
          "100%": { backgroundPosition: "-200% 50%" },
        },
        wave: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "icon-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-3px) rotate(2deg)" },
          "75%": { transform: "translateY(2px) rotate(-2deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite",
        wave: "wave 1.5s ease-out forwards",
        breathe: "breathe 4s ease-in-out infinite",
        "icon-float": "icon-float 5s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        ripple: "ripple 1s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
