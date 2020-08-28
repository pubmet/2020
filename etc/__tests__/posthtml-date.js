const posthtml = require('posthtml')
const dedent = require('dedent')
const date = require('../posthtml-date')

describe('posthtml-date', () => {
  it('uses defined format', async () => {
    const result = await posthtml().use(date).process(dedent`
      <date format="d">2018-11-18</date>
    `)
    expect(result.html).toMatchInlineSnapshot(
      `"<span class=\\"inline-flex items-center space-x-2\\"><time datetime=\\"2018-11-18\\" class=\\"font-regular line-through opacity-50\\">18</time></span>"`,
    )
  })

  it('falls back to default format', async () => {
    const result = await posthtml().use(date).process(dedent`
      <date>2018-11-18</date>
    `)
    expect(result.html).toMatchInlineSnapshot(
      `"<span class=\\"inline-flex items-center space-x-2\\"><time datetime=\\"2018-11-18\\" class=\\"font-regular line-through opacity-50\\">18 November 2018</time></span>"`,
    )
  })

  it('renders multiple dates as past', async () => {
    const result = await posthtml().use(date).process(dedent`
      <date class="text-black">2018-11-18,2018-12-02</date>
    `)
    expect(result.html).toMatchInlineSnapshot(
      `"<span class=\\"inline-flex items-center space-x-2\\"><time datetime=\\"2018-11-18\\" class=\\"font-regular line-through opacity-50\\">18 November 2018</time><icon id=\\"arrow-right\\" class=\\"s-1\\" role=\\"img\\" aria-label=\\"rightwards arrow\\"></icon><time datetime=\\"2018-12-02\\" class=\\"font-regular line-through opacity-50\\">2 December 2018</time></span>"`,
    )
  })
})
