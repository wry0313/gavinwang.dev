/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-20deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
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
        spin: {
          "0%" : { transform: "rotate(0deg)" },
          "100%" : { transform: "rotate(360deg)" }
        },
        moveCircle: {
          '0%': { transform: "rotate(0deg) translateX(4px) rotate(0deg)"},
          '100%': { transform: "rotate(360deg) translateX(4px) rotate(-360deg)"}
        },
        typing: {
          '0%': { width: '0ch' },
          '5%, 10%': { width: '1ch' },
          '15%, 20%': { width: '2ch' },
          '25%, 30%': { width: '3ch' },
          '35%, 40%': { width: '4ch' },
          '45%, 50%': { width: '5ch' },
          '55%, 60%': { width: '6ch' },
          '65%, 70%': { width: '7ch' },
          '75%, 80%': { width: '8ch' },
          '85%, 90%': { width: '9ch' },
          '95%': { width: '10ch' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        spin: 'spin 4s infinite linear',
        moveCircle: 'moveCircle 1.4s infinite ease-out',
        cursor: 'cursor .6s linear infinite alternate',
        type: 'type 1.8s ease-out .8s 1 normal both',

      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


