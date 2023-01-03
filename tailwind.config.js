/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        DancingScript: ["Dancing Script", "cursive"],
        Raleway: ["Raleway", "sans-serif"],
      }, //end of fontFamily
      backgroundImage: {
        "bg-md-header": "url('/src/asstes/bg/header.png')",
        "bg-header": "url('/src/asstes/bg/header-sm.png')",
        "store-img": "url('/src/asstes/botiqueFronImg.png')",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: "0" },
          '50%': { opacity: "1" },
        }
      },
      animation: {
        'fade-in': 'fadeIn 1s forwards',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        // Complex site-specific column configuration
        'contact-form': '2fr 1fr',
      }
    
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
