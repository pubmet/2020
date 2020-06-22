const gulp = require('gulp')
const rev = require('gulp-rev')
const revRewrite = require('gulp-rev-rewrite')
const { destDir } = require('../etc/build-config')

const revisionAssets = () => {
  return gulp
    .src(`${destDir}/**/*.{css,js}`)
    .pipe(rev())
    .pipe(gulp.src(`${destDir}/**/*.html`))
    .pipe(revRewrite())
    .pipe(gulp.dest(destDir))
}

module.exports = revisionAssets
