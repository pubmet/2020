const posthtml = require('posthtml')
const headTitle = require('../posthtml-head-title')
const dedent = require('dedent')

describe('posthtml-head', () => {
  it('uses <h1> for <title>', async () => {
    const result = await posthtml().use(headTitle).process(dedent`
      <head>
        <title>PUBMET2020</title>
      </head>

      <body>
        <h1>Home</h1>
        <svg>
          <title>My icon</title>
        </svg>
      </body>
    `)
    expect(result.html).toMatchInlineSnapshot(`
      "<head>
        <title>Home | PUBMET2020</title>
      </head>

      <body>
        <h1>Home</h1>
        <svg>
          <title>My icon</title>
        </svg>
      </body>"
    `)
  })

  it('leaves <title> as-is if <h1> is empty', async () => {
    const result = await posthtml().use(headTitle).process(dedent`
      <head>
        <title>PUBMET2020</title>
      </head>

      <body>
        <h1></h1>
      </body>
    `)
    expect(result.html).toMatchInlineSnapshot(`
      "<head>
        <title>PUBMET2020</title>
      </head>

      <body>
        <h1></h1>
      </body>"
    `)
  })
})
