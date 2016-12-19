define([
  'jquery',
  'underscore',
  'backbone',
  'qs',
  'purl',
  'globals',
  'components/Query'
], function($, _, Backbone, qs, purl, globals, Query) {

  function isFirefox () {

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      return true;
    }
    return false;
  }

  var Router = Backbone.Router.extend({

    routes: {

      '*querystring': 'search'
    },

    search: function(querystring) {

      // querystring passed in Backbone router is of no use because
      // Backbone decodes the string, making it unparseable
      var parser = purl(window.location.href);
      var hash = window.location.hash;
      var q = hash.match(/^#q=(.*?)(?=&sort|&page|$)/);
      q = isFirefox() ? q[1] : decodeURIComponent(q[1]);
      var page = parser.fparam('page');
      var sort = parser.fparam('sort');
      var $inputEl = $('.search-bar input');
      var loadingGif = '<img src="../img/search-load.gif" style="display: block; margin: 50px auto;">';

      if (q && $inputEl.val() !== q) {

        $inputEl.val(q);
      }

      if (globals().query) {

        globals().query.remove();
      }

      $('#search-results').html(loadingGif);

      $(('WebkitAppearance' in document.documentElement.style) ? 'body' : 'html').animate({ scrollTop: 0 }, 100, function () {

        var options = {

          startPage: page &&
                     parseInt(page, 10),
          sortBy: sort
        };

        var context = {

          searchString: q,
          sortBy: 'relevance'
        };

        NW.analytics.pageView('/search/results/?q=' + escape(q));

        var currentContext = globals().query && globals().query.getContext();
        if (currentContext && _.isEqual(currentContext, context)) {

          globals().query.pages.active = options.startPage || 1;
        } else {

          globals().query = new Query(q, options);
        }

        globals().query.fetch();
      });
    }
  });

  return Router;
});
