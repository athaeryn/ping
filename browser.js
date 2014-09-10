var render   = require("./lib/renderer"),
    sample   = require("./sample.json"),
    updateAnimation;


updateAnimation = (function() {
  var styleEl = document.getElementById("keyframes");

  return function updateAnimation(input) {
    styleEl.innerHTML = render(input.name, input.frames);
  };
}());


updateAnimation(sample);
