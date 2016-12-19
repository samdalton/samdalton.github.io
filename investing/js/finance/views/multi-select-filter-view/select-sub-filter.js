
;(function (root) {

  var NW = root.NW;

  /**
   * Passes data about the sub-filter checkboxes, based on user input, to
   * any listeners.
   *
   * @param   {Event}  e  The DOM event triggered by the user.
   *
   * @return  {Object}     An object containing the updated state.
   */
  NW.Common
    .MultiSelectFilterView
    .prototype
    .selectSubFilter = function selectSubFilter (e) {

    var state = e.target.checked ? e.target.value : false;

    this.trigger('selection:filter', e.target.value, state);

    return {
      filter: e.target.value,
      state: state
    };

  };

})(this);
