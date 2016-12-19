define('components/Pages', [
  'jquery',
  'handlebars',
  'qs',
  'globals',
  'text!global_templates/site_components/navigation/pagination.html'
], function($, Handlebars, qs, globals, paginationTemplate) {

  var Pages = function (query, active, options) {

    this.el = '.pagination-count';
    this.parentEl = '.page-container';

    this.active = active || 1;
    this.maxPages = (options && options.maxPages) || 4;
    this.resultsPerPage = (options && options.resultsPerPage) || 10;
    this.startPage = 1;

    this.query = query;
    this.template = this._makeTemplate(paginationTemplate);
  };

  Pages.prototype.getTotalResults = function() {

    if (!this.totalResults) {

      this.totalResults = this.query
        .getResultForActivePage()
        .searchInformation
        .totalResults;
    }

    return this.totalResults;
  };

  Pages.prototype.getTotalPages = function () {

    var totalPages = Math.ceil(this.getTotalResults() / this.resultsPerPage);

    return totalPages;
  };

  Pages.prototype.changePage = function (pageToSet) {

    if (pageToSet === this.active ||
        pageToSet > this.getTotalPages() ||
        pageToSet < 1) {

      return;
    }

    var router = globals().router;
    var params = {
      q: this.query.searchString,
      page: pageToSet
    };
    router.navigate(qs.stringify(params), { trigger: true });
  };

  Pages.prototype.handleNav = function (e) {

    e.preventDefault();
    var $target = $(e.target).attr('title') ?
                  $(e.target) :
                  $(e.target).parent();
    var pageToSet;

    if ($target.attr('title') === 'Previous page') {

      pageToSet = this.active - 1;
    } else if ($target.attr('title') === 'Next page') {

      pageToSet = this.active + 1;
    } else {

      var title = $target.attr('title');
      var target = title.match(/Page (\d+)/)[1];

      pageToSet = parseInt(target, 10);
    }

    this.changePage(pageToSet);
  };

  Pages.prototype.remove = function () {

    $(this.el).remove();
  };

  Pages.prototype.render = function () {

    var pages = this._pagesToTemplate();

    if (pages.length) {

      var buttons = this._navDataToTemplate();
      var context = {
        previousButton: buttons.previousButton,
        pages: pages,
        nextButton: buttons.nextButton
      };
      var rendered = this.template(context);

      $(this.parentEl).html(rendered);
      this._bindEvents();
    }

    return this;
  };

  Pages.prototype._makeTemplate = function (templateText) {

    var template = Handlebars.compile(templateText);

    return template;
  };

  Pages.prototype._getStartPage = function (totalPages) {

    if (totalPages <= this.maxPages) {

      return 1;
    }

    var minFirstPage = 1;
    var maxFirstPage = totalPages - this.maxPages + 1;
    var active = this.active;

    var breakInterval =  Math.ceil(this.maxPages / 2);
    var breakpoint = this.startPage + breakInterval - 1;

    var offset;

    if (active > breakpoint) {

      offset = this.startPage + active - breakpoint;
      this.startPage = Math.min(offset, maxFirstPage);
    } else if (active < breakpoint) {

      offset = this.startPage - (breakpoint - active);
      this.startPage = Math.max(offset, 1);
    }

    return this.startPage;
  };

  Pages.prototype._pagesToTemplate = function() {

    var totalPages = this.getTotalPages();
    var toTemplate = Math.min(totalPages, this.maxPages);
    var startPage = this._getStartPage(totalPages);
    var self = this;

    return Array
      .apply(null, { length: toTemplate })
      .map(function(element, i) {
        var pageNo = i + self.startPage;

        return (self.active === pageNo) ?
               { number: pageNo, title: "Current page", href: "#", class: "active" } :
               { number: pageNo, title: "Page " + pageNo, href: "#" };
      });
};

  Pages.prototype._navDataToTemplate = function () {

    var previousButton = { href: '#' };
    var nextButton = { href: '#' };

    if (this.active === 1) {

      previousButton.class = 'disabled';
    }

    if (this.active === this.getTotalPages()) {

      nextButton.class = 'disabled';
    }

    return {

      previousButton: previousButton,
      nextButton: nextButton
    };
  };

  Pages.prototype._bindEvents = function () {

    $('.pagination-count li a').on({
      'click': this.handleNav.bind(this)
    });
  };

  return Pages;
});
