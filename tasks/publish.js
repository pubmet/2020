const pubmet = require('@pubmet/scripts')
const { destDir } = require('../etc/build-config')

const publish = async () => {
  await pubmet.deployDir({
    localDir: `${destDir}/pubmet2020`,
    remoteDir: 'pubmet2020',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  })
}

module.exports = publish
