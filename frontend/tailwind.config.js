/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green': '#00EAD3',
        'pink':'#F54298',
        'pink-300': '#F06292',
        'regal-blue': '#004069'
      },
      fontFamily:{
        satoshi:['Quicksand', 'Pacifico'],
        inter: ['Pacifico','sans-serif'],
      },
      letterSpacing: {
        widest: '.298px'
      },
      lineHeight: {
        'loose':'98px'
      },
      boxShadow: {
        '1xl': '0px 5px 5px 0px rgba(2, 3, 3, 0.04), 0px 3px 14px 0px rgba(2, 3, 3, 0.02), 0px 8px 10px 0px rgba(2, 3, 3, 0.03'
      }
    },
  },
  plugins: [],
}
