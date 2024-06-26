/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lightText: '#11181C',
        lightBackground: '#fff',
        lightIcon: '#687f76',
        lightTabIconDefault: '#687f76',

        darkText: '#ECEDEE',
        darkBackground: '#151718',
        darkIcon: '#9BA1A6',
        darkTabIconDefault: '#9BA1A6'
      },
    },
  },
  plugins: [],
}

