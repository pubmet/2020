const headTitle = (tree) => {
  let times = 0
  tree.match({ tag: 'h1' }, (h1) => {
    if (times > 0 || !h1.content || !h1.content[0].trim()) {
      return h1
    }

    tree.match({ tag: 'head' }, (head) => {
      const title = head.content.find((node) => node.tag === 'title')
      title.content[0] = `${h1.content[0]} | ${title.content[0]}`
      return head
    })

    times += 1
    return h1
  })
}

module.exports = headTitle
