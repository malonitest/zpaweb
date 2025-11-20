/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./blog/**/*.html",
    "./o-nas.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#3b82f6',
      }
    },
  },
  plugins: [],
}
