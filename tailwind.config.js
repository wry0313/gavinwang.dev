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
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}


