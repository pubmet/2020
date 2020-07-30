const gulp = require('gulp')
const globby = require('globby')
const posthtml = require('posthtml')
const urls = require('posthtml-urls')
const server = require('./server')
const checkLinks = require('check-links')
const fsx = require('fs-extra')
const { destDir } = require('../etc/build-config')

const exceptions = [
  'https://igdore.org/',
  // 2015 is offline for some reason
  'http://pubmet.unizd.hr/pubmet2015',
]

const checkForDeadUrls = async () => {
  const files = await globby(`${destDir}/**/*.html`)

  const urlSet = new Set()
  const ph = posthtml().use(
    urls({
      eachURL: (url) => {
        if (
          exceptions.includes(url) ||
          url.startsWith('#') ||
          url.startsWith('mailto:')
        ) {
          return
        }
        urlSet.add(url)
      },
    }),
  )

  await Promise.all(
    files.map(async (file) => {
      await ph.process(await fsx.readFile(file))
    }),
  )

  const results = await checkLinks(Array.from(urlSet))
  const deadUrls = Array.from(urlSet).filter(
    (url) => results[url].status === 'dead',
  )

  if (deadUrls.length > 0) {
    throw new Error(`Dead URLS:\n\n${deadUrls.join('\n')}`)
  }
}

module.exports = gulp.series(
  server.createInit({ logLevel: 'silent' }),
  checkForDeadUrls,
  server.exit,
)
