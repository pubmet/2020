const cloudinary = require('cloudinary-tiny-js').default

const cl = cloudinary({
  cloudName: 'pubmet',
})

module.exports = cl
