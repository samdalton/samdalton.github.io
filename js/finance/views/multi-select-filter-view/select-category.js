
;(function (root) {

  var NW = root.NW;

  /**
   * Passes data about the state of the category checkbox, based on user
   * input, to any listeners.
   *
   * @param   {Event}  e  The DOM click event.
   *
   * @return  {MultiSelectView}  The view instance itself.
   */
  NW.Common
    .MultiSelectFilterView
    .prototype
    .selectCategory = function selectCategory (e) {

    var state = e.target.checked ? e.target.value : false;

    return this.trigger('selection:category', state);

  };

})(this);
