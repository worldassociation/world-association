/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        background: "#ffffff",
        foreground: "#020306",
        card: "#ffffff",
        "card-foreground": "#020306",
        popover: "#ffffff",
        "popover-foreground": "#020306",
        primary: "#1a1a1d",
        "primary-foreground": "#fcfcfc",
        secondary: "#f2f2f5",
        "secondary-foreground": "#1a1a1d",
        muted: "#f2f2f5",
        "muted-foreground": "#75767b",
        accent: "#f2f2f5",
        "accent-foreground": "#1a1a1d",
        destructive: "#f44336",
        "destructive-foreground": "#fcfcfc",
        border: "#e6e6eb",
        input: "#e6e6eb",
        ring: "#1a1a1d",
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
