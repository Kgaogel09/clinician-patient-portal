/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  darkMode: 'class', // This is essential for next-themes
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add other relevant paths
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};