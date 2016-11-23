// Code for Action: Nerd Wallet Tracking
(function() {
  var w = window, d = document;
  var s = d.createElement('script');
  s.setAttribute('async', 'true');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', '//c1.rfihub.net/js/tc.min.js');
  var f = d.getElementsByTagName('script')[0];
  f.parentNode.insertBefore(s, f);
  if (typeof w['_rfi'] !== 'function') {
    w['_rfi']=function() {
      w['_rfi'].commands = w['_rfi'].commands || [];
      w['_rfi'].commands.push(arguments);
    };
  }
  _rfi('setArgs', 'ver', '9');
  _rfi('setArgs', 'rb', '19835');
  _rfi('setArgs', 'ca', '20674671');
  _rfi('track');

  var s = document.createElement("noscript");
  document.body.appendChild(s);
  var i = document.createElement("iframe");
  i.src = '//20674671p.rfihub.com/ca.html?rb=19835&ca=20674671&ra=YOUR_CUSTOM_CACHE_BUSTER';
  i.style = 'display:none;padding:0;margin:0';
  i.width = '0';
  i.height = '0';
  s.appendChild(i);
})();


