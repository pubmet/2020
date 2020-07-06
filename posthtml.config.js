const extend = require('posthtml-extend')
const include = require('posthtml-include')
const expressions = require('posthtml-expressions')
const postcss = require('posthtml-postcss')
const pathPrefix = require('./etc/posthtml-path-prefix')
const icon = require('./etc/posthtml-icon')
const date = require('./etc/posthtml-date')
const { isProd, root } = require('./etc/build-config')
const postcssConfig = require('./postcss.config')

const pagesPath = `${process.cwd()}/src/pages`

module.exports = ({ file }) => {
  return {
    plugins: [
      extend({ root }),
      include({ root }),
      expressions({
        locals: {
          ...file.data.locals,
          // results into "/", "/history", "/contact-us" etc.
          currentPath: file.path.startsWith(pagesPath)
            ? file.path
                .replace(pagesPath, '')
                .replace(/(index)?\.(html|md|ejs)$/, '')
            : undefined,
        },
      }),
      postcss(postcssConfig.plugins, { from: file.path }),
      date,
      icon,
      ...(isProd ? [pathPrefix({ prefix: '/pubmet2020' })] : []),
    ],
  }
}
