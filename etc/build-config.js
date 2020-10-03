const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  isProd,
  root: path.join(process.cwd(), 'src'),
  destDir: isProd ? 'dist' : '.tmp',
  prefix: isProd ? 'pubmet2020' : '',
}
