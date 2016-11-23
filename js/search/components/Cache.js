define('components/Cache', [], function() {

  var Cache = function() {

    this.data = {};
  };

  Cache.prototype.add = function (page, data) {

    if (this.data[page]) {

      return true;
    }

    this.data[page] = data;
    return false;
  };

  Cache.prototype.get = function(page) {

    var ret = {};
    if (this.data[page]) {

      ret = this.data[page];
    }

    return ret;
  };

  Cache.prototype.clear = function() {

    this.data = {};
  };

  return Cache;
});
