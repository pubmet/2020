const gulp = require('gulp')
const remark = require('gulp-remark')
const detectFrontmatter = require('remark-frontmatter')
const saveFrontmatter = require('../../etc/remark-save-frontmatter')
const wrap = require('gulp-wrap')
const data = require('gulp-data')
const ejs = require('../../etc/gulp-ejs')
const posthtml = require('gulp-posthtml')
const touch = require('../../etc/gulp-touch')
const prettyUrls = require('../utils/pretty-urls')
const markdown = require('../utils/markdown')
const transform = require('through2').obj
const pages = require('./pages')
const { destDir } = require('../../etc/build-config')
const locals = require('./locals')

locals.events = []

const collectEventMeta = () => {
  return gulp
    .src('src/events/*.md', { since: gulp.lastRun(collectEventMeta) })
    .pipe(remark().use(detectFrontmatter).use(saveFrontmatter))
    .pipe(
      transform((file, enc, cb) => {
        if (file.isBuffer()) {
          const event = {
            id: file.basename.replace(file.extname, ''),
            ...file.data.frontmatter,
          }
          const existingIndex = locals.events.findIndex(
            (p) => p.id === event.id,
          )
          if (existingIndex !== -1) {
            locals.events.splice(existingIndex, 1, event)
          } else {
            locals.events.push(event)
          }
        }
        cb(null, file)
      }),
    )
}

const compile = (stream) => {
  return stream
    .pipe(markdown())
    .pipe(
      wrap({ src: 'src/layouts/event-md.ejs' }, locals, {
        engine: 'ejs',
        views: [`${process.cwd()}/src`],
      }),
    )
    .pipe(data({ locals }))
    .pipe(ejs(locals))
    .pipe(posthtml())
    .pipe(prettyUrls())
    .pipe(gulp.dest(`${destDir}/programme`))
}

const compileEvents = () =>
  compile(gulp.src('src/events/*.md', { since: gulp.lastRun(compileEvents) }))

const compileAllEvents = () =>
  compile(gulp.src('src/events/*.md').pipe(touch()))

const watchEvents = () => {
  gulp.watch('src/events/*.md', gulp.parallel(compileEvents, pages.compileAll))
  gulp.watch('src/layouts/event-md.ejs', compileAllEvents)
}

module.exports = {
  collectMeta: collectEventMeta,
  compile: compileEvents,
  compileAll: compileAllEvents,
  watch: watchEvents,
}
