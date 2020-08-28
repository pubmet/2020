const remark = require('remark')
const detectFrontmatter = require('remark-frontmatter')
const saveFrontmatter = require('../../etc/remark-save-frontmatter')

const getFrontmatter = async (vinyl) => {
  const vfile = await remark()
    .use(detectFrontmatter)
    .use(saveFrontmatter)
    .process(vinyl.contents.toString())
  return vfile.data.frontmatter
}

module.exports = getFrontmatter
