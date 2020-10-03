const gulp = require('gulp')
const del = require('del')
const fsx = require('fs-extra')
const views = require('./tasks/views')
const styles = require('./tasks/styles')
const scripts = require('./tasks/scripts')
const static = require('./tasks/static')
const revisionAssets = require('./tasks/rev')
const server = require('./tasks/server')
const publish = require('./tasks/publish')
const checkForDeadUrls = require('./tasks/check-for-dead-urls')
const { destDir, prefix } = require('./etc/build-config')
const path = require('path')

require('dotenv-safe').config()

const clean = () => del(['.tmp', 'dist'])

const dev = gulp.series(
  clean,
  // watchScripts already builds scripts, so compileScripts is not needed here
  gulp.parallel(views.compile, styles.compile, static.copy),
  server.createInit(),
  gulp.parallel(views.watch, styles.watch, scripts.watch, static.watch),
)

const prefixDir = async () => {
  await fsx.rename(destDir, prefix)
  await fsx.mkdir(destDir)
  await fsx.rename(prefix, path.join(destDir, prefix))
}
const build = gulp.series(
  clean,
  gulp.parallel(views.compile, styles.compile, scripts.compile, static.copy),
  prefixDir,
  revisionAssets,
)

const deploy = gulp.series(build, checkForDeadUrls, publish)

module.exports = {
  dev,
  build,
  deploy,
  publish,
}
