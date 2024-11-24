/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bento: {
          bg: '#f7f7f7',
          primary: '#3b82f6',
          secondary: '#10b981',
          accent: '#8b5cf6',
        },
      },
      gridTemplateColumns: {
        'bento': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}