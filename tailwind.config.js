/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {},
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  daisyui:{
    themes:["light","night"],
  },
  darkMode: ['class', '[data-theme="night"]']
};
