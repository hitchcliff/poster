/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e47200",
        secondary: "#e6b400",
        light: "#ffffff",
        "light-mode": "#dedede",
        dark: "#444443",
        "dark-mode": "#181818",
      },
      fontWeight: {
        brand: "800",
        primary: "400",
        medium: "500",
      },
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
      },
    },
  },
  plugins: [],
};
