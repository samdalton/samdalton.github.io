
;(function (root) {

  var NW = root.NW;

  /**
   * Sets the state of the sub-filters, and updates the category filter
   * accordingly.  If all of the sub-filters are true, then the category will
   * be set to true also, otherwise it's set to false.
   *
   * @param  {String}  filter  The value of the filter being updated.
   * @param  {Boolean}  state  The state of the filter, checked or not.
   * @return {MultiSelectFilter} The updated data model itself.
   */
  NW.Common
    .MultiSelectFilter
    .prototype
    .setFilter = function setFilter (filter, state) {

    var filters = this.get('filters');
    var subFilters;
    var allFilters;

    filters[filter] = state;

    allFilters = _.every(filters, function (filter) { return filter; });

    subFilters = allFilters ?
      false :
      _.find(filters, function (filter) { return filter; })
      ;

    return this.set({
      filters: filters,
      subFilters: subFilters ? true : false,
      categoryFilter: allFilters
    });
  };

})(this);
