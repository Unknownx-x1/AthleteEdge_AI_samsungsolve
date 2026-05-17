/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0F1E',
        surface: '#111827',
        border: '#1E2D45',
        primary: '#3B82F6',
        secondary: '#10B981',
        danger: '#EF4444',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59,130,246,0.15)',
      },
      borderRadius: {
        'xl': '12px',
        'md': '8px',
        '2xl': '20px',
      }
    },
  },
  plugins: [],
}
