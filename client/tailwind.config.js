/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#3B82F6', // Clear blue accent
        background: '#FFFFFF',
        foreground: '#000000',
        card: '#F9FAFB',
        border: '#E5E7EB',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0', // Sharp borders by default
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
      },
      borderWidth: {
        DEFAULT: '1.5px', // Boxy thick borders
      }
    },
  },
  plugins: [],
}
