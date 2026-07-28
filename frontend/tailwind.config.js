/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Geist', 'Satoshi', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        light: {
          bg: '#F8FAFC',
          surface: '#F1F5F9',
          card: '#FFFFFF',
          elevated: 'rgba(255, 255, 255, 0.95)',
          border: '#E2E8F0',
          heading: '#0F172A',
          body: '#334155',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        primary: {
          DEFAULT: '#6366F1',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366F1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          400: '#a78bfa',
          500: '#8B5CF6',
          600: '#7c3aed',
        },
        accent: {
          DEFAULT: '#06B6D4',
          400: '#22d3ee',
          500: '#06B6D4',
          600: '#0891b2',
        },
        brand: {
          50: '#f5f7ff',
          100: '#ebf0ff',
          200: '#d6e0ff',
          300: '#adc2ff',
          400: '#7599ff',
          500: '#6366F1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'glow-primary': '0 0 30px -5px rgba(99, 102, 241, 0.25)',
        'glow-secondary': '0 0 30px -5px rgba(139, 92, 246, 0.25)',
        'glow-accent': '0 0 30px -5px rgba(6, 182, 212, 0.25)',
        'glass': '0 8px 30px 0 rgba(15, 23, 42, 0.05)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 0 0 1px #E2E8F0',
        'card-hover': '0 20px 35px -10px rgba(99, 102, 241, 0.15), 0 0 0 1px #CBD5E1',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 12s linear infinite',
        'gradient-x': 'gradientX 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        gradientX: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
    },
  },
  plugins: [],
}
