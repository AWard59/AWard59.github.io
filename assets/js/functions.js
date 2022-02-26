'use strict'
/*
* Template functions file.
*/

jQuery(() => {
  let screen_has_mouse = false
  const jQuerybody = jQuery('body')
  const jQuerylogo = jQuery('#identity')
  const jQuerysocial_links = jQuery('#social-profiles')
  const jQuerymenu = jQuery('#site-menu')
  const jQuerycontent_wrap = jQuery('.content-wrap')
  const jQueryhero_media = jQuery('.hero-media')
  const jQueryhero_carousel = jQuery('.hero-media .owl-carousel')
  let win_width = jQuery(window).width()

  // Simple way of determining if user is using a mouse device.
  function themeMouseMove () {
    screen_has_mouse = true
  }
  function themeTouchStart () {
    jQuery(window).off('mousemove.mccan')
    screen_has_mouse = false
    setTimeout(function () {
      jQuery(window).on('mousemove.mccan', themeMouseMove)
    }, 250)
  }
  if (!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
    jQuery(window)
      .on('touchstart.mccan', themeTouchStart)
      .on('mousemove.mccan', themeMouseMove)
    if (window.navigator.msPointerEnabled) {
      document.addEventListener('MSPointerDown', themeTouchStart, false)
    }
  }
  // Initialize custom scrollbars
  if (jQuery.fn.overlayScrollbars) {
    jQuery('body, .additional-menu-content').each(function () {
      jQuery(this).overlayScrollbars({
        nativeScrollbarsOverlaid: {
          initialize: false
        },
        overflowBehavior: {
          x: 'hidden'
        },
        scrollbars: {
          autoHide: 'scroll'
        }
      })
    })
  }
  // Handle both mouse hover and touch events for traditional menu + mobile hamburger.
  jQuery('.site-menu-toggle').on('click.mccan', function (e) {
    jQuerybody.toggleClass('mobile-menu-opened')
    jQuery(window).resize()
    if (!jQuerybody.hasClass('mobile-menu-opened')) {
      jQuerymenu.removeAttr('style')
      jQuerysocial_links.removeAttr('style')
    }
    e.preventDefault()
  })
  jQuery('#site-menu .menu-expand').on('click.mccan', function (e) {
    const jQueryparent = jQuery(this).parent()
    if (jQuery('.site-menu-toggle').is(':visible')) {
      jQueryparent.toggleClass('collapse')
    }
    e.preventDefault()
  })
  jQuery('#site-menu .current-menu-parent').addClass('collapse')
  jQuery(document).on(
    {
      mouseenter: function () {
        if (screen_has_mouse) {
          jQuery(this).addClass('hover')
        }
      },
      mouseleave: function () {
        if (screen_has_mouse) {
          jQuery(this).removeClass('hover')
        }
      }
    },
    '#site-menu li'
  )
  if (jQuery('html').hasClass('touchevents')) {
    jQuery('#site-menu li.menu-item-has-children > a:not(.menu-expand)').on(
      'click.mccan',
      function (e) {
        if (
          !screen_has_mouse &&
					!window.navigator.msPointerEnabled &&
					!jQuery('.site-menu-toggle').is(':visible')
        ) {
          const jQueryparent = jQuery(this).parent()
          if (!jQueryparent.parents('.hover').length) {
            jQuery('#site-menu li.menu-item-has-children')
              .not(jQueryparent)
              .removeClass('hover')
          }
          jQueryparent.toggleClass('hover')
          e.preventDefault()
        }
      }
    )
  } else {
    // Toggle visibility of dropdowns on keyboard focus events.
    jQuery(
      '#site-menu li > a:not(.menu-expand), #top .site-title a, #social-links-menu a:first'
    ).on('focus.mccan blur.mccan', function (e) {
      if (screen_has_mouse && !jQuery('#top .site-menu-toggle').is(':visible')) {
        const jQueryparent = jQuery(this).parent()
        if (!jQueryparent.parents('.hover').length) {
          jQuery('#site-menu .menu-item-has-children.hover')
            .not(jQueryparent)
            .removeClass('hover')
        }
        if (jQueryparent.hasClass('menu-item-has-children')) {
          jQueryparent.addClass('hover')
        }
        e.preventDefault()
      }
    })
  }

  // Handle custom my info.
  jQuery('.my-info .field > a').on('click.mccan', function (e) {
    const jQueryfield = jQuery(this).parent()
    jQueryfield.toggleClass('show-dropdown').siblings().removeClass('show-dropdown')
    e.preventDefault()
  })
  jQuery('.my-info .dropdown .values a').on('click.mccan', function (e) {
    jQuery(this).parent().addClass('selected').siblings().removeClass('selected')
    const jQueryfield = jQuery(this).parents('.field')
    jQuery('input[type=hidden]', jQueryfield).val(jQuery(this).data('value'))
    jQuery('span.field-value', jQueryfield).html(jQuery(this).html())
    e.preventDefault()
  })
  if (jQuery.fn.owlCarousel) {
    const multiple_items = jQuery('.item', jQueryhero_carousel).length > 1
    let prev_video_active
    if (!multiple_items) {
      jQuery('.my-info').addClass('full-width')
    }
    const onTranslate = function (event) {
      jQuery('video', event.target).each(function () {
        this.pause()
      })
    }
    const onTranslated = function (event) {
      jQuery('.owl-item.active video', event.target).each(function () {
        this.play()
      })
      if (jQuery('.owl-item.active .light-hero-colors', event.target).length > 0) {
        jQuerybody.addClass('light-hero-colors')
      } else {
        jQuerybody.removeClass('light-hero-colors')
      }
    }
    jQueryhero_carousel.owlCarousel({
      items: 1,
      loop: multiple_items,
      mouseDrag: multiple_items,
      touchDrag: multiple_items,
      nav: true,
      navElement: 'a href="#"',
      navText: [
        '<span class="ti ti-arrow-left"></span>',
        '<span class="ti ti-arrow-right"></span>'
      ],
      dots: false,
      lazyLoad: true,
      lazyLoadEager: 1,
      video: true,
      responsiveRefreshRate: 0,
      onTranslate: onTranslate,
      onTranslated: onTranslated,
      onLoadedLazy: onTranslated,
      onInitialized: function (event) {
        if (multiple_items) {
          jQuerybody.addClass('hero-has-nav')
        }
        jQuery(
          '<div class="owl-expand"><a href="#"><span class="ti"></span></a></div>'
        )
          .insertAfter(jQuery('.owl-nav', event.target))
          .on('click.mccan', function (e) {
            e.preventDefault()
            if (jQuerybody.hasClass('expanded-hero-start')) {
              return
            }
            let initialAttribs
            let finalAttribs
            let completed = 0
            let duration = jQueryhero_carousel.data('expand-duration')
            const jQueryhero_collection = jQueryhero_media.add(jQueryhero_carousel)
            if (isNaN(duration)) {
              duration = 1000
            }
            jQuerybody
              .toggleClass('expanded-hero')
              .addClass('expanded-hero-start')
              .removeClass('expanded-hero-completed')
            if (jQuerybody.hasClass('expanded-hero')) {
              initialAttribs = {
                right: jQueryhero_media.css('right'),
                textIndent: 0
              }
              finalAttribs = {
                right: 0,
                textIndent: 100
              }
            } else {
              initialAttribs = {
                textIndent: 100,
                right: 0
              }
              jQueryhero_media.css('right', '')
              finalAttribs = {
                textIndent: 0,
                right: jQueryhero_media.css('right')
              }
              jQueryhero_media.css('right', '0')
            }
            jQuery('.hero-media .ti-spin')
              .css(initialAttribs)
              .animate(finalAttribs, {
                duration: duration,
                easing: 'easeOutCubic',
                step: function (now, fx) {
                  if (fx.prop == 'right') {
                    jQueryhero_collection.css('right', now)
                    jQueryhero_carousel.data('owl.carousel').refresh(true)
                  } else {
                    jQuerycontent_wrap.css({
                      '-webkit-transform': 'translate(' + now + '%)',
                      '-ms-transform': 'translate(' + now + '%)',
                      transform: 'translate(' + now + '%)'
                    })
                  }
                },
                complete: function () {
                  completed++
                  if (completed < 1) {
                    return
                  }
                  jQuerybody
                    .addClass('expanded-hero-completed')
                    .removeClass('expanded-hero-start')
                  // clear JS set properties, as they will be set in the CSS as well by the "expanded-hero-completed" selector
                  jQueryhero_media
                    .add(jQueryhero_carousel)
                    .add(jQuerycontent_wrap)
                    .removeAttr('style')
                }
              })

            if (!jQuerybody.hasClass('cv')) {
              const jQuerynav_buttons = jQuery(this).add(jQuery(this).prev('.owl-nav'))
              jQuerynav_buttons.animate(
                {
                  bottom: -jQuery(this).outerHeight()
                },
                {
                  duration: duration / 2,
                  complete: function () {
                    const jQuerynav = jQuery('.owl-nav', jQueryhero_carousel)
                    const jQueryexpand = jQuery('.owl-expand', jQueryhero_carousel)
                    let right_expand
                    if (jQuerybody.hasClass('expanded-hero')) {
                      jQuerynav.css({
                        right: 0
                      })
                      if (jQuerynav.hasClass('disabled')) {
                        right_expand = 0
                      } else {
                        right_expand = jQuerynav.outerWidth()
                      }
                      jQueryexpand.css({
                        right: right_expand,
                        'margin-right': 0
                      })
                    } else {
                      jQuery(this).css({
                        right: '',
                        'margin-right': ''
                      })
                    }
                    jQuery(this).animate(
                      {
                        bottom: 0
                      },
                      {
                        duration: duration / 2,
                        complete: function () {
                          if (!jQuerybody.hasClass('expanded-hero')) {
                            jQuery(this).removeAttr('style')
                          }
                        }
                      }
                    )
                  }
                }
              )
            }
          })
        jQuery('.owl-stage', event.target).on('dblclick.mccan', function (e) {
          jQueryhero_carousel.find('.owl-expand:visible').trigger('click.mccan')
        })
        let tapedTwice = false
        jQuery('.owl-stage', event.target).on('touchstart.mccan', function (e) {
          if (!tapedTwice) {
            tapedTwice = true
            setTimeout(function () {
              tapedTwice = false
            }, 300)
          } else {
            jQueryhero_carousel.find('.owl-expand:visible').trigger('click.mccan')
          }
        })
        jQuery('.ti-loading', jQueryhero_media).addClass('finished')
      }
    })
  }
  jQuery('.menu-overlay').on('click.mccan', function (e) {
    if (e.offsetX < 0 && jQuerybody.hasClass('mobile-menu-opened')) {
      jQuery('.site-menu-toggle').trigger('click.mccan')
    }
  })
  jQuery(window).on('resize', function () {
    win_width = jQuery(window).width()
    if (jQuerybody.hasClass('mobile-menu-opened')) {
      const menu_pos = 0
      if (win_width < 767) {
        jQuerymenu.css({
          // top: jQuerylogo.position().top * 2 + jQuerylogo.outerHeight()
        })
      } else {
        jQuerymenu.removeAttr('style')
        jQuerysocial_links.removeAttr('style')
      }
    } else {
      if (jQuerybody.hasClass('full-content')) {
        jQuerycontent_wrap.css('padding-top', '')
        const contentTop = parseInt(jQuerycontent_wrap.css('padding-top'), 10)
        const logoHeight =
					jQuery('.logo', jQuerylogo).outerHeight() + jQuerylogo.offset().top * 2
        if (logoHeight > contentTop) {
          jQuerycontent_wrap.css('padding-top', logoHeight)
        }
      }
    }
  })
  if (jQuerybody.hasClass('full-content')) {
    jQuery(window).resize()
  }
  jQuery.extend(jQuery.easing, {
    easeOutCubic: function (x, t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b
    }
  })
  // navigation event listeners
  $('#about-me-link').on('click', aboutPageDisplay)
  $('#resume-link').on('click', resumePageDisplay)
  $('#projects-link').on('click', projectsPageDisplay)
  $('#contact-link').on('click', contactPageDisplay)
})

