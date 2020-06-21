module.exports = (api) => {
  if (api.env('test')) return {}
  return {
    presets: ['@babel/env'],
  }
}
