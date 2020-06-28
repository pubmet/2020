const gulp = require('gulp')
const remark = require('gulp-remark')
const detectFrontmatter = require('remark-frontmatter')
const saveFrontmatter = require('../../etc/remark-save-frontmatter')
const markdown = require('./markdown')
const wrap = require('gulp-wrap')
const prettyUrls = require('./pretty-urls')
const posthtml = require('gulp-posthtml')
const touch = require('../../etc/gulp-touch')
const pages = require('./pages')
const server = require('../server')
const transform = require('through2').obj
const locals = require('./locals')
const { destDir } = require('../../etc/build-config')

locals.speakers = {}
const collectSpeakerMeta = () => {
  return gulp
    .src('src/speakers/*.md', { since: gulp.lastRun(collectSpeakerMeta) })
    .pipe(remark().use(detectFrontmatter).use(saveFrontmatter))
    .pipe(
      transform((file, enc, cb) => {
        if (file.isBuffer()) {
          const id = file.basename.replace(file.extname, '')
          locals.speakers[id] = file.data.frontmatter
        }
        cb(null, file)
      }),
    )
}

const compile = (stream) => {
  return stream
    .pipe(markdown())
    .pipe(wrap({ src: 'src/layouts/md-speaker.html' }))
    .pipe(posthtml({ locals }))
    .pipe(prettyUrls())
    .pipe(gulp.dest(destDir))
}

const compileSpeakers = () => {
  return compile(
    gulp.src('src/speakers/*.md', { since: gulp.lastRun(compileSpeakers) }),
  )
}

const compileAllSpeakers = () => {
  return compile(gulp.src('src/speakers/*.md').pipe(touch()))
}

const watchSpeakers = () => {
  gulp.watch(
    'src/speakers/*.md',
    gulp.series(
      collectSpeakerMeta,
      gulp.parallel(compileSpeakers, pages.compileAll),
      server.reload,
    ),
  )
  gulp.watch(
    'src/layouts/md-speaker.html',
    gulp.series(compileAllSpeakers, server.reload),
  )
}

module.exports = {
  collectMeta: collectSpeakerMeta,
  compile: compileSpeakers,
  compileAll: compileAllSpeakers,
  watch: watchSpeakers,
}
