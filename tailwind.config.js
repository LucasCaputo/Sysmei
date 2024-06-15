/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      height: {
        'body-height': 'calc(100vh - 70px)',
        'body-height-mobile': 'calc(100vh - 120px)',
      },
      backgroundColor: {
        'primary': '#673ab7'
      }
    },
  },
  plugins: [],
}