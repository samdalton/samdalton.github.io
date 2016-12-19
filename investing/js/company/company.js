var NW = window.NW;

if (!NW) {
  window.NW = {};
  NW = window.NW;
}

function CompanyPage(){
  this.reset = false;
}

CompanyPage.prototype.init = function init (){
  this.setSize();
  this.setup();
  this.bindEvents();
  this.animateMasonry();
};

CompanyPage.prototype.bindEvents = function bindEvents () {
  var _this = this;
  $('.view-more-button').on('click', function(e){
    _this.scrollTo($(this.hash));
    e.preventDefault();
  });

  $(window).on('resize', _.debounce(function setSize () {
    _this.setSize();

    //TODO: Use maybe Backbone for state changes?
    if(_this.reset && _this.size === 'small') {
      //Make Carousels
      _this.makeCarousels();

    } else if(_this.reset && _this.size !== 'small') {
      //Destory Carousels
      _this.destroyCarousels();
    }

    _this.$people.removeClass('expanded');

  }, 100));

  _this.$people.on('click', function(e) {
      var $element = $(this);
      _this.toggleInfo($element, _this.size !== 'large');
  });
}

CompanyPage.prototype.toggleInfo = function toggleInfo ($element, shouldRun) {
  if(!shouldRun) {
    return;
  }

  this.$people.not($element).removeClass('expanded');
  $element.toggleClass('expanded');
}

CompanyPage.prototype.scrollTo = function scrollTo ($target) {
  $target.velocity("scroll", { duration: 600, offset:26 });
};

CompanyPage.prototype.setSize = function setSize () {
  var width = window.innerWidth ? window.innerWidth : 0;
  var previousSize = this.size;
  var reset = false;
  var currentSize;
  var lastWasSmall;
  var screenWidths = {
    TABLET: 768,
    DESKTOP: 1024
  };

  function calculateCurrentSize (width) {
  if (width < screenWidths.TABLET) {
    return 'small';
  } else if (width >= screenWidths.TABLET
    && width < screenWidths.DESKTOP) {

    return 'medium';
  } else {
    return 'large';
  }
  }

  currentSize = calculateCurrentSize(width);
  lastWasSmall = (previousSize === 'small');

  switch (currentSize) {
  case 'small':
    reset = !lastWasSmall;
    break;
  case 'medium':
  case 'large':
    reset = lastWasSmall;
    break;
  }

  this.size = currentSize;
  this.reset = reset;
};

CompanyPage.prototype.setup = function setup () {
  $carousels = $('.carousel');
  $people = $('.people-with-bios li, .people li.with-website');
  $masonry = $('.masonry-images');

  this.$carouselsElements = $carousels;
  this.$people = $people;
  this.$masonry = $masonry;

  this.carousels = [];
  this.reset = true;


  if(this.size === 'small') {
    this.makeCarousels();
  }
};

CompanyPage.prototype.makeCarousels = function makeCarousels () {
  var _this = this;
  _this.$carouselsElements.each(function(){
      var carouselObj = $(this).bxSlider({ auto: false, controls: false });
      _this.carousels.push(carouselObj);
    });
};

CompanyPage.prototype.destroyCarousels = function destroyCarousels () {
    this.carousels.forEach(function(carousel){
      carousel.destroySlider();
    });

    this.carousels = [];
};

CompanyPage.prototype.animateMasonry = function animateMasonry () {
  var _this = this;
  var $group;
  var $images;
  var tl;
  var hidden;

  if(this.$masonry.size() > 0 ) {
    hidden = { opacity: 0 };
    $group = this.$masonry.children().last();
    $images = $group.find('img');

    tl = new TimelineLite({onComplete: onComplete });
    tl
    .to($images[0], 2, hidden)
    .to([$images[1], $images[2]], 2, hidden, .4)
    .to([$images[3], $images[4]], 2, hidden, .8)
    .to([$images[5], $images[6]], 2, hidden, 1.2)
    .delay(2);
  }

  function onComplete () {
    $group
      .detach()
      .prependTo(_this.$masonry);

    $images.each(function(){
      $(this).css({opacity: 1});
    });

    _this.animateMasonry();
  }
};

NW.CompanyPage = CompanyPage;
