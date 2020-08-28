const remark = require('gulp-remark')
const detectFrontmatter = require('remark-frontmatter')
const removeFrontmatter = require('../../etc/remark-remove-frontmatter')
const smartypants = require('@silvenon/remark-smartypants')
const gridTables = require('remark-grid-tables')
const remarkRehype = require('remark-rehype')
const rehypeStringify = require('rehype-stringify')
const lazypipe = require('lazypipe')

const markdown = lazypipe().pipe(() =>
  remark({ quiet: true })
    .use(detectFrontmatter)
    .use(removeFrontmatter)
    .use(gridTables)
    .use(smartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true }),
)

module.exports = markdown
