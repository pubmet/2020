const lazypipe = require('lazypipe')
const remark = require('gulp-remark')
const detectFrontmatter = require('remark-frontmatter')
const saveFrontmatter = require('../../etc/remark-save-frontmatter')
const removeFrontmatter = require('../../etc/remark-remove-frontmatter')
const smartypants = require('@silvenon/remark-smartypants')
const gridTables = require('remark-grid-tables')
const remarkRehype = require('remark-rehype')
const rehypeStringify = require('rehype-stringify')

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

module.exports = markdown
