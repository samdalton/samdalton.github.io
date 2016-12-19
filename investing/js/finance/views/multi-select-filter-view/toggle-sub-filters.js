
;(function (root) {

  var NW = root.NW;

  /**
   * Slides the sub-filter section up and down when the toggle button is
   * clicked.  Prevents form submission (default behavior).
   *
   * @param   {Event}  e  The click event fired by the user.
   *
   * @return  {Object}    The filter list element.
   */
  NW.Common
    .MultiSelectFilterView
    .prototype
    .toggleSubFilters = function toggleSubFilters (e) {

    var height;

    e.preventDefault();

    this.expanded = this.expanded ? false : true;

    this.$el.toggleClass('collapsed');

    if (this.expanded) {

      height = this.$filterList.outerHeight();

      TweenLite.fromTo(this.$filterList, 0.25, {
        height: 0
      }, {
        height: height,
        easing: Expo.easeOut
      });

    }

    return this.$filterList.attr('style', '');

  };

})(this);
