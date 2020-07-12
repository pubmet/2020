const gulp = require('gulp')
const globby = require('globby')
const posthtml = require('posthtml')
const server = require('./server')
const checkLinks = require('check-links')
const fsx = require('fs-extra')
const { destDir } = require('../etc/build-config')

const exceptions = [
  // 2015 is offline for some reason
  'http://pubmet.unizd.hr/pubmet2015',
]

const checkForDeadUrls = async () => {
  const files = await globby(`${destDir}/**/*.html`)

  const urls = []
  const collectUrls = (tree) => {
    for (const attr of ['href', 'src']) {
      tree.match({ attrs: { [attr]: /.*/ } }, (node) => {
        if (
          exceptions.includes(node.attrs[attr]) ||
          node.attrs[attr].startsWith('#') ||
          node.attrs[attr].startsWith('mailto:')
        ) {
          return
        }
        if (node.attrs[attr].startsWith('/')) {
          urls.push(`http://localhost:${server.port}${node.attrs[attr]}`)
        } else {
          urls.push(node.attrs[attr])
        }
      })
    }
  }

  const ph = posthtml([collectUrls])
  await Promise.all(
    files.map(async (file) => {
      await ph.process(await fsx.readFile(file))
    }),
  )

  const uniqueUrls = [...new Set(urls)]
  const results = await checkLinks(uniqueUrls)
  const deadUrls = Object.entries(results)
    .filter(([, result]) => result.status === 'dead')
    .map(([url]) => url)

  if (deadUrls.length > 0) {
    throw new Error(`Dead URLS:\n\n${deadUrls.join('\n')}`)
  }
}

module.exports = gulp.series(
  server.init({ logLevel: 'silent' }),
  checkForDeadUrls,
  server.exit,
)
