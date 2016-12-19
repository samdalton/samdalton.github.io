define(function(require) {
  var Query = require('../components/Query');

  describe('Query', function () {

    var testQuery;
    var testSearchString = 'some search string';

    beforeEach(function () {

      testQuery = new Query(testSearchString);
    });

    describe('#constructor', function () {

      it('should take queryString and set it as a property', function () {

        testQuery.searchString.should.equal(testSearchString);
      });

      it('should set correct constants as properties', function () {

        var constants = {

          el: '.result-container',
          endpoint: '/search/query',
          parentEl: '#search-results',
        };

        for (var constant in constants) {

          testQuery[constant].should.equal(constants[constant]);
        }
      });
    });

    describe('#getResultForActivePage', function () {

      var activePageNo = 1;

      it('should get cache corresponding to active page if available', function() {

        function setup () {

          // Mocks
          testQuery.pages.active = activePageNo;
          testQuery.cache.get = function(i) {
                                  if (i === activePageNo) {

                                    return mockResponse;
                                  }
                                };
        }

        setup();

        var cached = testQuery.getResultForActivePage();
        cached.should.equal(mockResponse);
      });

      it('should return false when data is not in cache', function () {

        function setup () {

          testQuery = new Query(testSearchString);
          // Mocks
          testQuery.pages = { active: activePageNo };
          testQuery.cache = { get: function() {
                                var emptyObj = {};

                                return emptyObj;
                              }
                            };
        }

        setup();

        var cached = testQuery.getResultForActivePage();
        cached.should.be.an('object').and.be.empty;
      });
    });

    describe('#createRequest', function () {

      function runRequestTest(activePage, expectedStartIndex) {

        var endpoint = 'http://testendpoint.com';
        var resultsPerPage = 10;
        var expectedNum = resultsPerPage;
        var expectedRequest = {

          url: endpoint,
          data: {

            q: testSearchString,
            start: expectedStartIndex,
            num: expectedNum
          }
        };

        function setup () {

          testQuery.endpoint = endpoint;
          testQuery.pages.active =  activePage;
          testQuery.pages.resultsPerPage =  resultsPerPage;
        }

        setup();

        var request = testQuery.createRequest();
        request.should.eql(expectedRequest);
      }

      it ('should create correct request for activePage 1', function() {

        runRequestTest(1, 1);
      });

      it ('should create correct request for activePage greater than 1', function() {

        runRequestTest(2, 11);
      });

    });

    describe('#fetch', function () {

      it('should return cached result if available', function() {

        var testQuery;
        var handleFetchSuccessCalled = false;
        function setup () {

          testQuery = new Query(testSearchString);
          testQuery.getResultForActivePage = function () {

            return mockResponse;
          };
          testQuery.handleFetchSuccess = function (result) {

            handleFetchSuccessCalled = true;
            result.should.equal(mockResponse);
          };
        }

        setup();

        testQuery.fetch();
        handleFetchSuccessCalled.should.be.true;
      });

      it('should pass appropriate request to $.ajax if cached result not available', function () {
         // Needs another test with stubbed out AJAX call
      });
    });

    describe('#handleFetchSuccess', function() {

      var testActivePage = 1;

      it('should add result to cache but not render if result is new', function () {

        var renderCalled = false;
        var testCached;

        function setup () {

          // Test object
          testQuery = new Query(testSearchString);
          // Mocks
          testQuery.pages.active = testActivePage;
          testQuery.render = function () {

            renderCalled = true;
          };
          testQuery.cache.add = function (num, result) {

            num.should.equal(testActivePage);
            testCached = result;

            return false;
          };
        }

        setup();

        testQuery.handleFetchSuccess(mockResponse);
        testCached.should.equal(mockResponse);
        renderCalled.should.be.false;
      });

      it('should call render if result not found in cache', function () {

        var renderCalled = false;

        function setup () {

          // Mocks
          testQuery.pages.active = testActivePage;
          testQuery.render = function () {

            renderCalled = true;
          };
          testQuery.cache.add = function (num, result) {

            return true;
          };
        }

        setup();

        testQuery.handleFetchSuccess(mockResponse);
        renderCalled.should.be.true;
      });

      it('should call renderNotFound if result is empty', function () {

        var renderNotFoundCalled = false;

        // Mocks
        testQuery.renderNotFound = function () {

          renderNotFoundCalled = true;
        };
        // Method call and assertions
        testQuery.handleFetchError({});
        renderNotFoundCalled.should.be.true;
      });
    });

    describe('#handleFetchError', function() {

      it('should call renderNotFound if result is empty', function () {

        var testQuery;
        var renderNotFoundCalled = false;
        var err = { message: 'Error' };

        // Test object
        testQuery = new Query(testSearchString);
        // Mocks
        testQuery.renderNotFound = function () {
          renderNotFoundCalled = true;
        };
        // Method call and assertions
        testQuery.handleFetchError(err);
        renderNotFoundCalled.should.be.true;
      });
    });
  });
});
