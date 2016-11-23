define(function () {

  var instance = null;

  function Globals() {

    this.query = null;
    this.router = null;
  }

  return function getProp(prop) {

    instance = instance || new Globals();
    return instance;
  };

});
