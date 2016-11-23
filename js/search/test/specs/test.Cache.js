define(function (require) {

  var Cache = require('../components/Cache');

  describe('Cache', function () {

    var testCache;
    var mockKey = 1;
    var keyNotInCache = 5;

    beforeEach(function () {

      testCache = new Cache();
    });

    describe('#constructor', function () {

      it('should construct with empty cache', function () {

        testCache.data.should.be.an('object').and.be.empty;
      });
    });

    describe('#add', function () {

      it('should accept arbitrary addition to cache', function () {

        testCache.add(mockKey, mockResponse);
        testCache.data[mockKey].should.equal(mockResponse);
      });
    });

    describe('#get', function () {

      it('should retrieve cached data corresponding to given key', function () {

        testCache.data[mockKey] = mockResponse;
        testCache.get(mockKey).should.equal(mockResponse);
      });

      it('should return empty object if key not found', function() {

        var result = testCache.get(keyNotInCache);

        result.should.be.an('object').and.be.empty;
      });
    });

    describe('#clear', function () {

      it('should clear the cache', function () {

        testCache.data[mockKey] = mockResponse;
        testCache.clear();
        testCache.data.should.be.empty;
      });
    });
  });
});
