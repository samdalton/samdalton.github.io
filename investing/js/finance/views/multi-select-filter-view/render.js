
;(function (root) {

  var NW = root.NW;

  /**
   * Renders changes in the data model to the DOM.
   *
   * @param   {MultiSelectFilter}  model  The updated data model.
   *
   * @return  {MultiSelectFilterView}     The view instance itself.
   */
  NW.Common.MultiSelectFilterView.prototype.render = function render (model) {

      this.$categoryCheckbox[0].indeterminate = model.get('subFilters');

      if (model.get('categoryFilter')) {

        this.$filterCheckboxes.each(function (index, item) {
          item.checked = true;
        });

      } else if (!model.get('subFilters')) {

        this.$filterCheckboxes.each(function (index, item) {
          item.checked = false;
        });

        this.$categoryCheckbox[0].checked = false;
      }

      return this;
    };

})(this);
