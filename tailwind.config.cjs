/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      ptSansNarrow: ["var(--font-ptSansNarrow)"],
      inter: ["var(--font-inter)"],
    },
  },
  plugins: [],
};

module.exports = config;
