import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { paper: "#fbf7f2", ink: "#3e281d", espresso: "#4a2917", blush: "#ecd9ca", rose: "#bf8c89", line: "#decabe", muted: "#796258" },
      fontFamily: { display: ["Georgia", "serif"], body: ["Arial", "sans-serif"] },
      boxShadow: { invitation: "0 18px 45px rgba(73,42,27,.1)" },
    },
  },
  plugins: [],
};

export default config;
