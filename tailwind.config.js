module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        'wk-woodsmoke': '#040506',
        'wk-saddle': '572526',
        'wk-scarlet': 'F12908',
        'wk-scarpa-flow': '5A5A5D',
        'wk-silver-chalice': 'B1B0B0',
        'wk-tabasco': 'B02E14',
        'wk-san-marino': '406FAD',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}