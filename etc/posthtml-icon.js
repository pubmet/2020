const classNames = require('classnames')

const icon = (tree) => {
  tree.match({ tag: 'icon' }, (node) => {
    const { id, ...svgAttrs } = node.attrs || {}
    return {
      tag: 'svg',
      attrs: {
        ...svgAttrs,
        class: classNames(svgAttrs.class, 'fill-current'),
      },
      content: [
        {
          tag: 'use',
          attrs: {
            href: `#${id}`,
          },
        },
      ],
    }
  })
}

module.exports = icon
