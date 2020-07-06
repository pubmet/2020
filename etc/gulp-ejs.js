const transform = require('through2').obj
const ejs = require('ejs')
const PluginError = require('plugin-error')

const gulpEjs = (data = {}) => {
  return transform((file, enc, cb) => {
    if (!file.isBuffer()) return cb(null, file)
    try {
      const templateData = typeof data === 'function' ? data(file) : data
      const template = ejs.compile(file.contents.toString(), {
        filename: file.path,
        views: [`${process.cwd()}/src`],
      })
      file.contents = Buffer.from(template(templateData))
      cb(null, file)
    } catch (err) {
      cb(new PluginError('gulp-ejs', err))
    }
  })
}

module.exports = gulpEjs
