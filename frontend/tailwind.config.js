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
          DEFAULT: '#EC6F36',
          hover: '#d65d2b',
          light: '#F2F2F2',
        },
        background: '#121212',
        foreground: '#FFFFFF',
        card: '#4D4D4D',
        muted: {
          foreground: '#989898',
        },
        secondary: {
          DEFAULT: '#4D4D4D',
        },
        border: '#989898',
        'soft-white': '#F2F2F2',
      },
      fontFamily: {
        heading: ["'Raleway'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
        body: ["'Roboto'", 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      boxShadow: {
        premium: '0 1px 3px rgba(0,0,0,0.12), 0 8px 30px rgba(0,0,0,0.24)',
        card: '0 1px 3px rgba(0,0,0,0.14), 0 1px 2px rgba(0,0,0,0.16)',
        'card-hover': '0 10px 30px -10px rgba(0,0,0,0.3)',
        glow: '0 0 20px rgba(236,111,54,0.25)',
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
