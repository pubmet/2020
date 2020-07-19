const browserSync = require('browser-sync')
const htmlInjector = require('bs-html-injector')
const { isProd, destDir } = require('../etc/build-config')

const port = 3000

const server = browserSync.create()

const createInitializeServer = (options = {}) => {
  const initializeServer = (done) => {
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
        files: `${destDir}/**/*.{css,js}`,
        ...options,
      },
      done,
    )
  }
  return initializeServer
}

const exitServer = (done) => {
  server.exit()
  done()
}

module.exports = {
  init: createInitializeServer,
  exit: exitServer,
  port,
}
