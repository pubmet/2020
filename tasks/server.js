const browserSync = require('browser-sync')
const { destDir } = require('../etc/build-config')

const port = 3000

const server = browserSync.create()
const noop = () => {}

const createInitializeServer = (options = {}) => {
  const initializeServer = (done) => {
    server.init(
      {
        port,
        server: destDir,
        ui: false,
        open: false,
        notify: false,
        ...options,
      },
      done,
    )
  }
  return initializeServer
}

const reloadServer = (done = noop) => {
  server.reload()
  done()
}

const exitServer = (done) => {
  server.exit()
  done()
}

module.exports = {
  init: createInitializeServer,
  reload: reloadServer,
  stream: server.stream,
  exit: exitServer,
  port,
}
