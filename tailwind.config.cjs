/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      gridTemplateColumns: {
        '20/80': '20% 80%',
        fixed: '40px 260px',
      },
      boxShadow: {
        '3xl': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
      },
      colors: {
        primary: {
          600: '#003F3C',
          500: '#014A40',
          400: '#269279',
          300: '#51C8A2',
          200: '#8FECC6',
          100: '#C5F5DD',
        },
        // primary: '#014A40',
        secondary: '#F19F5D',
      },
    },
  },
  plugins: [],
};
