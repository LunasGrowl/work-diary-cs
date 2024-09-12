/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html"],
  darkMode:"selector",
  theme: {
    extend: {},
  },
  plugins: [],

  corePlugins: {
    preflight: false,
  }

}

