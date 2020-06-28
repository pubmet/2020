const gulp = require('gulp')
const gulpIf = require('gulp-if')
const markdown = require('./markdown')
const wrap = require('gulp-wrap')
const posthtml = require('gulp-posthtml')
const prettyUrls = require('./pretty-urls')
const server = require('../server')
const touch = require('../../etc/gulp-touch')
const locals = require('./locals')
const { destDir } = require('../../etc/build-config')

const compile = (stream) => {
  return stream
    .pipe(gulpIf(/\.md$/, markdown()))
    .pipe(gulpIf(/\.md$/, wrap({ src: 'src/layouts/md-page.html' })))
    .pipe(posthtml({ locals }))
    .pipe(prettyUrls())
    .pipe(gulp.dest(destDir))
}

const compilePages = () => {
  return compile(
    gulp.src('src/pages/**/*.{html,md}', { since: gulp.lastRun(compilePages) }),
  )
}

const compileAllPages = () => {
  return compile(gulp.src('src/pages/**/*.{html,md}')).pipe(touch())
}

const watchPages = () => {
  gulp.watch(
    'src/pages/**/*.{html,md}',
    gulp.series(compilePages, server.reload),
  )
  gulp.watch(
    'src/layouts/md-page.html',
    gulp.series(compileAllPages, server.reload),
  )
}

module.exports = {
  compile: compilePages,
  compileAll: compileAllPages,
  watch: watchPages,
}
