/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb',
        // Premium Luxury Palette
        luxury: {
          gold: '#D4AF37',
          'gold-light': '#F4E4B7',
          'gold-dark': '#B8941F',
        },
        premium: {
          orange: '#FF8C42',
          'orange-light': '#FFB380',
          'orange-dark': '#E67425',
          brown: '#4A2C2A',
          'brown-light': '#6B4C4A',
          'brown-dark': '#2C1614',
          black: '#0A0A0A',
          charcoal: '#1A1A1A',
          'soft-black': '#2D2D2D',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #D4AF37 0%, #FF8C42 50%, #4A2C2A 100%)',
      },
      boxShadow: {
        'gold': '0 8px 32px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 12px 40px rgba(212, 175, 55, 0.4)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        pulseGold: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 0 20px rgba(212, 175, 55, 0)',
          },
        },
      },
    },
  },
  plugins: [],
}
