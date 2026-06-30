/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5A1F',
          hover: '#E04E1A',
          light: '#FFF3ED',
        },
        'text-muted': '#6B7280',
        'text-main': '#111827',
        'bg-surface': '#F9FAFB',
        'bg-card': '#FFFFFF',
        'bg-dark': '#111827',
        'border': '#E5E7EB',
        'error': '#EF4444',
      },
      fontFamily: {
        primary: ['Outfit', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      boxShadow: {
        premium: '0 4px 20px rgba(0, 0, 0, 0.06)',
        card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        glow: '0 0 20px rgba(255,90,31,0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'float': 'float 3.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
