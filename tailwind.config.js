/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Fredoka', 'sans-serif'],
      },
      colors: {
        pokemon: {
          red: '#F53333', // Vibrant Pokeball red
          yellow: '#FFD700', // Pikachu yellow
          blue: '#3B4CCA', // Logo blue
          dark: '#222224', // UI dark
          light: '#F8F9FA', // Background light
        },
        type: {
          fire: '#FA6C6C',
          water: '#6890F0',
          grass: '#48D0B0',
          electric: '#FFCE4B',
          psychic: '#F85888',
          ice: '#98D8D8',
          dragon: '#7038F8',
          dark: '#705848',
          fairy: '#EE99AC',
          normal: '#A8A878',
          fighting: '#C03028',
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}



