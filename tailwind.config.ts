import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: "#234C3A",
        sage: "#A8B99D",
        ivory: "#F8F6EF",
        ink: "#242B27",
        muted: "#68736B"
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(35, 76, 58, .10)"
      }
    }
  },
  plugins: []
};
export default config;
