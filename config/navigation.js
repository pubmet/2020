const _ = require('lodash')
const yaml = require('yamljs')

const siteYear = yaml.load('config/site.yml').year

module.exports = [
  {
    name: 'About',
    href: '/history',
    submenu: [
      [
        {
          name: 'History',
          href: '/history',
        },
        {
          name: 'Organization',
          href: '/organization',
        },
      ],
      _.range(siteYear, 2013).map((year) => ({
        name: `PUBMET${year}`,
        href: `http://pubmet.unizd.hr/pubmet${year}`,
        disabled: year === siteYear,
      })),
    ],
  },
  {
    name: 'Call for Submissions',
    href: '/call-for-submissions',
    submenu: [],
  },
  {
    name: 'Sponsors',
    href: '/sponsors',
    submenu: [
      [
        {
          name: 'Sponsors',
          href: '/sponsors',
        },
        {
          name: 'Call for Sponsors',
          href: '/call-for-sponsors',
        },
      ],
    ],
  },
  {
    name: 'Venue',
    href: '/venue',
    submenu: [],
  },
  {
    name: 'Contact',
    href: '/contact-us',
    submenu: [],
  },
]
