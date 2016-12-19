
;(function (root) {

  var NW = root.NW;

  /**
   * Toggles the state of the form, based on if the entire category is chosen
   * or its constituent parts.  Updates the sub-filter state appropriately,
   * either setting them all to a truthy value, or false.
   *
   * @param  {String|Boolean}  state  The state of the category checkbox.
   * @return {MultiSelectFilter} The updated data model.
   */
  NW.Common
    .MultiSelectFilter
    .prototype
    .setCategory = function setCategory (state) {

    var filters = this.get('filters');

    _.each(filters, function (value, filter) {
      filters[filter] = state;
    });

    return this.set({
      categoryFilter: state,
      subFilters: false,
      filters: filters
    });

  };

})(this);
