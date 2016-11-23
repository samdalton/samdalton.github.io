define([
  'jquery',
  'underscore',
  'backbone',
  'qs',
  'globals',
  'components/Router',
  'search_bar_controller',
  'typeahead'
], function($, _, Backbone, qs, globals, Router, SearchBarController) {

  var searchBarController = new SearchBarController();

  searchBarController.handleSearch = function (e) {

    e.preventDefault();
    // Potentially other validation
    var q = $('.search-bar input').val().trim();
    if (!q) return;

    var router = globals().router;
    var params = { q: q };

    router.navigate(qs.stringify(params), { trigger: true });
  };

  var App = {

    initialize: function () {

      searchBarController.activate();
      globals().router = new Router();
      Backbone.history.start();
    },
  };

  return App;
});
