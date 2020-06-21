const browserSync = require('browser-sync')

const server = browserSync.create()

const startServer = (done) => {
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

const reload = (done) => {
  server.reload()
  done()
}

module.exports = {
  server,
  startServer,
  reload,
}
