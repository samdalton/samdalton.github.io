define('components/Query', [
  'jquery',
  'underscore',
  'handlebars',
  'qs',
  'globals',
  'components/Cache',
  'components/Pages',
  'text!templates/result.hbs',
], function ($, _, Handlebars, qs, globals, Cache, Pages, resultTemplate) {

  var Query = function(searchString, options) {

    this.el = '.result-container';
    this.endpoint = '/search/query';
    this.parentEl = '#search-results';

    this.searchString = searchString;

    this.cache = new Cache();
    this.pages = new Pages(this, options && options.startPage);
    this.sortBy = (options && options.sortBy);

    this.template = this._makeTemplate(resultTemplate);
  };

  Query.prototype.getContext = function () {

    return {

      searchString: this.searchString,
      sortBy: 'relevance'
    };
  };

  Query.prototype.getResultForActivePage = function () {

    var activePage = this.pages.active;
    var result = this.cache.get(activePage);

    return result;
  };

  Query.prototype.createRequest = function () {

    var count = this.pages.resultsPerPage;
    var startIndex = ((this.pages.active - 1) *
                       this.pages.resultsPerPage) + 1;
    var request = {

      url: this.endpoint,
      data: {

        q: this.searchString,
        start: startIndex,
        num: count
      }
    };

    if (this.sortBy) {

      request.data.sort = this.sortBy;
    }

    return request;
  };

  Query.prototype.fetch = function() {

    var cached = this.getResultForActivePage();
    var request;

    if (!_.isEmpty(cached)) {

      this.handleFetchSuccess(cached);
    } else {

      request = this.createRequest();
      $.ajax(request)
       .done(this.handleFetchSuccess.bind(this))
       .fail(this.handleFetchError.bind(this));
    }
  };

  Query.prototype.handleFetchSuccess = function (result) {

      if (result) {

        var inCache = this.cache.add(this.pages.active, result);
        this.render();
      } else {

        return this.renderNotFound();
      }
  };

  Query.prototype.handleFetchError = function (error) {

    this.renderNotFound();
  };

  Query.prototype.replaceLinks = function(items) {
    // Re-write to current hostname and protocol
    for(var i = 0; i < items.length; i++) {
      var re = new RegExp("https?://www\.nerdwallet\.com");
      // The formattedUrl is busted in the results. Use a known good link
      // and format appropriately using window.location.host
      items[i]['formattedUrl'] = items[i]['link'].replace(re, window.location.host);
      // Use window.location.origin for the actual link so we preserve the protocol
      items[i]['link'] = items[i]['link'].replace(re, window.location.origin);
    }
    return items;
  }

  Query.prototype.render = function () {

    var result = this.getResultForActivePage();
    var items = this.replaceLinks(result.items);
    var searchInformation = result.searchInformation;
    var context = {

      items: items,
      searchInformation: searchInformation,
      date: this.sortBy
    };

    var rendered = this.template(context);


    $(this.parentEl).html(rendered);
    this.pages.render();
    this._bindEvents();

    return this;
  };

  Query.prototype.renderNotFound = function () {

    $(this.parentEl).html(this.template({}));

    return this;
  };

  Query.prototype.remove = function () {

    $(this.el).remove();
    this.pages.remove();
  };

  Query.prototype._bindEvents = function () {

    var self = this;

    $('.custom-select').customSelect();
    $('.custom-select').on('change', function () {

      var params = {

        q: self.searchString
      };

      if ($(this).val() === "1") {

        params.sort = 'date';
      }

      globals()
        .router
        .navigate(qs.stringify(params), { trigger: true });

    });
  };

  Query.prototype._makeTemplate = function (templateText) {

    var template = Handlebars.compile(templateText);

    return template;
  };

  return Query;
});
