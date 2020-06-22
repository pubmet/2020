const gulp = require('gulp')
const del = require('del')
const fsx = require('fs-extra')
const { compileViews, watchViews } = require('./tasks/views')
const { compileStyles, watchStyles } = require('./tasks/styles')
const { compileScripts, watchScripts } = require('./tasks/scripts')
const { copyStatic, watchStatic } = require('./tasks/static')
const { startServer } = require('./tasks/server')
const publish = require('./tasks/publish')
const { destDir } = require('./etc/build-config')

require('dotenv-safe').config()

const clean = () => del(['.tmp', 'dist'])

const dev = gulp.series(
  clean,
  gulp.parallel(compileViews, compileStyles, compileScripts, copyStatic),
  startServer,
  gulp.parallel(watchViews, watchStyles, watchScripts, watchStatic),
)

const prefixDir = async () => {
  await fsx.rename(destDir, 'pubmet2020')
  await fsx.mkdir(destDir)
  await fsx.rename('pubmet2020', `${destDir}/pubmet2020`)
}
const build = gulp.series(
  clean,
  gulp.parallel(compileViews, compileStyles, compileScripts, copyStatic),
  prefixDir,
)

const deploy = gulp.series(build, publish)

module.exports = {
  dev,
  build,
  deploy,
}
