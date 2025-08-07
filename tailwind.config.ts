import type { Config } from 'tailwindcss';


const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        "fade": 'fadeIn 3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '100'},
        }
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
};

export default config;