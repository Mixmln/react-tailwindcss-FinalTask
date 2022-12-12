/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        75: '85vh',
        100: '94.5vh',
        128: '514px',
      },
      maxHeight: {
        100: '94.5vh',
        128: '514px',
      },
    },
  },
  plugins: [],
};
