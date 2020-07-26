const gulp = require('gulp')
const remark = require('gulp-remark')
const detectFrontmatter = require('remark-frontmatter')
const saveFrontmatter = require('../../etc/remark-save-frontmatter')
const markdown = require('./markdown')
const wrap = require('gulp-wrap')
const data = require('gulp-data')
const prettyUrls = require('./pretty-urls')
const posthtml = require('gulp-posthtml')
const touch = require('../../etc/gulp-touch')
const pages = require('./pages')
const transform = require('through2').obj
const sortBy = require('lodash/sortBy')
const locals = require('./locals')
const { destDir } = require('../../etc/build-config')

locals.people = []

const collectPersonMeta = () => {
  return gulp
    .src('src/people/*.md', { since: gulp.lastRun(collectPersonMeta) })
    .pipe(remark().use(detectFrontmatter).use(saveFrontmatter))
    .pipe(
      transform((file, enc, cb) => {
        if (file.isBuffer()) {
          const person = {
            id: file.basename.replace(file.extname, ''),
            ...file.data.frontmatter,
          }

          const existingIndex = locals.people.findIndex(
            (p) => p.id === person.id,
          )
          if (existingIndex !== -1) {
            locals.people.splice(existingIndex, 1, person)
          } else {
            locals.people.push(person)
            locals.people = sortBy(locals.people, (p) => p.name)
          }
        }
        cb(null, file)
      }),
    )
}

const compile = (stream) => {
  return stream
    .pipe(markdown())
    .pipe(wrap({ src: 'src/layouts/md-person.html' }))
    .pipe(data({ locals }))
    .pipe(posthtml())
    .pipe(prettyUrls())
    .pipe(gulp.dest(`${destDir}/people`))
}

const compilePeople = () => {
  return compile(
    gulp.src('src/people/*.md', { since: gulp.lastRun(compilePeople) }),
  )
}

const compileAllPeople = () => {
  return compile(gulp.src('src/people/*.md').pipe(touch()))
}

const watchPeople = () => {
  gulp.watch(
    'src/people/*.md',
    gulp.series(
      collectPersonMeta,
      gulp.parallel(compilePeople, pages.compileAll),
    ),
  )
  gulp.watch('src/layouts/md-person.html', compileAllPeople)
}

module.exports = {
  collectMeta: collectPersonMeta,
  compile: compilePeople,
  compileAll: compileAllPeople,
  watch: watchPeople,
}
