const dateFns = require('date-fns')
const classNames = require('classnames')

const defaultFormat = 'd MMMM y'

const date = (tree) => {
  tree.match({ tag: 'date' }, (node) => {
    const [value] = node.content
    const format = (node.attrs && node.attrs.format) || defaultFormat
    let values

    if (node.attrs) {
      delete node.attrs.format
    }

    try {
      values = JSON.parse(value)
    } catch (err) {
      values = [value]
    }

    const container = {
      tag: 'span',
      attrs: {
        ...node.attrs,
        class: 'inline-flex items-center space-x-2',
      },
      content: [],
    }

    for (const val of values) {
      container.content.push({
        tag: 'time',
        attrs: {
          datetime: val,
          class:
            classNames([
              val === values[values.length - 1] &&
                dateFns.isAfter(new Date(val), new Date()) &&
                node.attrs &&
                node.attrs.class,
              {
                'font-regular line-through opacity-50': dateFns.isBefore(
                  new Date(val),
                  new Date(),
                ),
              },
            ]) || undefined,
        },
        content: [dateFns.format(new Date(val), format)],
      })

      if (val !== values[values.length - 1]) {
        container.content.push({
          tag: 'icon',
          attrs: {
            id: 'arrow-right',
            class: 's-1',
            role: 'img',
            'aria-label': 'rightwards arrow',
          },
        })
      }
    }

    return container
  })
}

module.exports = date
