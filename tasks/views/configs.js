const yaml = require('yamljs')
const pify = require('pify')
const { isProd } = require('../../etc/build-config')
const locals = require('./locals')

const pYaml = pify(yaml, { include: ['load'], errorFirst: false })

const loadConfigs = async () => {
  Object.assign(locals, {
    isProd,
    accommodation: await pYaml.load('config/accommodation.yml'),
    cloudinary: require('../../etc/cloudinary'),
    date: await pYaml.load('config/dates.yml'),
    navigation: require('../../config/navigation'),
    organization: await pYaml.load('config/organization.yml'),
    socialLinks: await pYaml.load('config/social.yml'),
    sponsors: await pYaml.load('config/sponsors.yml'),
    templates: await pYaml.load('config/templates.yml'),
    theme: require('tailwindcss/defaultTheme'),
    ...(await pYaml.load('config/site.yml')),
  })
}

module.exports = {
  load: loadConfigs,
}
