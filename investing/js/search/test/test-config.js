require.config({

  baseUrl: '../../../js/search',
  paths: {
    backbone: '../../../lib-common/assets/bower_components/backbone/backbone',
    handlebars: '../../../lib-common/assets/bower_components/handlebars/handlebars',
    jquery: '../../../lib-common/assets/bower_components/jquery/jquery',
    'jquery.customSelect': '../../../lib-common/assets/bower_components/jquery.customSelect/jquery.customSelect',
    'jquery.tinyNav': '../../../lib-common/assets/bower_components/jquery.tinyNav/tinyNav',
    pace: '../../../lib-common/assets/bower_components/pace/pace',
    qs: 'vendor/qs',
    text: '../../../lib-common/assets/bower_components/requirejs-text/text',
    underscore: '../../../lib-common/assets/bower_components/underscore/underscore'
  },
  shim: {
    backbone: {
      deps: [
        'jquery',
        'underscore'
      ],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    "jquery.customSelect": ['jquery'],
    qs: {
      exports: 'qs'
    },
    underscore: {
      exports: '_'
    }
  }
});

var specs = [
  'specs/test.Cache.js',
  'specs/test.Pages.js',
  'specs/test.Query.js',
];

require(specs, function () {
  mocha.run();
});
