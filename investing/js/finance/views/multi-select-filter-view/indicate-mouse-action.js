
;(function (root) {

  var NW = root.NW;

  /**
   * On moving the mouse over the list toggle button, rotate it to reflect
   * the state it will apply to the filter list: expanded or collapsed.
   *
   * @return  {TweenLite}     The animation being applied to the element.
   */
  NW.Common
    .MultiSelectFilterView
    .prototype
    .indicateMouseAction = function indicateMouseAction () {

      if (!this.expanded) {

        return TweenLite.to(this.$filterToggle, 0.25, {
          rotation: '90deg',
          easing: Expo.easeOut
        });

      } else {

        return TweenLite.to(this.$filterToggle, 0.25, {
          rotation: '0',
          easing: Expo.easeOut
        });
      }

  };

})(this);
