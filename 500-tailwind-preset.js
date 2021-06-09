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
          // white: colors.white,
          // black: colors.black,
          // gray: colors.trueGray,
          // red: colors.red,
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
          grey: {
            1: '#ffffff',
            2: '#f7f7f7',
            3: '#E1E1E1',
            4: '#CBCBCB',
            5: '#AFAFAF',
            6: '#757575',
            7: '#505050',
            8: '#262626',
            9: '#1B1B1B',
            10: '#000000',
          },
          smoke: {
            1: '#F0F2F5',
            2: '#DDE1E8',
            3: '#C9D0DB',
            4: '#B6C0CE',
            5: '#A2AFC1',
            6: '#8F9EB4',
          },
          sand: {
            01: '#F5F5EB',
            02: '#EAEAD6',
            03: '#E0E0C0',
            04: '#D5D5AB',
            05: '#CACA96',
            06: '#C0C080',
          },
          sunshine: {
            1: '#FDF1A1',
            2: '#FCEC82',
            3: '#FCE972',
            4: '#FBE553',
            5: '#FBE033',
            6: '#FADB14',
          },
          ocean: {
            1: '#BEE6E6',
            2: '#AADEDE',
            3: '#96D6D6',
            4: '#81CFCF',
            5: '#6DC7C7',
            6: '#59BFBF',
          },
          blue: {
            1: '#2B819E',
            2: '#246D86',
            3: '#1E596E',
            4: '#174556',
            5: '#11323D',
            6: '#0A1E25',
          },
          green: {
            1: '#42A050',
            2: '#3E954B',
            3: '#398B45',
            4: '#358040',
            5: '#30753B',
            6: '#2C6B35',
          },
          orange: {
            1: '#F7C99A',
            2: '#F5BB7F',
            3: '#F3AD65',
            4: '#F19F4A',
            5: '#EE9030',
            6: '#EC8215',
          },
          red: {
            1: '#EC9696',
            2: '#E77D7D',
            3: '#E36464',
            4: '#DE4A4A',
            5: '#DA3131',
            6: '#C92525',
          },
        }
      },
      // container: {
      //   center: true,
      //   padding: "1.5rem",
      // },
    }
}