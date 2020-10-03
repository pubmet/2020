const headTitle = require('./etc/posthtml-head-title')
const postcss = require('posthtml-postcss')
const pathPrefix = require('./etc/posthtml-path-prefix')
const icon = require('./etc/posthtml-icon')
const date = require('./etc/posthtml-date')
const noopener = require('posthtml-noopener').default
const { isProd, prefix } = require('./etc/build-config')
const postcssConfig = require('./postcss.config')

module.exports = ({ file }) => {
  return {
    plugins: [
      headTitle,
      postcss(postcssConfig.plugins, { from: file.path }),
      date,
      icon,
      noopener(),
      ...(isProd ? [pathPrefix({ prefix })] : []),
    ],
  }
}
