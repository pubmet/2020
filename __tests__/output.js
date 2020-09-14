const globby = require('globby')
const fsx = require('fs-extra')

describe('output', () => {
  test.each(
    globby
      .sync('dist/**/*.html')
      .map((file) => file.replace('dist/pubmet2020/', '')),
  )('%s', async (file) => {
    const content = await fsx.readFile(`dist/pubmet2020/${file}`)
    expect(await String(content)).toMatchSnapshot()
  })
})
