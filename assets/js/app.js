'use strict'
const ui = require('./ui')

$(() => {
  $('#about-me-link').on('click', ui.aboutPageDisplay())
  $('#resume-link').on('click', ui.resumePageDisplay())
  $('#projects-link').on('click', ui.projectsPageDisplay())
  $('#contact-link').on('click', ui.contactPageDisplay())
})
