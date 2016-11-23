$(window).resize(function() {
  if ($(window).width() < 1024) {
    $('header').insertBefore($('#background'));
  } else {
    $('header').appendTo('#forced-hdr-desktop');
  }
});

$(document).ready(function() {
  var eventFired = 0;

  if ($(window).width() < 1024) {
    $('header').insertBefore($('#background'));
  } else {
    $('header').appendTo('#forced-hdr-desktop');
    eventFired = 1;
  }

  $(window).on('resize', function() {
    if (!eventFired) {
      if ($(window).width() < 1024) {
        $('header').insertBefore($('#background'));
      } else {
        $('header').appendTo('#forced-hdr-desktop');
      }
    }
  });

  $('#global-footer').appendTo('#forced-ftr');
  $('#footer-disclaimer').appendTo('#forced-disclaimer');

});

$(document).ready(function() {

  if (navigator.userAgent.match(/(\(iPod|\(iPhone|\(iPad)/)) {
    $('.parallax__group').css('transform-style','flat');
    $('.parallax').css('overflow-y','scroll');
    $('.parallax').css('-webkit-overflow-scrolling','touch');
  } else {  
    $('.parallax__group').css('transform-style','preserve-3d');
    $('.parallax').css('overflow-y','auto');
    $('.parallax').css('-webkit-overflow-scrolling','none');
  }

  if (/Mobi/.test(navigator.userAgent)) {
    $('p').css('text-shadow','0 0 30px rgba(0,0,0,.43)');
  } else {  
    $('p').css('text-shadow','none');
  }

  if (document.querySelector('.nw-logged-in') !== null) {
    $('.about-btn__btn').text('Get your score');
  } else {
    $('.about-btn__btn').text('Create an account');
  }

});
