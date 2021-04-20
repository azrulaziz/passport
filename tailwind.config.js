module.exports = {
  presets: [
    require('./500-tailwind-preset.js')
  ],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [],
}
