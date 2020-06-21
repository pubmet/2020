const posthtml = require('posthtml')
const dedent = require('dedent')
const pathPrefix = require('../posthtml-path-prefix')

describe('posthtml-path-prefix', () => {
  it('adds prefix to all paths starting from root', async () => {
    const result = await posthtml().use(pathPrefix({ prefix: '/root' }))
      .process(dedent`
        <script defer src="/script.js"></script>
        <link rel="stylesheet" href="/style.css">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="#toc">Table of contents</a>
      `)
    expect(result.html).toMatchInlineSnapshot(`
      "<script defer=\\"\\" src=\\"/root/script.js\\"></script>
      <link rel=\\"stylesheet\\" href=\\"/root/style.css\\">
      <a href=\\"/root\\">Home</a>
      <a href=\\"/root/about\\">About</a>
      <a href=\\"#toc\\">Table of contents</a>"
    `)
  })

  it('skips prefixing if requested', async () => {
    const result = await posthtml().use(pathPrefix({ prefix: '/root' }))
      .process(dedent`
        <a href="/another-root" skip-prefix>Another Root</a>
      `)
    expect(result.html).toMatchInlineSnapshot(
      `"<a href=\\"/another-root\\">Another Root</a>"`,
    )
  })
})
