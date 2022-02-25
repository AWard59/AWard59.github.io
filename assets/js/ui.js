'use strict'

const aboutPageDisplay = () => {
  $('.about-me-page').show()
  $('.resume-page').hide()
  $('.projects-page').hide()
  $('.contact-page').hide()

  $('.about-me-link').addClass('current-menu-item')
  $('.resume-link').removeClass('current-menu-item')
  $('.projects-link').removeClass('current-menu-item')
  $('.contact-link').removeClass('current-menu-item')
}

const resumePageDisplay = () => {
  $('.about-me-page').hide()
  $('.resume-page').show()
  $('.projects-page').hide()
  $('.contact-page').hide()

  $('.about-me-link').removeClass('current-menu-item')
  $('.resume-link').addClass('current-menu-item')
  $('.projects-link').removeClass('current-menu-item')
  $('.contact-link').removeClass('current-menu-item')
}

const projectsPageDisplay = () => {
  $('.about-me-page').hide()
  $('.resume-page').hide()
  $('.projects-page').show()
  $('.contact-page').hide()

  $('.about-me-link').removeClass('current-menu-item')
  $('.resume-link').removeClass('current-menu-item')
  $('.projects-link').addClass('current-menu-item')
  $('.contact-link').removeClass('current-menu-item')
}

const contactPageDisplay = () => {
  $('.about-me-page').hide()
  $('.resume-page').hide()
  $('.projects-page').hide()
  $('.contact-page').show()

  $('.about-me-link').removeClass('current-menu-item')
  $('.resume-link').removeClass('current-menu-item')
  $('.projects-link').removeClass('current-menu-item')
  $('.contact-link').addClass('current-menu-item')
}

module.exports = {
  aboutPageDisplay,
  resumePageDisplay,
  projectsPageDisplay,
  contactPageDisplay
}
