import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        paper: "#fffdf7",
        ocean: "#075985",
        leaf: "#166534",
        berry: "#9f1239"
      },
      boxShadow: {
        focus: "0 0 0 4px rgba(7, 89, 133, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
