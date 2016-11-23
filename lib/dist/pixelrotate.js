var rotatePixel = function() {
  var s = document.createElement("script");
  s.type = "text/javascript";
  if (NW.analytics.uid ? parseInt(NW.analytics.uid, 16) % 2 : Date.now() % 2) {
    s.src = "/lib/dist/rocketmedia.js"
  } else {
    s.src = "/lib/dist/floodlight.js"
  }
  document.body.appendChild(s);
}

$( document ).ready(function() {
  rotatePixel();
});