// Contact Form
const form = jQuery('.contact__form')
const message = jQuery('.contact__msg')
let form_data
// success function
function done_func (response) {
  message.fadeIn().removeClass('alert-danger').addClass('alert-success')
  message.text(response)
  setTimeout(function () {
    message.fadeOut()
  }, 2000)
  form.find('input:not([type="submit"]), textarea').val('')
}
// fail function
function fail_func (data) {
  message.fadeIn().removeClass('alert-success').addClass('alert-success')
  message.text(data.responseText)
  setTimeout(function () {
    message.fadeOut()
  }, 2000)
}
form.submit(function (e) {
  e.preventDefault()
  form_data = jQuery(this).serialize()
  jQuery.ajax({
    type: 'POST',
    url: form.attr('action'),
    data: form_data
  })
    .done(done_func)
    .fail(fail_func)
})

const aboutPageDisplay = () => {
  jQuery('.about-me-page').show()
  jQuery('.resume-page').hide()
  jQuery('.projects-page').hide()
  jQuery('.contact-page').hide()

  jQuery('.about-me-link').addClass('current-menu-item')
  jQuery('.resume-link').removeClass('current-menu-item')
  jQuery('.projects-link').removeClass('current-menu-item')
  jQuery('.contact-link').removeClass('current-menu-item')
}

