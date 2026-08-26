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
          DEFAULT: '#F2650E',
          hover: '#D4590A',
          light: '#FFF3ED',
        },
        background: '#0A0C12',
        foreground: '#FFFFFF',
        card: '#0E1017',
        muted: {
          foreground: 'rgba(255,255,255,0.5)',
        },
        secondary: {
          DEFAULT: '#0E1017',
        },
        border: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        heading: ["'Barlow Condensed'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
        body: ["'Inter'", 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      boxShadow: {
        premium: '0 1px 3px rgba(0,0,0,0.02), 0 8px 30px rgba(0,0,0,0.04)',
        card: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 30px -10px rgba(0,0,0,0.1)',
        glow: '0 0 20px rgba(242,101,14,0.15)',
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
