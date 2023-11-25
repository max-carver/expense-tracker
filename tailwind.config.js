/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      },
      colors: {
        black: '#16161D',
        lightBlue: '#E5F3FD',
        lightBlueHover: '#E5F3FD',
        lightRed: '#FF6161',
        lightRedHover: '#FC8686',
        white: '#FFFFFF',
      }
    },
  },
  plugins: [],
}