const resumePageDisplay = () => {
  jQuery('.about-me-page').hide()
  jQuery('.resume-page').show()
  jQuery('.projects-page').hide()
  jQuery('.contact-page').hide()

  jQuery('.about-me-link').removeClass('current-menu-item')
  jQuery('.resume-link').addClass('current-menu-item')
  jQuery('.projects-link').removeClass('current-menu-item')
  jQuery('.contact-link').removeClass('current-menu-item')
}

const projectsPageDisplay = () => {
  jQuery('.about-me-page').hide()
  jQuery('.resume-page').hide()
  jQuery('.projects-page').show()
  jQuery('.contact-page').hide()

  jQuery('.about-me-link').removeClass('current-menu-item')
  jQuery('.resume-link').removeClass('current-menu-item')
  jQuery('.projects-link').addClass('current-menu-item')
  jQuery('.contact-link').removeClass('current-menu-item')
}

const contactPageDisplay = () => {
  jQuery('.about-me-page').hide()
  jQuery('.resume-page').hide()
  jQuery('.projects-page').hide()
  jQuery('.contact-page').show()

  jQuery('.about-me-link').removeClass('current-menu-item')
  jQuery('.resume-link').removeClass('current-menu-item')
  jQuery('.projects-link').removeClass('current-menu-item')
  jQuery('.contact-link').addClass('current-menu-item')
}
