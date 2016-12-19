
;(function (root) {

  var NW = root.NW;

  /**
   * Attaches event listeners to DOM elements in the view.  We support IE8 for
   * now, so we need to wrap scope for these methods on the view, rather than
   * using .bind().
   *
   * @return  {MultiSelectFilterView} The view instance itself.
   */
  NW.Common
    .MultiSelectFilterView
    .prototype
    .bindEvents = function bindEvents () {

      var _this = this;

      this.$filterToggle.on('click', function toggleSubFilters (e) {

        return _this.toggleSubFilters(e);

      });

      this.$filterToggle.on('mouseover', function indicateMouseAction () {

        return _this.indicateMouseAction();
      });

      this.$filterToggle.on('mouseout', function resetToggleState () {

        return _this.resetToggleState();

      });

      this.$categoryCheckbox.on('click', function selectCategory (e) {

        return _this.selectCategory(e);

      });

      this.$filterCheckboxes.on('click', function selectSubFilter (e) {

        return _this.selectSubFilter(e);

      });

      return this;
    };

})(this);
