/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        move: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(50%) translateY(25%)" },
          "50%": { transform: "translateX(0) translateY(50%)" },
          "75%": { transform: "translateX(-50%) translateY(25%)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
      },
      animation: {
        "blob-1": "move 12s ease-in-out infinite alternate",
        "blob-2": "move 15s ease-in-out infinite alternate-reverse",
      },
    },
  },
  plugins: [],
};
