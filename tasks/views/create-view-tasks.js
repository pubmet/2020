const gulp = require('gulp')
const data = require('gulp-data')
const gulpIf = require('gulp-if')
const noop = require('gulp-noop')
const getFrontmatter = require('./get-frontmatter')
const wrap = require('gulp-wrap')
const ejs = require('gulp-ejs')
const markdown = require('./markdown')
const posthtml = require('gulp-posthtml')
const prettyUrls = require('./pretty-urls')
const touch = require('../../etc/gulp-touch')
const lazypipe = require('lazypipe')
const transform = require('through2').obj
const globals = require('./globals')
const Case = require('case')

const PAGES_PATH = `${process.cwd()}/src/pages`

const ejsLayout = (src) =>
  lazypipe().pipe(wrap, { src }, (file) => file.data, {
    engine: 'ejs',
    views: [`${process.cwd()}/src`],
  })

const collectGlobals = (key, validate) => {
  return transform(async (file, enc, cb) => {
    if (file.isBuffer()) {
      const id = file.basename.replace(file.extname, '')
      const frontmatter = await getFrontmatter(file)
      try {
        if (validate) validate({ id, ...frontmatter })
      } catch (err) {
        cb(err)
        return
      }
      globals[key] = {
        ...globals[key],
        [id]: frontmatter,
      }
    }
    cb(null, file)
  })
}

const createViewTasks = ({
  taskId,
  src,
  layout,
  dest,
  collectionKey,
  validate,
  onChange = [],
}) => {
  const result = {}

  if (collectionKey) {
    result.collectGlobals = () => {
      return gulp.src(src).pipe(collectGlobals(collectionKey, validate))
    }
  }

  const layoutPre = layout ? ejsLayout(layout) : noop
  const layoutBase = ejsLayout('src/layouts/base.ejs')

  const compileBase = (stream) => {
    return stream
      .pipe(
        data(async (file) => ({
          ...globals,
          findPerson: (p, { withNumberedAffiliations = false } = {}) => {
            try {
              if (typeof p === 'string') {
                return p
              }
              const presenter = p.id ? globals.people[p.id] : p
              const presenterName = p.id
                ? `<a class="link" href="/people/${p.id}">${presenter.name}</a>`
                : presenter.name

              if (withNumberedAffiliations && presenter.affiliations) {
                const affiliations = presenter.affiliations
                  .map((i) => i + 1)
                  .join(',')
                return `${presenterName}<sup>${affiliations}</sup>`
              }

              return [presenterName, presenter.affiliation]
                .filter(Boolean)
                .join(', ')
            } catch (err) {
              console.error(p, err)
            }
          },
          frontmatter: await getFrontmatter(file),
          page: {
            path: file.path.startsWith(PAGES_PATH)
              ? file.path
                  .replace(PAGES_PATH, '')
                  .replace(/(index)?\.(html|md|ejs)$/, '')
              : undefined,
          },
        })),
      )
      .pipe(ejs({}, { views: [`${process.cwd()}/src`] }))
      .pipe(gulpIf(/\.md$/, markdown()))
      .pipe(gulpIf(layoutPre, layoutPre()))
      .pipe(layoutBase())
      .pipe(posthtml())
      .pipe(prettyUrls())
      .pipe(gulp.dest(dest))
  }

  result.compile = () =>
    compileBase(gulp.src(src, { since: gulp.lastRun(result.compile) }))

  result.compileAll = () => compileBase(gulp.src(src).pipe(touch()))

  Object.keys(result).forEach((key) => {
    Object.defineProperty(result[key], 'name', {
      value: Case.camel(`${taskId} ${key}`),
    })
  })

  let update = gulp.parallel(result.compile, ...onChange)

  if (result.collectGlobals) {
    update = gulp.series(result.collectGlobals, update)
  }

  result.watch = () => {
    gulp.watch(src, update)
    if (layout) {
      gulp.watch(layout, result.compileAll)
    }
  }

  return result
}

module.exports = createViewTasks
