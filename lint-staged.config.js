module.exports = {
  '*.js': ['eslint --fix', 'jest --findRelatedTests'],
  '*.html': ['prettier --write'],
}
