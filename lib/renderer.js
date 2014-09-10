var Color    = require("color"),
    mustache = require("mustache"),
    renderBoxShadow,
    renderKeyframe;


renderBoxShadow = (function(){
  return function(frame) {
    return "box-shadow: " + frame.map(renderRing);
  };

  function renderRing(ring) {
    var parts = getParts(ring);
    return "0 0 0 " + parts.diameter + "px " + parts.color;
  }

  function getParts(ring) {
    var components = ring.split(","),
        diameter = components[0],
        opacity  = components[1],
        color    = components[2];
    return {
      diameter: diameter,
      opacity:  opacity,
      color:    Color(color).alpha(opacity).rgbaString()
    };
  }
}())


renderKeyframe = function(args) {
  var getPercent = (function(count) {
    return function getPercent(index) {
      return index / (count - 1) * 100;
    };
  }(args.count));

  return function renderKeyframe(frame, index) {
    return getPercent(index) + "% { " + frame + " }";
  };
};


module.exports = function render(name, frames) {
  var kframes = frames
    .map(renderBoxShadow)
    .map(renderKeyframe({count: frames.length}))
    .join(" ");
  return "@-webkit-keyframes " + name + " { " + kframes + " } "
    + ".circle { "
    + "  position: absolute; top: 50%; left: 50%; "
    + "  width: 4px; height: 4px; "
    + "  border-radius: 2px; "
    + "  background-color: red; "
    + "  -webkit-animation: ping 1s infinite ease-out; "
    + "     -moz-animation: ping 1s infinite ease-out; "
    + "          animation: ping 1s infinite ease-out; "
    + "}";
};
