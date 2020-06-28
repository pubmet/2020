const browserSync = require('browser-sync')

const server = browserSync.create()
const noop = () => {}

const initializeServer = (done) => {
  server.init(
    {
      server: '.tmp',
      ui: false,
      open: false,
      notify: false,
    },
    done,
  )
}

const reloadServer = (done = noop) => {
  server.reload()
  done()
}

module.exports = {
  init: initializeServer,
  reload: reloadServer,
  stream: server.stream,
}
