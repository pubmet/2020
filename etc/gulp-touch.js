const through2 = require('through2')

// https://github.com/gulpjs/gulp/issues/2193#issuecomment-618079645

const touch = () =>
  through2.obj((file, enc, cb) => {
    if (file.stat) {
      file.stat.atime = file.stat.mtime = file.stat.ctime = new Date()
    }
    cb(null, file)
  })

module.exports = touch
