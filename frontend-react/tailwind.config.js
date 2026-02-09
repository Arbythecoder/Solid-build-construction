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
        // Solid Build Brand Colors - Sand, Water, White
        brand: {
          // Water Blue - Primary
          water: '#0EA5E9',         // Sky blue
          'water-light': '#38BDF8', // Light ocean
          'water-dark': '#0284C7',  // Deep sea
          'water-navy': '#1E40AF',  // Navy depth
          
          // Sand/Brown - Secondary
          sand: '#D2B48C',          // Warm sand
          'sand-light': '#E8D5B7',  // Beach sand
          'sand-dark': '#A89060',   // Desert sand
          brown: '#8B6F47',         // Rich earth
          'brown-dark': '#5C4A2F',  // Deep earth
          
          // Accent Colors
          white: '#FFFFFF',
          cream: '#FFFEF0',         // Warm white
          slate: '#475569',         // Text gray
        },
        // Legacy colors for backward compatibility
        luxury: {
          gold: '#D2B48C',          // Mapped to sand
          'gold-light': '#E8D5B7',
          'gold-dark': '#A89060',
        },
        premium: {
          orange: '#0EA5E9',        // Mapped to water
          'orange-light': '#38BDF8',
          'orange-dark': '#0284C7',
          brown: '#8B6F47',
          'brown-light': '#A89060',
          'brown-dark': '#5C4A2F',
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
        'gradient-gold': 'linear-gradient(135deg, #D2B48C 0%, #A89060 100%)',
        'gradient-water': 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
        'gradient-sand': 'linear-gradient(135deg, #E8D5B7 0%, #D2B48C 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 50%, #1E40AF 100%)',
        'gradient-beach': 'linear-gradient(135deg, #0EA5E9 0%, #D2B48C 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #0EA5E9 0%, #D2B48C 100%)',
      },
      boxShadow: {
        'gold': '0 8px 32px rgba(210, 180, 140, 0.3)',
        'gold-lg': '0 12px 40px rgba(210, 180, 140, 0.4)',
        'water': '0 8px 32px rgba(14, 165, 233, 0.3)',
        'water-lg': '0 12px 48px rgba(14, 165, 233, 0.4)',
        'sand': '0 8px 32px rgba(210, 180, 140, 0.25)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-in-left': 'slideInLeft 0.5s ease forwards',
        'slide-in-right': 'slideInRight 0.5s ease forwards',
        'scale-in': 'scaleIn 0.5s ease forwards',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-gold': 'pulseGold 2s infinite',
        'pulse-water': 'pulseWater 2s infinite',
        'wave': 'wave 3s ease-in-out infinite',
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
            transform: 'translateY(-20p0, 180, 140, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 0 20px rgba(210, 180, 140, 0)',
          },
        },
        pulseWater: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(14, 165, 233, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 0 20px rgba(14, 165, 233, 0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        wave: {
          '0%, 100%': {
        wave: {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
          },
          '50%': {
            transform: 'translateY(-10px) scale(1.02)',
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
