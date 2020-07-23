const browserSync = require('browser-sync')
const htmlInjector = require('bs-html-injector')
const { isProd, destDir } = require('../etc/build-config')

const port = 3000

const server = browserSync.create()

const createInitServer = (options = {}) => {
  const initServer = (done) => {
    if (!isProd) {
      server.use(htmlInjector, {
        files: `${destDir}/**/*.html`,
      })
    }
    server.init(
      {
        port,
        server: destDir,
        ui: false,
        open: false,
        notify: false,
        files: [`${destDir}/**/*.css`, `${destDir}/**/*.js`],
        ...options,
      },
      done,
    )
  }
  return initServer
}

const exitServer = (done) => {
  server.exit()
  done()
}

module.exports = {
  createInit: createInitServer,
  exit: exitServer,
  port,
}
