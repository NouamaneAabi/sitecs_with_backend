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
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0f2144',
        },
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '.18em',
      },
      boxShadow: {
        'card':      '0 2px 8px rgba(30,58,138,.06), 0 8px 32px rgba(30,58,138,.08)',
        'card-hover':'0 8px 24px rgba(30,58,138,.12), 0 24px 64px rgba(30,58,138,.16)',
        'glow-amber':'0 0 32px rgba(245,158,11,.35)',
        'glow-blue': '0 0 32px rgba(30,58,138,.35)',
        'btn':       '0 4px 20px rgba(245,158,11,.38)',
        'btn-hover': '0 8px 32px rgba(245,158,11,.48)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(.22,1,.36,1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
      animation: {
        'spin-slow':  'spin 24s linear infinite',
        'float':      'float 7s ease-in-out infinite',
        'pulse-slow': 'pulse 3.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
