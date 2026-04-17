/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This scans all your React files
  ],
  darkMode: 'class', // This enables the dark mode toggle we built
  theme: {
    extend: {},
  },
  plugins: [],
}