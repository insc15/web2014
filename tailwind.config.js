const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  corePlugins: {
      preflight: true,
    },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#__next',
  theme: {
    extend: {
      colors: {
        'black': '#111827',
      },
      fontFamily: {
        sans: ['"Motiva Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  },
}