
;(function (root) {

  var NW = root.NW = root.NW || {};
  NW.Common = NW.Common || {};

  /**
   * Data model for the state of a multiple select checkbox form.
   *
   * @return  {MultiSelectFilter} The instance of the MultiSelectFilter itself.
   */
  NW.Common.MultiSelectFilter = Backbone.Model.extend({
    constructor: function MultiSelectFilter () {
      Backbone.Model.apply(this, arguments);
    }

  });

})(this);
