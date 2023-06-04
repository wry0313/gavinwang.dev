/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,md, mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md, mdx}",
    "./posts/**/*.{js,ts,jsx,tsx,md,mdx}" // for tailwind css animation post
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'black': '#222222',
        'white': '#ffffff',
        'lapis': '#1c5d99',
        'moonstone': '#639fab',
        'powder': '#bbcde5',
        'neon': '#acedff',
        'softblue': '#89bbfe',
        'frenchgray': '#d2d5dd'
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: '0',
            transform: 'translateY(-60px)'
          },
          "100%": {
            opacity: '1',
            transform: "translateY(0)"
          }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-20deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        moveCircle: {
          '0%': { transform: "rotate(0deg) translateX(4px) rotate(0deg)" },
          '100%': { transform: "rotate(360deg) translateX(4px) rotate(-360deg)" },
        },
        caret: {
          '50%': { 'border-color': 'transparent', }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        moveCircle: 'moveCircle 1.4s infinite ease-out',
        caret: 'caret 1.1s steps(1) infinite',
      }
    },
  },
  
  plugins: [require('@tailwindcss/typography')]
}

