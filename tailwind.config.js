/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Stitch Design System Tokens
        background: '#131316',
        surface: '#131316',
        'surface-container-lowest': '#0e0e11',
        'surface-container-low': '#1b1b1e',
        'surface-container': '#1f1f22',
        'surface-container-high': '#2a2a2d',
        'surface-container-highest': '#353438',
        'on-surface': '#e4e1e6',
        'on-surface-variant': '#d2c5ab',
        secondary: '#c8c6c8',
        'secondary-container': '#474649',
        'on-secondary': '#313032',
        'on-secondary-fixed': '#1b1b1d',
        primary: '#ffe9b9',
        'primary-container': '#ffc700', // Signature Mustard Accent
        'primary-fixed': '#ffdf94',
        'primary-fixed-dim': '#f5bf00',
        'on-primary': '#3e2e00',
        'on-primary-container': '#6e5400',
        'outline-variant': '#4f4632',
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(255, 199, 0, 0.35)',
        'glow-lg': '0 0 35px -5px rgba(255, 199, 0, 0.5)',
        'mustard-btn': '0 4px 16px rgba(255, 199, 0, 0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        scaleUp: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
