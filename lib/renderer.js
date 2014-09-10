var Color    = require("color"),
    mustache = require("mustache"),
    renderBoxShadow,
    renderKeyframe,
    cssTemplate;


renderBoxShadow = (function(){
  var template = "0 0 0 {{diameter}}px {{color}}"

  return function renderBoxShadow(frame) {
    return "box-shadow: " + frame.map(getDiameterAndColor).map(renderShadow)
  };

  function renderShadow(shadow) {
    return mustache.render(template, shadow).replace("\n", "");
  }

  function getDiameterAndColor(ring) {
    var parts = ring.split(",");  // [diameter, opacity, color]
    return {
      diameter: parts[0],
      color: Color(parts[2]).alpha(parts[1]).rgbaString()
    };
  }
}());


renderKeyframe = function(args) {
  var getPercent = (function(count) {
    return function getPercent(index) {
      return index / (count - 1) * 100;
    };
  }(args.count));

  template = "{{percent}}% { {{frame}} }"

  return function renderKeyframe(frame, index) {
    var percent = getPercent(index);
    return mustache.render(template, {percent: percent, frame: frame});
  };
};

cssTemplate = ""
  + "@-webkit-keyframes {{name}} { {{keyframes}} } "
  + "@-moz-keyframes {{name}} { {{keyframes}} } "
  + "@keyframes {{name}} { {{keyframes}} } "
  + ".circle { "
  + "  position: absolute; top: 50%; left: 50%; "
  + "  width: 4px; height: 4px; "
  + "  border-radius: 2px; "
  + "  background-color: red; "
  + "  -webkit-animation: ping 1s infinite alternate ease-out; "
  + "      -moz-animation: ping 1s infinite alternate ease-out; "
  + "          animation: ping 1s infinite alternate ease-out; "
  + "}\n"

module.exports = function render(name, frames) {
  var keyframes = frames.map(renderBoxShadow)
                        .map(renderKeyframe({count: frames.length}))
                        .join(" ");
  return mustache.render(cssTemplate, {name: name, keyframes: keyframes });
};
