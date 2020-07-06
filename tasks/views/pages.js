const gulp = require('gulp')
const gulpIf = require('gulp-if')
const markdown = require('./markdown')
const ejs = require('../../etc/gulp-ejs')
const data = require('gulp-data')
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
    .pipe(data({ locals }))
    .pipe(
      gulpIf(
        /\.ejs$/,
        ejs((file) => file.data.locals),
      ),
    )
    .pipe(posthtml())
    .pipe(prettyUrls())
    .pipe(gulp.dest(destDir))
}

const compilePages = () => {
  return compile(
    gulp.src('src/pages/**/*', {
      since: gulp.lastRun(compilePages),
    }),
  )
}

const compileAllPages = () => {
  return compile(gulp.src('src/pages/**/*')).pipe(touch())
}

const watchPages = () => {
  gulp.watch('src/pages/**/*', gulp.series(compilePages, server.reload))
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
