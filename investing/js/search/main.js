define('jquery', [], function() { return window.jQuery; });

require.config({

  baseUrl: '../js/search',
  paths: {
    backbone: '../../global-styles/bower_components/backbone/backbone',
    global_templates: '../../global-styles/templates',
    handlebars: '../../global-styles/bower_components/handlebars/handlebars',
    purl: '../../global-styles/bower_components/purl/purl',
    qs: 'vendor/qs',
    search_bar_controller: '../search-bar-controller',
    text: '../../global-styles/bower_components/requirejs-text/text',
    typeahead: '../../global-styles/bower_components/typeahead.js/dist/typeahead.jquery',
    underscore: '../../global-styles/bower_components/underscore/underscore'
  },
  shim: {
    backbone: {
      deps: [
        'underscore'
      ],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    purl: {
      exports: 'purl'
    },
    qs: {
      exports: 'qs'
    },
    search_bar_controller: {
      exports: 'SearchBarController'
    },
    underscore: {
      exports: '_'
    }
  }
});

require(['app'], function(App) {

  App.initialize();
});
