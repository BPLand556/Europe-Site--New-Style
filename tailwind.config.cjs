/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#c8a37a', // warm sand pulled from Amalfi tones
        },
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
}
