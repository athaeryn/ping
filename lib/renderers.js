var Color = require("color");


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

function renderRing(ring) {
  var parts = getParts(ring);
  return "0 0 0 " + parts.diameter + "px " + parts.color;
};

function getPercent(index, count) {
  return index / (count - 1) * 100;
}

function renderKeyframe(frame, index, frameCount) {
  return getPercent(index, frameCount) + "% { " + frame + " }";
}

module.exports = {
  boxShadows: function renderBoxShadows(frames) {
    return frames.map(function(frame) {
      return "box-shadow: " + frame.map(renderRing);
    });
  },

  keyframes: function renderKeyframes(name, frames) {
    kframes = frames.map(function(frame, index) {
      return renderKeyframe(frame, index, frames.length);
    });
    return "@keyframes " + name + " { " + kframes + " }";
  }
}
