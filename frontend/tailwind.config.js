/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        valorant: {
          red: "#FD4556",
          dark: "#0F1923",
          light: "#1C252C",
          neon: "#00FFFF",
        },
      },
    },
  },

  plugins: [],
};
