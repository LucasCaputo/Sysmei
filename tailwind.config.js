/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      height: {
        'body-height': 'calc(100vh - 70px)'
      }
    },
  },
  plugins: [],
}