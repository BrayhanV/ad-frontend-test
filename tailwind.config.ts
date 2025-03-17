import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      letterSpacing: {
        wide: "0.4px",
      },
      fontSize: {
        "area-normal": ["24px", "24px"],
        xs: ["14px", "16px"],
        sm: ["16px", "16px"],
        base: ["18px", "20px"],
        lg: ["20px", "24px"],
        xl: ["24px", "28px"],
        "2xl": ["36px", "40px"],
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        neutral: {
          500: "var(--neutral-500)",
          700: "var(--neutral-700)",
        },
        surface: {
          primary: "var(--surface-primary)",
          secondary: "var(--surface-secondary)",
        },
      },
      stroke: {
        primary: "var(--stroke-primary)",
        secondary: "var(--stroke-secondary)",
        tertiary: "var(--stroke-tertiary)",
        active: "var(--stroke-active)",
      },
    },
  },
  plugins: [],
};

export default config;
