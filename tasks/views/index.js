const gulp = require('gulp')
const pages = require('./pages')
const speakers = require('./speakers')
const configs = require('./configs')

const collectLocals = gulp.parallel(configs.load, speakers.collectMeta)
const compileViews = gulp.parallel(pages.compile, speakers.compile)
const compileAllViews = gulp.parallel(pages.compileAll, speakers.compileAll)

const watchViews = () => {
  pages.watch()
  speakers.watch()

  gulp.watch(['src/layouts/**/*', 'src/partials/**/*'], compileAllViews)
}

module.exports = {
  compile: gulp.series(collectLocals, compileViews),
  watch: watchViews,
}
