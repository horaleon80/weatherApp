import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        lg: "1024px",
      },
      animation: {
        bounce: "bounce 1.5s infinite ease-in-out",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<string, any>,
        options?: {
          variants?: string[];
          respectPrefix?: boolean;
          respectImportant?: boolean;
        }
      ) => void;
    }) {
      addUtilities({
        ".delay-200": { "animation-delay": "0.2s" },
        ".delay-400": { "animation-delay": "0.4s" },
      });
    }),
  ],
} satisfies Config;
