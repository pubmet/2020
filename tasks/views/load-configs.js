const globby = require('globby')
const path = require('path')
const yaml = require('yamljs')
const pify = require('pify')
const { isProd } = require('../../etc/build-config')
const globals = require('./globals')

const pYaml = pify(yaml, { include: ['load'], errorFirst: false })

const loadConfigs = async () => {
  const yamlFiles = await globby('config/*.yml')

  await Promise.all(
    yamlFiles.map(async (file) => {
      const config = await pYaml.load(file)
      const key = path.basename(file, path.extname(file))
      globals[key] = config
    }),
  )

  Object.assign(globals, {
    isProd,
    capitalize: require('capitalize'),
    cloudinary: require('../../etc/cloudinary'),
    dateFns: require('date-fns'),
    navigation: require('../../config/navigation'),
    pluralize: require('pluralize'),
    sortBy: require('lodash/sortBy'),
    theme: require('tailwindcss/defaultTheme'),
  })
}

module.exports = loadConfigs
