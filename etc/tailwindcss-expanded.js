const plugin = require('tailwindcss/plugin')

module.exports = plugin(({ addVariant, e }) => {
  addVariant('expanded', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return [
        `.${e(`expanded${separator}${className}`)}[aria-expanded="true"]`,
        `[aria-expanded="true"] .${e(`expanded${separator}${className}`)}`,
      ].join(', ')
    })
  })
})
