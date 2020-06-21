// accessible flyout menus
// https://www.w3.org/WAI/tutorials/menus/flyout/

const screenSmMq = window.matchMedia(`(min-width: ${window.screens.sm})`)
const hoverMq = window.matchMedia('(any-hover: hover)')

/* mobile */

const clickDrop = document.querySelector('[data-name=click-drop]')

clickDrop.addEventListener('click', () => {
  if (screenSmMq.matches) return
  document.querySelectorAll('[data-navigation=menu]').forEach((menu) => {
    menu.classList.replace('block', 'hidden')
    menu
      .closest('li, [data-navigation=container]')
      .querySelector('[data-navigation=toggle]')
      .setAttribute('aria-expanded', false)
    clickDrop.classList.add('hidden')
  })
})

Array.from(document.querySelectorAll('[data-navigation=toggle]')).forEach(
  (toggle) => {
    toggle.addEventListener('click', () => {
      if (screenSmMq.matches) return
      const closestEl = toggle.closest('li, [data-navigation=container]')
      const menu = closestEl.querySelector('[data-navigation=menu]')
      const isMain = closestEl.dataset.navigation === 'container'
      if (toggle.getAttribute('aria-expanded') === 'false') {
        menu.classList.replace('hidden', 'block')
        toggle.setAttribute('aria-expanded', true)
        if (isMain) {
          clickDrop.classList.remove('hidden')
        }
      } else {
        menu.classList.replace('block', 'hidden')
        toggle.setAttribute('aria-expanded', false)
        if (isMain) {
          clickDrop.classList.add('hidden')
        }
      }
    })
  },
)

/* other */

// adds a11y, transitions and delays

const forceReflow = (node) => {
  node.scrollTop
}

Array.from(document.querySelectorAll('[data-navigation=menu] > li'))
  .filter(
    (menuItem) => menuItem.querySelector('[data-navigation=menu]') !== null,
  )
  .forEach((menuItem) => {
    const toggle = menuItem.querySelector('[data-navigation=toggle]')
    const submenu = menuItem.querySelector('[data-navigation=menu]')
    const baseClass = submenu.getAttribute('class')
    const transitionDuration = 200
    const leaveDelay = 200
    let timer

    const openSubmenu = () => {
      clearTimeout(timer)
      submenu.setAttribute(
        'class',
        `${baseClass} sm:block sm:opacity-0 sm:-translate-y-2 sm:scale-75`,
      )
      forceReflow(submenu)
      submenu.setAttribute(
        'class',
        `${baseClass} sm:block sm:origin-top sm:transition sm:duration-200`,
      )
    }

    const closeSubmenu = ({ hasDelay = false } = {}) => {
      return new Promise((resolve) => {
        submenu.setAttribute(
          'class',
          `${baseClass} sm:block sm:opacity-0 sm:origin-top sm:scale-75 sm:-translate-y-2 sm:transition sm:duration-200`,
        )
        if (hasDelay) submenu.classList.add('sm:delay-200')
        timer = setTimeout(
          () => {
            submenu.setAttribute('class', baseClass)
            resolve()
          },
          hasDelay ? transitionDuration + leaveDelay : transitionDuration,
        )
      })
    }

    menuItem.addEventListener('mouseenter', () => {
      if (!screenSmMq.matches || !hoverMq.matches) return
      openSubmenu()
      toggle.setAttribute('aria-expanded', true)
    })
    menuItem.addEventListener('mouseleave', () => {
      if (!screenSmMq.matches || !hoverMq.matches) return
      closeSubmenu({ hasDelay: true }).then(() => {
        toggle.setAttribute('aria-expanded', false)
      })
    })

    toggle.addEventListener('click', () => {
      if (!screenSmMq.matches) return
      if (toggle.getAttribute('aria-expanded') === 'false') {
        openSubmenu()
        toggle.setAttribute('aria-expanded', 'true')
      } else {
        closeSubmenu()
        toggle.setAttribute('aria-expanded', 'false')
      }
    })

    toggle.addEventListener('blur', () => {
      if (!screenSmMq.matches) return
      if (toggle.getAttribute('aria-expanded') === 'true') {
        closeSubmenu()
        toggle.setAttribute('aria-expanded', 'false')
      }
    })
  })
