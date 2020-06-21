const gulp = require('gulp')
const rename = require('gulp-rename')
const posthtml = require('gulp-posthtml')
const remark = require('gulp-remark')
const detectFrontmatter = require('remark-frontmatter')
const smartypants = require('@silvenon/remark-smartypants')
const gridTables = require('remark-grid-tables')
const remarkRehype = require('remark-rehype')
const rehypeStringify = require('rehype-stringify')
const wrap = require('gulp-wrap')
const lazypipe = require('lazypipe')
const filter = require('gulp-filter')
const gulpIf = require('gulp-if')
const transform = require('through2').obj
const saveFrontmatter = require('../etc/remark-save-frontmatter')
const removeFrontmatter = require('../etc/remark-remove-frontmatter')
const { reload } = require('./server')
const touch = require('../etc/gulp-touch')
const siteConfig = require('../etc/site-config')
const { destDir } = require('../etc/build-config')

const speakers = {}

const markdown = lazypipe().pipe(() =>
  remark()
    .use(detectFrontmatter)
    .use(saveFrontmatter)
    .use(removeFrontmatter)
    .use(gridTables)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true }),
)

const collectSpeakerData = () =>
  gulp
    .src('src/speakers/*.md', { since: gulp.lastRun(collectSpeakerData) })
    .pipe(remark().use(detectFrontmatter).use(saveFrontmatter))
    .pipe(
      transform((file, enc, cb) => {
        if (file.isBuffer()) {
          const id = file.basename.replace(file.extname, '')
          speakers[id] = { id, ...file.data.frontmatter }
        }
        cb(null, file)
      }),
    )

const compileViews = (stream) => {
  const mdFilter = filter((file) => /\.md$/.test(file.path), { restore: true })
  return stream
    .pipe(mdFilter)
    .pipe(markdown())
    .pipe(
      gulpIf(
        /speakers/,
        wrap({ src: 'src/layouts/md-speaker.html' }),
        wrap({ src: 'src/layouts/md-page.html' }),
      ),
    )
    .pipe(mdFilter.restore)
    .pipe(
      posthtml({
        locals: {
          ...siteConfig,
          speakers: Object.values(speakers),
        },
      }),
    )
    .pipe(
      rename(({ dirname, basename }) =>
        basename !== 'index'
          ? {
              dirname: `${dirname}/${basename}`,
              basename: 'index',
              extname: '.html',
            }
          : {
              dirname,
              basename,
              extname: '.html',
            },
      ),
    )
    .pipe(touch())
    .pipe(gulp.dest(destDir))
}

const compilePages = () =>
  compileViews(
    gulp.src('src/pages/**/*.{html,md}', {
      since: gulp.lastRun(compilePages),
    }),
  )
const compileAllPages = () => compileViews(gulp.src('src/pages/**/*.{html,md}'))
const compileSpeakers = () =>
  compileViews(
    gulp.src('src/speakers/*.md', {
      base: 'src',
      since: gulp.lastRun(compileSpeakers),
    }),
  )
const compileAllSpeakers = () =>
  compileViews(
    gulp.src('src/speakers/*.md', {
      base: 'src',
    }),
  )
const compilePagesWithSpeakerInfo = () =>
  compileViews(gulp.src(['src/pages/index.html']))

const watchViews = () => {
  gulp.watch(
    'src/speakers/*.md',
    gulp.series(
      collectSpeakerData,
      gulp.parallel(compileSpeakers, compilePagesWithSpeakerInfo),
      reload,
    ),
  )
  gulp.watch('src/pages/**/*.{html,md}', gulp.series(compilePages, reload))
  gulp.watch('src/layouts/md-page.html', gulp.series(compileAllPages, reload))
  gulp.watch(
    'src/layouts/md-speaker.html',
    gulp.series(compileAllSpeakers, reload),
  )
  gulp.watch(
    ['src/layouts/default.html', 'src/partials/*.html'],
    gulp.series(compileAllSpeakers, compileAllPages, reload),
  )
}

module.exports = {
  compileViews: gulp.series(
    collectSpeakerData,
    gulp.parallel(compileSpeakers, compilePages),
  ),
  watchViews,
}
