
;(function (root) {

  var NW = root.NW = root.NW || {};
  NW.Common = NW.Common || {};

  /**
   * The view representation for a multiple-select checkbox filter.  Manages
   * rendering changes in the data model to the view, along with tracking view
   * state (as a ViewModel).
   *
   * @return  {MultiSelectFilterView} An instance of the view itself.
   */
  NW.Common.MultiSelectFilterView = Backbone.View.extend({

    constructor: function MultiSelectFilterView () {

      Backbone.View.apply(this, arguments);

      this.$filterToggle = this.$el.children('.filter-toggle');
      this.$filterList = this.$el.children('.filter-list');
      this.$categoryCheckbox = this.$el.find('.category-checkbox');
      this.$filterCheckboxes = this.$el.find('.filter-checkbox');

      this.expanded = false;

      this.bindEvents();
    },

  });

})(this);
