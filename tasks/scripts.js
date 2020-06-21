const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const { prependText } = require('gulp-append-prepend')
const uglify = require('gulp-uglify')
const gulpIf = require('gulp-if')
const theme = require('tailwindcss/defaultTheme')
const { server } = require('./server')
const { isProd, destDir } = require('../etc/build-config')

const compileScripts = () => {
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(gulpIf(isProd, babel()))
    .pipe(concat('script.js'))
    .pipe(
      prependText(
        `window.screens = ${JSON.stringify(theme.screens, null, 2)};\n\n`,
      ),
    )
    .pipe(gulpIf(isProd, uglify()))
    .pipe(gulp.dest(destDir))
    .pipe(server.stream({ once: true }))
}

const watchScripts = () => {
  gulp.watch('src/scripts/*.js', compileScripts)
}

module.exports = {
  compileScripts,
  watchScripts,
}
