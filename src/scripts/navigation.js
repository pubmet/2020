// accessible flyout menus
// https://www.w3.org/WAI/tutorials/menus/flyout/

// avoiding "tailwindcss/defaultTheme" because of lodash, which bumps bundle size
import config from 'tailwindcss/stubs/defaultConfig.stub.js'

const breakpointMq = window.matchMedia(
  `(min-width: ${config.theme.screens.lg})`,
)
const hoverMq = window.matchMedia('(any-hover: hover)')

/* mobile */

const clickDrop = document.querySelector('[data-name=click-drop]')

clickDrop.addEventListener('click', () => {
  if (breakpointMq.matches) return
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
      if (breakpointMq.matches) return
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
        `${baseClass} lg:block lg:-translate-y-2 lg:scale-75`,
      )
      forceReflow(submenu)
      submenu.setAttribute(
        'class',
        `${baseClass} lg:block lg:origin-top lg:transition lg:duration-200`,
      )
    }

    const closeSubmenu = ({ hasDelay = false } = {}) => {
      return new Promise((resolve) => {
        submenu.setAttribute(
          'class',
          `${baseClass} lg:block lg:opacity-0 lg:origin-top lg:scale-75 lg:-translate-y-2 lg:transition lg:duration-200`,
        )
        if (hasDelay) submenu.classList.add('lg:delay-200')
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
      if (!breakpointMq.matches || !hoverMq.matches) return
      openSubmenu()
      toggle.setAttribute('aria-expanded', true)
    })
    menuItem.addEventListener('mouseleave', () => {
      if (!breakpointMq.matches || !hoverMq.matches) return
      closeSubmenu({ hasDelay: true }).then(() => {
        toggle.setAttribute('aria-expanded', false)
      })
    })

    toggle.addEventListener('click', () => {
      if (!breakpointMq.matches) return
      if (toggle.getAttribute('aria-expanded') === 'false') {
        openSubmenu()
        toggle.setAttribute('aria-expanded', 'true')
      } else {
        closeSubmenu()
        toggle.setAttribute('aria-expanded', 'false')
      }
    })

    toggle.addEventListener('blur', () => {
      if (!breakpointMq.matches) return
      if (toggle.getAttribute('aria-expanded') === 'true') {
        closeSubmenu()
        toggle.setAttribute('aria-expanded', 'false')
      }
    })
  })
