const through2 = require('through2')

// taken from: https://github.com/gulpjs/gulp/issues/2193#issuecomment-618079645
// but the correct fix would would be adding an enhanced stat object to vinyl:
// https://github.com/gulpjs/vinyl/issues/105

const touch = () =>
  through2.obj((file, enc, cb) => {
    if (file.stat) {
      file.stat.atime = file.stat.mtime = file.stat.ctime = new Date()
    }
    cb(null, file)
  })

module.exports = touch
