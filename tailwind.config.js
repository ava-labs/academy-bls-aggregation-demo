/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        'avalanche-red': '#E84142',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
