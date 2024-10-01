/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html"],
  darkMode:"selector",
  theme: {
    fontFamily:{
      synth: 'Consolas'
    },
    extend: {
      colors:{
        synth:{
          500:'#FF008A',
          700:'#463C5A',
          800:'#262335',
          900:'#241B2F'
        }
      }
    },
  },
  plugins: [],

  corePlugins: {
    preflight: false,
  }

}

