const gulp = require('gulp')
const pages = require('./pages')
const people = require('./people')
const events = require('./events')
const configs = require('./configs')

const collectLocals = gulp.parallel(
  configs.load,
  people.collectMeta,
  events.collectMeta,
)
const compileViews = gulp.parallel(
  pages.compile,
  people.compile,
  events.compile,
)
const compileAllViews = gulp.parallel(
  pages.compileAll,
  people.compileAll,
  events.compileAll,
)

const watchViews = () => {
  pages.watch()
  people.watch()
  events.watch()

  gulp.watch(['src/layouts/default.html', 'src/partials/**/*'], compileAllViews)
  gulp.watch('config/*', gulp.series(configs.load, compileAllViews))
}

module.exports = {
  compile: gulp.series(collectLocals, compileViews),
  watch: watchViews,
}
