/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "color-dark": "#01110A",
        "color-orange": "#000000",
        "color-green": "003E1F",
        "color-light-green": "#D5F2E3"
      },
    },
  },
  //theme: {
  //  extend: {},
  //},
  plugins: [],
};
