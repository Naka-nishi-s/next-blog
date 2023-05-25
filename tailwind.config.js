/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        sample: 'url("/img/icon.png")',
      },
      fontFamily: {
        body: ["Roboto Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};
