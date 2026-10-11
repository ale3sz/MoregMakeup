/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#0A3323',
        'moss-green': '#839958',
        'beige': '#F7F4D5',
        'rosy-brown': '#D3968C',
        'midnight-green': '#105666',
        
        // Map to surface names for the UI to match stitch design
        'surface': '#F7F4D5', // Beige
        'surface-container': '#f0ecd0', // slightly darker beige
        'surface-container-high': '#e9e4c5',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#fcfbed',
        'on-surface': '#0A3323',
        'on-surface-variant': '#105666',
        'rosy-brown-dark': '#b97a70'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
