const { isProd, prefix } = require('./etc/build-config')
const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    ...(isProd
      ? [
          require('postcss-url')({
            url: (asset) =>
              asset.url.startsWith('/')
                ? path.join('/', prefix, asset.url)
                : asset.url,
          }),
          require('autoprefixer'),
          require('cssnano'),
        ]
      : []),
  ],
}
