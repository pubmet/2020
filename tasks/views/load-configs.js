const yaml = require('yamljs')
const pify = require('pify')
const { isProd } = require('../../etc/build-config')
const globals = require('./globals')

const pYaml = pify(yaml, { include: ['load'], errorFirst: false })

const loadConfigs = async () => {
  Object.assign(globals, {
    isProd,
    accommodation: await pYaml.load('config/accommodation.yml'),
    capitalize: require('capitalize'),
    cloudinary: require('../../etc/cloudinary'),
    date: await pYaml.load('config/dates.yml'),
    dateFns: require('date-fns'),
    navigation: require('../../config/navigation'),
    organization: await pYaml.load('config/organization.yml'),
    pluralize: require('pluralize'),
    programme: await pYaml.load('config/programme.yml'),
    socialLinks: await pYaml.load('config/social.yml'),
    sortBy: require('lodash/sortBy'),
    sponsors: await pYaml.load('config/sponsors.yml'),
    templates: await pYaml.load('config/templates.yml'),
    theme: require('tailwindcss/defaultTheme'),
    ...(await pYaml.load('config/site.yml')),
  })
}

module.exports = loadConfigs
