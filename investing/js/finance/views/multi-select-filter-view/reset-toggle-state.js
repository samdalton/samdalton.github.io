
;(function (root) {

  var NW = root.NW;

  /**
   * On moving the mouse outside of the list toggle button, reset it to
   * its original state.
   *
   * @return  {TweenLite}     The animation being applied to the element.
   */
  NW.Common
    .MultiSelectFilterView
    .prototype
    .resetToggleState = function resetToggleState () {

    if (!this.expanded) {

      TweenLite.to(this.$filterToggle, 0.25, {
        rotation: '0',
        easing: Expo.easeOut
      });

    } else {

      TweenLite.to(this.$filterToggle, 0.25, {
        rotation: '90deg',
        easing: Expo.easeOut
      });
    }
  };

})(this);
