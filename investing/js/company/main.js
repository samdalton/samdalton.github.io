$(function () {
  var companyPage = new NW.CompanyPage();
  companyPage.init();
});

// js for video on company page
$(document).ready(function() {

  if (/Mobi/.test(navigator.userAgent)) {
    $('#company-vid-play').css('display', 'none');
    $('.company-vid-preview').css('display', 'none');
    $('.company-vid-mobile').css('display', 'block');
    $('#nw-video-cont').css('display', 'none');

  } else {

    $('#nw-video-cont').css('display', 'none');

    player1 = $('#company-vid-play-btn');
    player2 = plyr.setup('#nw-video-cont')[0];

    player1.on('click', function() {
      document.getElementById("company-vid-play").style.display = "none";
      document.getElementById("nw-bg-video").pause();
      document.getElementById("nw-video-cont").style.display = "block";
      document.getElementById("nw-bg-video").style.display = "none";
      document.getElementById("nw-video").play();
    });
  }

});
// END:js for video on company page

// js for slider on company + careers page
$(document).ready(function () {
  $('.company-mid-hero-slider').bxSlider({
    mode: 'fade',
    touchEnabled: 'true',
    useCSS: 'false'
  });
});

$(document).ready(function () {
  var settings = function() {
    var smallscreen = {
      touchEnabled: 'true',
      useCSS: 'false',
      minSlides: 1,
      maxSlides: 1,
      slideWidth: 308,
      slideMargin: 10
    };
    var medscreen = {
      touchEnabled: 'true',
      useCSS: 'false',
      minSlides: 1,
      maxSlides: 2,
      slideWidth: 338,
      slideMargin: 20
    };
    var lgscreen = {
      touchEnabled: 'true',
      useCSS: 'false',
      minSlides: 2,
      maxSlides: 2,
      slideWidth: 412,
      slideMargin: 40
    };
    if ($(window).width()<784) {
      return smallscreen;
    } else if ($(window).width()<1033) {
      return medscreen;
    } else {
      return lgscreen;
    }
  }

  var mySlider;
  function meetSliderScript() {
    mySlider.reloadSlider(settings());
  }

  mySlider = $('.company-meet-slider').bxSlider(settings());
  $(window).resize(meetSliderScript);

});
// js for slider on company + careers page

// js for leadership page
$(document).ready(function () {

  var charLimit = 210;

  function truncate(el) {
    var text = el.text();
    el.attr("data-originalText", text);
    el.text(text.substring(0, charLimit) + "...");
  }

  function reveal(el) {
    el.text(el.attr("data-originalText"));
  }

  $(".truncated").each(function () {
    truncate($(this));
  });

  $(".lead-trigger").on("click", function (e) {
    e.preventDefault();
    if ($(this).text() === "+") {
      $(this).text("-");
      reveal($(this).parent().parent().prev(".truncated"));
    } else {
      $(this).text("+");
      truncate($(this).parent().parent().prev(".truncated"));
    }
  });
});

$(document).ready(function () {
  $('.lead-people-list--more').hide();
  $('.lead-more__btn').click(function(){
    $('.lead-people-list--more').slideToggle('fast');

//		if($(this).text() == 'See less'){
//		   $(this).text('See more');
//		} else {
    $(this).text('See less');
//		}
    $('.lead-more__btn').css('display', 'none');
    return false;
  });
});
// END:js for leadership page 
