$(document).ready(function() {

  $(".carousel-inner a").filter(function() {
    return this.hostname != window.location.hostname;
  }).attr('target', '_blank');

  $('#carousel-profile').on('slid.bs.carousel', function () {
    checkitem();
    updateWindowLocation($('#carousel-profile .carousel-inner .item.active').data('profile'));
  });

  $('#profileModal').on('show.bs.modal', function() {
    updateWindowLocation($('#carousel-profile .carousel-inner .item.active').data('profile'));
  });

  $('#profileModal').on('shown.bs.modal', function() {
    $('#profileModal').after($('.modal-backdrop'));
    $('.modal-backdrop').css('opacity', .5);
    $('#profileModal').css('opacity', 1);
  });

  $('#profileModal').on('hide.bs.modal', function() {
    $('#profileModal').css('opacity', 0);
  });

  $('#profileModal').on('hidden.bs.modal', function() {
    updateWindowLocation();
  });

  $(document).ready(function () {
    $('.carousel').carousel({
      pause: true,
      interval: false,
      wrap: false
    });
    checkitem();
  });

  setActiveProfile();

  function setActiveProfile() {
    var url = document.location.toString();
    if (url.match('#')) {
      var hash = url.split('#')[1];
      if (hash) {
        var $targetProfile = $('section[data-profile=' + hash +']');
        if (hash && $targetProfile.length > 0 ) {
          $('#carousel-profile .carousel-inner .item.active').removeClass('active');
          $targetProfile.addClass('active');
          $('#profileModal').modal({show: true});
        }
      }
    }
  }

  function updateWindowLocation(location) {
    window.location.hash = location ? location : "";
  }

  function checkitem() {
    var $first = $('.carousel-inner .item:first-of-type');
    var $last = $('.carousel-inner .item:last-of-type');
    $first.find('.previous').addClass('disabled');
    $last.find('.next').addClass('disabled');
  }
});