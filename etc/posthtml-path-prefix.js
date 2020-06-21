const path = require('path')

const reFromRoot = /^\//

const configure = ({ prefix = '' } = {}) => {
  const pathPrefix = (tree) => {
    tree.match(
      [
        {
          attrs: {
            href: reFromRoot,
          },
        },
        {
          attrs: {
            src: reFromRoot,
          },
        },
      ],
      (node) => {
        if (node.attrs.hasOwnProperty('skip-prefix')) {
          delete node.attrs['skip-prefix']
          return node
        }

        const addPrefix = (attr) => {
          node.attrs[attr] = path.join(
            prefix,
            node.attrs[attr].replace(/^\//, ''),
          )
        }

        if (node.attrs.href) {
          addPrefix('href')
        }
        if (node.attrs.src) {
          addPrefix('src')
        }

        return node
      },
    )
  }

  return pathPrefix
}

module.exports = configure
