/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF8F3',
          100: '#F5F1E8',
          200: '#E8E0D0',
          300: '#D4C4A8',
          400: '#B8A080',
          500: '#9C7C58',
          600: '#7D6346',
          700: '#5E4A34',
          800: '#3F3122',
          900: '#2C2C2C',
        },
        accent: {
          rose: '#B76E79',
          gold: '#ddd3b0',
          lightRose: '#E8C4C4',
          cream: '#FAF8F3',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}