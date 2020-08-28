const gulp = require('gulp')
const createViewTasks = require('./create-view-tasks')
const loadConfigs = require('./load-configs')
const { destDir } = require('../../etc/build-config')

const pagesMd = createViewTasks({
  taskId: 'pagesMd',
  src: 'src/pages/**/*.md',
  layout: 'src/layouts/text.ejs',
  dest: destDir,
})

const pagesEjs = createViewTasks({
  taskId: 'pagesEjs',
  src: 'src/pages/**/*.ejs',
  dest: destDir,
})

const people = createViewTasks({
  taskId: 'people',
  src: 'src/people/**/*.md',
  layout: 'src/layouts/person.ejs',
  dest: `${destDir}/people`,
  collectionKey: 'people',
  onChange: [pagesEjs.compileAll],
})

const events = createViewTasks({
  taskId: 'events',
  src: 'src/events/*.md',
  layout: 'src/layouts/event.ejs',
  dest: `${destDir}/programme`,
  collectionKey: 'events',
  onChange: [pagesEjs.compileAll],
})

const collectGlobals = gulp.parallel(
  loadConfigs,
  people.collectGlobals,
  events.collectGlobals,
)

const compileViews = gulp.parallel(
  pagesMd.compile,
  pagesEjs.compile,
  people.compile,
  events.compile,
)

const compileAllViews = gulp.parallel(
  pagesMd.compileAll,
  pagesEjs.compileAll,
  people.compileAll,
  events.compileAll,
)

const watchViews = () => {
  pagesMd.watch()
  pagesEjs.watch()
  people.watch()
  events.watch()

  gulp.watch(['src/layouts/base.ejs', 'src/partials/**/*'], compileAllViews)
  gulp.watch('config/*', gulp.series(loadConfigs, compileAllViews))
}

module.exports = {
  compile: gulp.series(collectGlobals, compileViews),
  watch: watchViews,
}
