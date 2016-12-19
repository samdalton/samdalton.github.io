window.SearchBarController = (function() {

  var SearchBarController = function () {};

  SearchBarController.prototype.toggleDisabled = function (e) {
    var searchInputLength = $('.search-bar input').val().trim().length;
    var $searchButton = $('.search-bar button');

    if (!searchInputLength && !$searchButton.attr('disabled')) {
      $searchButton.attr('disabled', true);
    }

    if (searchInputLength && $searchButton.attr('disabled')) {
      $searchButton.attr('disabled', false);
    }
  };

  SearchBarController.prototype.killPlaceholder = function (e) {

    $(e.target).attr('placeholder', '');
  };

  SearchBarController.prototype.addPlaceholder = function (e) {
    if (!$(e.target).val().length) {
      $(e.target).attr('placeholder', 'Ex: What are the best credit cards?');
    }
  };

  SearchBarController.prototype.getAutocomplete = function (query, cb) {
    var clientID = '003386302330948953581:vxiyfvu3r-s';
    $.ajax({
      url: 'https://clients1.google.com/complete/search',
      dataType: "jsonp",
      data: {
        q: query,
        hl: 'en',
        client: 'partner',
        source: 'gcsc',
        partnerid: clientID,
        ds: 'cse'
      }
    })
    .success(function(results) {
      var sugs = results[1];
      var ret = sugs.map(function(sug) {
        return { value: sug[0] };
      });
      cb(ret);
    })
    .error(function(error) {
      var emptySet = [];
      cb(emptySet);
    });
  };

  SearchBarController.prototype.activate = function (options) {

    if (!options) {
      options = {};
    }

    $('.search-bar').on({
      submit: this.handleSearch,
      keyup: this.toggleDisabled
    });

    $('.search-bar input').on({
      focus: this.killPlaceholder,
      focusout: this.addPlaceholder
    });

    if (options.clearOnPageLoad) {
      $('.search-bar input').val('');
    }
    $('.search-bar input').typeahead({
      hint: false,
      highlight: true,
      minLength: 2
    },
    {
      name: 'google',
      source: this.getAutocomplete
    });
  };

  return SearchBarController;
})();
