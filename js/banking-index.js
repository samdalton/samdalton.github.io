/**
 * This file governs the logic used for consumer banking index pages at the
 * time being, and will likely need to extend to covering partials provided
 * by the same underlying mechanisms.
 */
$(document).ready(function () {

  var $typeFilter = $('#type-filter');
  var $regionFilter = $('.tabs li a');
  var $institutions = $('.institution');
  var category;

  /**
   * setTypeFilter
   *
   * Hide certain rows of the table based upon which filter the user chooses.
   * Matches the value of the select dropdown to the data-attributes on the
   * rows.
   *
   * @params {Object} e The DOM 'change' event bound to the element.
   */
  function setTypeFilter (e) {
    var $this = e ? $(e.target) : null;
    var val = $this ? $this.val() : $typeFilter.val();

    if (val === "All") {

      $institutions
        .removeClass('hidden')
        .each(matchCategories)
        ;

    } else {

      $institutions
        .filter('[data-type="' + val + '"]')
        .removeClass('hidden')
        .each(matchCategories)
        ;
      $institutions
        .filter('[data-type!="' + val + '"]')
        .addClass('hidden')
        ;
    }


  }

  /**
   * setRegionFilter
   *
   * Shows only the appropriate financial institution elements for any given
   * regional filter.
   *
   * @param {[Object]}  e The click event triggered by the user.  Optional.
   */
  function setRegionFilter (e) {

    var $this = e ? handleRegionClick(e) : routeRegionHash();

    $('.tabs .active').removeClass('active');
    $this.parent().addClass('active');

    $institutions.each(matchCategories);

    setTypeFilter();

  }

  /**
   * handleRegionClick
   *
   * Sets category variable in outer scope and returns event target's
   * jQuery object.
   *
   * @param {[Object]}  e The click event triggered by the user.
   * @return {[Object]} $this Event target's jQuery object.
   */
  function handleRegionClick (e) {

    var $this = $(e.target);
    category = $this.attr('data-category');
    return $this;

  }

  /**
   * routeRegionHash
   *
   * Gets hash from window.location and tries to match it to a region. Defaults to
   * 'National'. Sets category variable in outer scope and returns jQuery object for
   * region's nav anchor tag.
   *
   * @return {[Object]} jQuery object for region nav anchor
   */
  function routeRegionHash () {

    var defaults = {
      category: 'National',
      $this: $('.tab-bar a[data-category="National"]')
    };
    var hash = window.location.hash;
    var route;
    var validated;

    route = hash ? hash.replace('#', '') : null;
    validated = route ? validateRegionRoute(route) : {};
    category = validated.category || defaults.category;

    return validated.$this || defaults.$this;

  }

  /**
   * validateRegionRoute
   *
   * Takes a route string and tries to match it to regions on page
   *
   * @param {String} String of route taken from location hash
   * @return {Object} Object, populated with category and $this properties
   * if route valid, empty if not valid
   */
  function validateRegionRoute (route) {

    var $regionAnchor = $('.tab-bar a').filter(function() {
      return $(this).attr('data-category') === route;
    });
    var ret = {};

    if ($regionAnchor.length) {
      ret.category = route;
      ret.$this = $regionAnchor;
    }

    return ret;

  }

  /**
   * matchCategories
   *
   * Called by setRegionFilter; loops through the table elements, matches
   * their data-regions attribute strings against the chosen region filter,
   * and adds/removes classes appropriately.
   *
   * @param {Number}  index   The index of the element in the jQuery object.
   * @param {Object}  element The DOM element literal from the jQuery object.
   */
  function matchCategories (index, element) {

    var $element = $(element);

    if (!$element.attr('data-regions').match(category)) {

      $element.addClass('hidden');
    } else {

      $element.removeClass('hidden');
    }

  }

  $typeFilter.on({
    'change': setTypeFilter
  });

  $regionFilter.on({
    'click': setRegionFilter
  });

  setRegionFilter();

  $('[data-toggle="tooltip"]').tooltip();
});
