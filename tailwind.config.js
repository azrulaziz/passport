

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  presets: [
    require('./500-tailwind-preset.js')
  ],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // purge: {
  //   enabled: true,
  //   content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // },
  theme: {
    
    
  },
  variants: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
       }
    },
  },
  plugins: [],
}
