import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        hanken: ["Hanken Grotesk", "sans-serif"],
      },
      colors: {
        gold: "#e6c364",
        navy: "#101415",
        crimson: "#dc2626",
      },
    },
  },
  plugins: [],
};

export default config;