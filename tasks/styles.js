const gulp = require('gulp')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const touch = require('../etc/gulp-touch')
const { isProd, destDir } = require('../etc/build-config')

const compileStyles = () => {
  return gulp
    .src('src/styles/main.css', { sourcemaps: !isProd })
    .pipe(postcss())
    .pipe(rename({ basename: 'style' }))
    .pipe(touch())
    .pipe(gulp.dest(destDir, { sourcemaps: !isProd }))
}

const watchStyles = () => {
  gulp.watch('src/styles/**/*', compileStyles)
}

module.exports = {
  compile: compileStyles,
  watch: watchStyles,
}
