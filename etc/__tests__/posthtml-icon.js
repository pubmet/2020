const posthtml = require('posthtml')
const dedent = require('dedent')
const icon = require('../posthtml-icon')

describe('posthtml-icon', () => {
  it('supports sizing', async () => {
    const result = await posthtml().use(icon).process(dedent`
      <icon id="location"></icon>
    `)
    expect(result.html).toMatchInlineSnapshot(
      `"<svg class=\\"fill-current\\"><use href=\\"#location\\"></use></svg>"`,
    )
  })

  it('forwards attributes to the <svg>', async () => {
    const result = await posthtml().use(icon).process(dedent`
      <icon id="location" class="location" role="img" aria-label="location"></icon>
    `)
    expect(result.html).toMatchInlineSnapshot(
      `"<svg class=\\"location fill-current\\" role=\\"img\\" aria-label=\\"location\\"><use href=\\"#location\\"></use></svg>"`,
    )
  })
})
