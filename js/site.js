$(document).ready(function(){

  if (typeof SearchBarController === 'function') {
    var searchBarController = new SearchBarController();
    searchBarController.handleSearch = function (e) {

      e.preventDefault();

      // Potentially other validation
      var query = $('.search-bar input').val().trim();
      if (!query) return;

      var escapedQ = window.encodeURIComponent(query);
      window.location.href = '/search/results#q=' + escapedQ;
    };
    searchBarController.activate({ clearOnPageLoad: true });
  }

  if ( window.experiments ) {
    ga('send', 'event', 'experiment - homepage', 'impression', window.experiments.vertical, {
      'dimension2': window.experiments.in_experiment
    });

    $('.js-recommended-articles').on('click', 'a', function() {
      ga('send', 'event', 'experiment - homepage', 'click', window.experiments.vertical);
    });
  }

  if (typeof grunticon === 'function') {
    grunticon(["src/svg-icons/icons.data.svg.css", "src/svg-icons/icons.data.png.css", "src/svg-icons/icons.fallback.css"]);
  }
});

function construct_host_url_with_path(path) {
  return location.origin + '/' + path;
}
