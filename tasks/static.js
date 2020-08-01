const gulp = require('gulp')
const { destDir } = require('../etc/build-config')

const copyStatic = () => {
  return gulp.src('src/static/**/*', { dot: true }).pipe(gulp.dest(destDir))
}

const watchStatic = () => {
  gulp.watch('src/static/**/*', copyStatic)
}

module.exports = {
  copy: copyStatic,
  watch: watchStatic,
}
