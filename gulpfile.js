const gulp = require('gulp')
const del = require('del')
const { compileViews, watchViews } = require('./tasks/views')
const { compileStyles, watchStyles } = require('./tasks/styles')
const { compileScripts, watchScripts } = require('./tasks/scripts')
const { copyStatic, watchStatic } = require('./tasks/static')
const { startServer } = require('./tasks/server')

const clean = () => del(['.tmp', 'dist'])

const dev = gulp.series(
  clean,
  gulp.parallel(compileViews, compileStyles, compileScripts, copyStatic),
  startServer,
  gulp.parallel(watchViews, watchStyles, watchScripts, watchStatic),
)

const build = gulp.series(
  clean,
  gulp.parallel(compileViews, compileStyles, compileScripts, copyStatic),
)

module.exports = {
  dev,
  build,
}
