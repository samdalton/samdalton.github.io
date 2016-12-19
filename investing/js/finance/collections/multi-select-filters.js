
;(function (root) {

  var NW = root.NW = root.NW || {};
  NW.Common = NW.Common || {};

  /**
   * A collection of MultiSelectFilter models, representing the data component
   * for a multi-select-checkbox style filter in an application.
   *
   * @return  {MultiSelectFilters}  A collection of MultiSelectFilters.
   */
  NW.Common.MultiSelectFilters = Backbone.Collection.extend({

    constructor: function MultiSelectFilters () {

      Backbone.Collection.apply(this, arguments);
    },

    model: NW.Common.MultiSelectFilter
  });

})(this);
