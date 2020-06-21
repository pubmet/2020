const defaultTheme = require('tailwindcss/defaultTheme')
const yaml = require('yamljs')
const _ = require('lodash')
const cloudinary = require('./cloudinary')

const currentYear = 2020

module.exports = {
  cloudinary,
  theme: defaultTheme,
  url: 'http://pubmet.unizd.hr',
  year: currentYear,
  description:
    'The 7th Conference on Scholarly Communication and Publishing in the Context of Open Science',
  email: 'pubmet@unizd.hr',
  trackingId: 'UA-27463615-3',
  date: {
    conferenceStart: '2020-09-16',
    conferenceEnd: '2020-09-18',
    submitAbstractBy: ['2020-04-15', '2020-06-10'],
    notifyAbstractAcceptance: '2020-07-10',
    submitPresentationBy: '2020-09-01',
    submitPosterBy: '2020-06-01',
    speakerRegistrationBy: '2020-07-01',
    earlyRegistrationBy: '2020-06-01',
    regularRegistrationBy: '2020-08-15',
    lateRegistrationBy: '2020-09-01',
  },
  navigation: [
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
        _.range(2020, 2013).map((year) => ({
          name: `PUBMET${year}`,
          href: `http://pubmet.unizd.hr/pubmet${year}`,
          disabled: year === 2020,
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
  ],
  organization: yaml.load(`${process.cwd()}/etc/organization.yml`),
  sponsors: yaml.load(`${process.cwd()}/etc/sponsors.yml`),
  accommodation: [
    {
      name: 'Boutique Hostel Forum',
      href: 'https://hostelforumzadar.com/en',
    },
    {
      name: 'Guesthouses I and II',
      href: 'http://gostinjacbsm.com/guesthouses-zadar',
    },
    {
      name: 'Youth Hostel, University of Zadar',
      href: 'http://www.unizd.hr/studentskidom/english',
    },
    {
      name: 'Youth Hostel Zadar',
      href:
        'https://www.tripadvisor.com/Hotel_Review-g295374-d602003-Reviews-Youth_Hostel_Zadar-Zadar_Zadar_County_Dalmatia.html',
    },
    {
      name: 'Airbnb',
      href: 'https://www.airbnb.com',
    },
    {
      name: 'Booking.com',
      href: 'https://www.booking.com',
    },
  ],
  socialLinks: [
    {
      id: 'facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/pubmet',
    },
    {
      id: 'twitter',
      name: 'Twitter',
      url: 'https://twitter.com/pubmet',
    },
  ],
  templates: [
    {
      name: 'Research template',
      role: 'for presenting the results of your research',
      file: 'templates/PubMet2020_Research_template.docx',
    },
    {
      name: 'Review template',
      role:
        'for presenting a literature survey (review) or other type of presentation',
      file: 'templates/PubMet2020_Review_template.docx',
    },
    {
      name: 'Poster template',
      role: 'for poster presentations',
      file: 'templates/PubMet2020_Poster_template.docx',
    },
    {
      name: 'Workshop template',
      role: 'for workshops',
      file: 'templates/PubMet2020_Workshop_template.docx',
    },
  ],
}
