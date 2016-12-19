$(document).ready(function() {
  var $hiddenItems = $('#current-job-openings').children('h2, p, ul, .hideAll'),
      $viewAll = $('#current-job-openings button.viewAll'),
      $hideAll = $('#current-job-openings button.hideAll'),
      $section = $('#current-job-openings'),
      hidden   = {opacity: 0, top: -10, display: 'none'},
      shown    = {opacity: 1, top:   0, display: 'block'};

  function onComplete(){
    $section.css({height: 'auto'});
  }

  function onStart() {
    var h = $section.height();
    $section.css({height: h});
  }

  var collapseSection = function() {
      var tl,
          heightToRemove = $hiddenItems.map(function(i, e) {
            return $(e).outerHeight();
          }).get().reduce(function(mem, i, e) {return mem + i});

    tl = new TimelineLite({onStart: onStart, onComplete: onComplete});
    tl.fromTo($hiddenItems, .2, shown, hidden)
      .fromTo($viewAll, .2, {opacity: 0, display: 'none'}, shown, .2)
      .to($section, .2, {height: $section.outerHeight() - heightToRemove + 34 }, .2)
      .to(document.body, 0.2, {
          scrollTo: $section.offset().top
      }, .2);
  };

  var expandSection = function() {
    var tl,
        heightToAdd = $hiddenItems.map(function(i, e) {
          var $e = $(e),
              prevCss = $e.attr('style'),
              height;

          $e.css({display: 'block'});
          height = $e.outerHeight();
          $e.attr('style', prevCss ? prevCss : '');

          return height;
        }).get().reduce(function(mem, i, e) {return mem + i});

    tl = new TimelineLite({onComplete: onComplete});
    tl.to($section, .2, {height: $section.outerHeight() - $viewAll.height() + heightToAdd - 14 })
      .fromTo($hiddenItems, .5, hidden, shown)
      .fromTo($viewAll, .2, shown, {opacity: 0, display: 'none'}, 0);
  };

  $viewAll.on('click', expandSection);
  $hideAll.on('click', collapseSection);
});
