var renderers = require("./lib/renderers");

var input = {
  frames: [
    [
      "0,.5,#ff7777",
      "0,.5,#ff7777",
      "0,.5,#ff7777"
    ],
    [
      "50,0,#7777ff",
      "25,0,#7777ff",
      "10,0,#7777ff"
    ]
  ]
};

console.log(renderers.boxShadows(input));
