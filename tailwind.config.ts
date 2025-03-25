import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./firefly/**/*.{js,ts,jsx,tsx,mdx}",
    "./forms/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6129FE",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        light: "#F1F1F1",
        dark: "#111",
        white: "#FFF",
        black: "#000",
        danger: "#CC0000",
        success: "#7fb069",
        warning: "#ece4b7",
        transparent: "transparent",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundColor: {
        primary: "#6129FE",
        secondary: "#5825E7",
        accent: "#F66EFF",
        light: "#F5F6F7",
        "light-100": "#EFEAFF",
        "light-200": "#DFE2E6",
        main: "#F4F7FE",
        hover: "#DFD4FF",
        disabled: "#A6AEBB"
      },
      textColor: {
        primary: "#243757",
        secondary: "#505F79",
        label: "#5D6B82",
        placeholder: "#6B788E",
        heading: "#15294B",
        "asm-purple": "#6129FE",
        hover: "#5825E7",
        active: "#35178C",
      },
      borderColor: {
        primary: "#C2C7D0",
        secondary: "#E2E8F0",
        accent: "#DFD4FF",
        "accent-2": "#DFE2E6",
        "asm-purple": "#6129FE",
        division: "#622AE8",
        hover: "#B69DFF"
      },
      fontFamily: {
        sans: ["sans-serif", "Inter"],
      },
      borderRadius: {
        facilities: "60px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
