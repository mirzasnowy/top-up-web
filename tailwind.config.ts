import type { Config } from "tailwindcss";

export default {
  content: ["./client/**/*.{ts,tsx}"],
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
        // Snowy Store Brand Colors
        snowy: {
          50: "hsl(var(--snowy-50))",
          100: "hsl(var(--snowy-100))",
          200: "hsl(var(--snowy-200))",
          300: "hsl(var(--snowy-300))",
          400: "hsl(var(--snowy-400))",
          500: "hsl(var(--snowy-500))",
          600: "hsl(var(--snowy-600))",
          700: "hsl(var(--snowy-700))",
          800: "hsl(var(--snowy-800))",
          900: "hsl(var(--snowy-900))",
        },
        ice: {
          50: "hsl(var(--ice-50))",
          100: "hsl(var(--ice-100))",
          200: "hsl(var(--ice-200))",
          300: "hsl(var(--ice-300))",
          400: "hsl(var(--ice-400))",
          500: "hsl(var(--ice-500))",
        },
        purple: {
          50: "hsl(var(--purple-50))",
          100: "hsl(var(--purple-100))",
          200: "hsl(var(--purple-200))",
          300: "hsl(var(--purple-300))",
          400: "hsl(var(--purple-400))",
          500: "hsl(var(--purple-500))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
      backgroundImage: {
        "snowy-gradient":
          "linear-gradient(135deg, hsl(var(--snowy-50)) 0%, hsl(var(--ice-100)) 40%, hsl(var(--purple-100)) 100%)",
        "premium-gradient":
          "linear-gradient(145deg, hsl(var(--snowy-100)) 0%, hsl(var(--ice-50)) 50%, hsl(var(--purple-50)) 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(245,250,255,0.9) 100%)",
        "hero-gradient":
          "linear-gradient(135deg, hsl(var(--snowy-100)) 0%, hsl(var(--ice-100)) 30%, hsl(var(--purple-100)) 70%, hsl(var(--snowy-200)) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
