import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        "soft-gray": "#F1F1F1",
        "mid-gray": "#D9D9D9",
        "dark-gray": "#1A1A1A",
        lime: "#CFFF48",
        "dark-lime": "#A6D02F",
        mint: "#4AFFD4",
        "dark-mint": "#1DBF94",
        purple: "#BC9CFF",
        "dark-purple": "#8362E0",
        rose: "#FFBECD",
        "dark-rose": "#DC8196",
        orange: "#FFA14A",
        "dark-orange": "#CA680E"
      },
      boxShadow: {
        focus: "0 0 0 4px rgba(207, 255, 72, 0.7)"
      }
    }
  },
  plugins: []
};

export default config;
