/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use 'media' to cleanly tie into the system's light/dark settings
  darkMode: "media",
  content: [
    "./src/app/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/pages/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Playfair Display", "Didot", "Georgia", "serif"],
        body: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        // Tailwind v3 syntax perfectly parses space-separated triplets with <alpha-value>
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",

        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",

        // Static references
        brand: {
          canvas: "var(--brand-canvas)",
          espresso: "var(--brand-espresso)",
          black: "var(--brand-black)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        // Clamp structures are fully compatible with Tailwind 3.4 fluid styling
        "display-xl": [
          "clamp(3.5rem, 8vw, 6.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2.5rem, 6vw, 4.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        "display-md": ["clamp(1.8rem, 4vw, 2.8rem)", { lineHeight: "1.2" }],
        "body-premium": [
          "clamp(0.95rem, 1.5vw, 1.15rem)",
          { lineHeight: "1.6", letterSpacing: "0.01em" },
        ],
      },
    },
  },
  plugins: [],
};
