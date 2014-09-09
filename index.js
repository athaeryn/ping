var render = require("./lib/renderers");
var input = require("./input.json");

boxShadows = render.boxShadows(input.frames);
keyframes = render.keyframes(input.name, boxShadows);

console.log(keyframes);
