var adMaxHeight = 0,
    titleHMap = [],
    maxTitleH = 0;


function divResize() {

  maxTitleH = 0;
  $('.tile-text').each (function(index){
    $el = $(this);
    $title = $el.find('.media-heading');
    $titleHeight = $title.height();
    if ( typeof titleHMap[$titleHeight] == 'undefined' ){
      $el.css('height','');
      titleHMap[$titleHeight] = $el.height();
    }
    maxTitleH = Math.max(maxTitleH, $titleHeight);
  });

  $('.tile-text').each (function(index){
    $el = $(this);
    $el.height(titleHMap[maxTitleH]);
  });


  adMaxHeight = 0;
  $('#paneTools .ads').each(function(index){
    $el = $(this);
    adMaxHeight = Math.max(adMaxHeight, $el.height() );
  });
  $('#paneTools .ads').each(function(index){
    $el = $(this);
    if ($el.height() < adMaxHeight)
      $el.height(adMaxHeight);
  });



}

$(document).ready(function () {
    $('body').scrollspy({ target: '.side-nav' })

    $(".side-nav ul li a[href^='#']").on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $(this.hash).offset().top }, 500);
    });

    divResize();

    $(window).resize(function() {
        //console.log('resize');
        divResize();
    });

    $('.page-title').parents('.content').find('.side-nav').affix({
        offset: {
            top: 140,
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true) + 30)
            }
        }
    });

    $('.hero + .container .side-nav').affix({
        offset: {
            top: 484,
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true) + 30)
            }
        }
    })

});
