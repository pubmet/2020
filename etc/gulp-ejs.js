const transform = require('through2').obj
const ejs = require('ejs')
const PluginError = require('plugin-error')

const gulpEjs = () => {
  return transform((file, enc, cb) => {
    if (!file.isBuffer()) return cb(null, file)
    try {
      const template = ejs.compile(file.contents.toString(), {
        filename: file.path,
        views: [`${process.cwd()}/src`],
      })
      file.contents = Buffer.from(template(file.data))
      cb(null, file)
    } catch (err) {
      cb(new PluginError('gulp-ejs', err))
    }
  })
}

module.exports = gulpEjs
