/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e47200",
        secondary: "#e6b400",
        light: "#f5f5f5",
        dark: "#444443",
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
