define(function (require) {

  var Pages = require('../components/Pages');

  describe('Pages', function () {

    /*
     * Setup
     */
    function MockQuery(searchString) {

      this.searchString = searchString;
    }
    var mockQuery;
    var testPages;
    var testSearchString = 'some search string';
    var testActivePage = 5;
    var constants = {

      el: '.pagination-count',
      parentEl: '.page-container',
      startPage: 1
    };
    var defaults = {

      active: 1,
      maxPages: 4,
      resultsPerPage: 10
    };

    beforeEach(function () {

      mockQuery = new MockQuery(testSearchString);
      testPages = new Pages(mockQuery);
      testPagesWithInitializedActivePage = new Pages(mockQuery, testActivePage);
    });

    /*
     * Tests
     */
    describe('#constructor', function () {

      it('should set correct constants', function () {

        for (var constant in constants) {

          testPages[constant].should.equal(constants[constant]);
        }
      });

      it('should set correct defaults', function () {

        for (var dflt in defaults) {

          testPages[dflt].should.equal(defaults[dflt]);
        }
      });

      it('should set take query and startPage params and set them both as properties', function () {

        testPagesWithInitializedActivePage.query.should.equal(mockQuery);
        testPagesWithInitializedActivePage.active.should.equal(testActivePage);
      });

      it('should accept maxPages and resultsPerPage as options', function () {

        var options = {

          maxPages: 6,
          resultsPerPage: 15
        };

        testPages = new Pages(mockQuery, testActivePage, options);

        for (var opt in options) {

          testPages[opt].should.equal(options[opt]);
        }
      });
    });

    describe('#getTotalResults', function () {

      it('should return correct data from associated query object', function () {

        var testTotalResults = 500;

        function setup () {
          mockQuery.getResultForActivePage = function () {
            return {
              searchInformation: {
                totalResults: testTotalResults
              }
            };
          };
        }

        setup();

        testPages.getTotalResults().should.equal(testTotalResults);
      });
    });

    describe('#getTotalPages', function () {
      it('should calculate and return correct number of total pages', function () {
        var testCases = [
          {
            testTotalResults: 489,
            expectedPages: 49
          },
          {
            testTotalResults: 500,
            expectedPages: 50
          },
          {
            testTotalResults: 5,
            expectedPages: 1
          }
        ];

        function runTest (testCase) {

          testPages.totalResults = testCase.testTotalResults;
          testPages.getTotalPages().should.equal(testCase.expectedPages);
        }

        testCases.forEach(function(testCase) {
          runTest(testCase);
        });
      });
    });

    describe('#changePage', function () {

      var navigateCalled = false;
      var mockRouter = {
        navigate: function(route, opts) {

          navigateCalled = true;
        }
      };

      function runChangePageTo (target, options) {

        if (options && options.active) testPages.active = options.active;
        if (options && options.maxPages) testPages.maxPages = options.maxPages;

        testPages.changePage(target);
      }

      it('should not change state or navigate when page to set equals active page', function () {

        var testActivePage = 2;
        navigateCalled = false;

        runChangePageTo(testActivePage, { active: testActivePage });

        testPages.active.should.equal(testActivePage);
        navigateCalled.should.be.false;
      });

      it('should not change state or navigate when page to set is greater that total pages', function () {


        var testTotalPages = 10;
        testPages.getTotalPages = function () {
          return testTotalPages;
        };
        runChangePageTo(testTotalPages + 1, { active: testTotalPages });

        testPages.active.should.equal(testTotalPages);
        navigateCalled.should.be.false;
      });

      it('should not change state or navigate when page to set is less than 1', function () {

        var testTotalPages = 10;
        var testActivePage = 1;
        var lessThanOne = 0;

        testPages.getTotalPages = function () {
          return testTotalPages;
        };

        runChangePageTo(lessThanOne, { active: testActivePage });

        testPages.active.should.equal(testActivePage);
        navigateCalled.should.be.false;
      });
    });

    describe('#_getStartPage', function () {

      function runTest(options) {

        testPages.startPage = options.startPage;
        testPages.maxPages = options.maxPages;
        testPages.active = options.activePage;
        testPages._getStartPage(options.totalPages).should.equal(options.expectedFirstPage);
      }

      it('should change forward correctly', function () {
        var options = {
          totalPages: 46,
          startPage: 1,
          maxPages: 4,
          activePage: 3,
          expectedFirstPage: 2
        };
        runTest(options);
      });

      it('should stay when ', function () {
        var options = {
          totalPages: 100,
          startPage: 2,
          maxPages: 4,
          activePage: 3,
          expectedFirstPage: 2
        };
        runTest(options);
      });

      it('should move forward', function () {
        var options = {
          totalPages: 100,
          startPage: 2,
          maxPages: 4,
          activePage: 6,
          expectedFirstPage: 5
        };
        runTest(options);
      });

      it('should not shift past maxPages', function () {
        var options = {
          totalPages: 4,
          startPage: 1,
          maxPages: 4,
          activePage: 4,
          expectedFirstPage: 1
        };
        runTest(options);
      });
    });

    describe('#handleNav', function () {

      it('should', function () {

      });
    });

    describe('#remove', function () {

      it('should', function () {

      });
    });

    describe('#render', function () {

      it('should', function () {

      });
    });
  });
});
