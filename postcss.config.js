const { isProd } = require('./etc/build-config')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    ...(isProd ? [require('autoprefixer'), require('cssnano')] : []),
  ],
}
