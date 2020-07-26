const gulp = require('gulp')
const pages = require('./pages')
const people = require('./people')
const configs = require('./configs')

const collectLocals = gulp.parallel(configs.load, people.collectMeta)
const compileViews = gulp.parallel(pages.compile, people.compile)
const compileAllViews = gulp.parallel(pages.compileAll, people.compileAll)

const watchViews = () => {
  pages.watch()
  people.watch()

  gulp.watch(['src/layouts/**/*', 'src/partials/**/*'], compileAllViews)
}

module.exports = {
  compile: gulp.series(collectLocals, compileViews),
  watch: watchViews,
}
