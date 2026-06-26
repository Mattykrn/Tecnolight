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
          DEFAULT: '#FFB703',
          hover: '#E0A000',
        },
        bg: {
          dark: '#0A0B0D',
          surface: '#12141C',
          card: '#181B24',
        },
        border: {
          DEFAULT: '#232735',
        },
        text: {
          main: '#F8FAFC',
          muted: '#94A3B8',
        },
        success: {
          DEFAULT: '#10B981',
        },
        error: {
          DEFAULT: '#EF4444',
        },
      },
      fontFamily: {
        primary: ['Outfit', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      boxShadow: {
        premium: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        glow: '0 0 20px rgba(255, 183, 3, 0.25)',
        'glow-hover': '0 0 25px rgba(255, 183, 3, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
