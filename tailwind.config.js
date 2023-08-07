/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  important: true,
  theme: {
    extend: {
      colors: {
        carePurple: "#753BBD",
        careBlue: "#03014C",
        careDarkBlue: "#051F4A",
        careLightBlue: "#007cc4",
        careLightGreen: "#178197",
        careOrange: "#fe6e3e",
        carePlaceholder: "#8894a7",
        careMenuGrey: "#9AA2AC",
        careGrey: "#E4E7EB",
        careGreen: "#017749",
        careYellow: "#FFB81C",
        careDarkPurple: "#A51890",
        careBackgroundInput: "#f6f6f6",
        careNavyBlue: "#051F4A",
        careOffWhite: "#F4F5F7",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-carePurple",
    "bg-careBlue",
    "bg-careDarkBlue",
    "bg-careLightBlue",
    "bg-careLightGreen",
    "bg-careOrange",
    "bg-carePlaceholder",
    "bg-careMenuGrey",
    "bg-careGrey",
    "bg-careGreen",
    "bg-careYellow",
    "bg-careDarkPurple",
    "bg-careBackgroundInput",
    "bg-careNavyBlue",
  ],
};
