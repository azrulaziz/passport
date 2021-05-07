const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
      extend: {
        fontSize: {
          'xxs': '0.625rem'
        },
        margin: {
          22: '5.5rem'
        },
        fontFamily: {
          sans: ['Overpass', ...defaultTheme.fontFamily.sans],
        },
        colors: {
          primary: {
            gray: '#F0F2F5',
            black: '#1B1B1B',
            blue: '#2E81C9'
          },
          secondary: {
            gray: '#505050'
          },
          social: {
            linkedin: '#2C67BC',
            google: '#CE533D'
          },
          gray: {
            1: '#ffffff',
            2: '#fafafa',
            3: '#f5f5f5',
            4: '#f0f0f0',
            5: '#d9d9d9',
            6: '#bfbfbf',
            7: '#8c8c8c',
            8: '#595959',
            9: '#434343',
            10: '#262626',
            11: '#1f1f1f',
            12: '#141414',
            13: '#000000',
          },
          blue: {
            1: '#E6F7FF',
            4: '#69C0FF'
          }
        }
      },
      // container: {
      //   center: true,
      //   padding: "1.5rem",
      // },
    }
}