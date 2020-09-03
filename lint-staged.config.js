module.exports = {
  '*.js': ['eslint --fix', 'jest --findRelatedTests'],
  '*.{html,md,css}': ['prettier --write'],
  '*.ejs': ['prettier --parser html --write'],
}
