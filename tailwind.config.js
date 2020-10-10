const defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
  plugins: [require('./etc/tailwindcss-expanded')],
  corePlugins: {
    appearance: false,
    borderCollapse: false,
    boxSizing: false,
    clear: false,
    cursor: false,
    fontFamily: false,
    fontSmoothing: false,
    objectFit: false,
    objectPosition: false,
    order: false,
    placeholderColor: false,
    placeholderOpacity: false,
    pointerEvents: false,
    resize: false,
    tableLayout: false,
    userSelect: false,
    visibility: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./src/**/*', './etc/posthtml-*.js'],
  variants: {
    textColor: [...defaultConfig.variants.textColor, 'group-hover', 'expanded'],
    display: [...defaultConfig.variants.display, 'group-hover', 'expanded'],
    backgroundColor: [...defaultConfig.variants.backgroundColor, 'odd'],
  },
  theme: {
    fontFamily: {
      sans: [
        'Raleway',
        'Lucida Grande',
        'Helvetica Neue',
        'Helvetica',
        'sans-serif',
      ],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      md: '1.25rem',
      lg: '1.5rem',
      xl: '1.75rem',
      '2xl': '2rem',
      '3xl': '3rem',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      gray: defaultConfig.theme.colors.gray,
      green: defaultConfig.theme.colors.green,
      red: defaultConfig.theme.colors.red,
      colorbox: {
        10: '#65dcb4',
        20: '#3ab189',
        30: '#2b7b91',
        35: '#2e2874',
        40: '#542257',
      },
      twitter: '#1DA1F2',
      orcid: '#A6CE39',
    },
    extend: {
      screens: {
        'no-hover': { raw: '(any-hover: none)' },
      },
    },
  },
}
