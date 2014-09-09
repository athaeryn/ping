var Color = require("color");

renderRing = function renderRing(ring) {
  var components, diameter, opacity, color;
  components = ring.split(",");
  diameter   = components[0];
  opacity    = components[1];
  color      = Color(components[2]).alpha(opacity).rgbaString();
  return "box-shadow: 0 0 0 " + diameter + "px " + color;
};

module.exports = {
  boxShadows: function renderBoxShadows(input) {
    return input.frames.map(function(frame) {
      return frame.map(renderRing);
    });
  }
}
