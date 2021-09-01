module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'auth-width': '35rem',
        '100': '60rem'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
