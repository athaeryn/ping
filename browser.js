var render = require("./lib/renderer"),
    sample = require("./sample.json"),
    Ractive = require("ractive"),
    firstFrame, lastFrame,
    updateAnimation;

firstFrame = new Ractive({
  el: "#frame1",
  template: "#control-group",
  data: {
    ring1: {
      r: 0,
      a: 0.5
    },
    ring2: {
      r: 0,
      a: 0.5
    },
    ring3: {
      r: 0,
      a: 0.5
    }
  },
  computed: {
    asArray: function() {
      return[this.get("ring1.r") + "," + this.get("ring1.a") + ",red",
             this.get("ring2.r") + "," + this.get("ring2.a") + ",red",
             this.get("ring3.r") + "," + this.get("ring3.a") + ",red"];
    }
  }
});

lastFrame = new Ractive({
  el: "#frame2",
  template: "#control-group",
  data: {
    ring1: {
      r: 10,
      a: 0.1
    },
    ring2: {
      r: 25,
      a: 0.1
    },
    ring3: {
      r: 50,
      a: 0.1
    }
  },
  computed: {
    asArray: function() {
      return[this.get("ring1.r") + "," + this.get("ring1.a") + ",red",
             this.get("ring2.r") + "," + this.get("ring2.a") + ",red",
             this.get("ring3.r") + "," + this.get("ring3.a") + ",red"];
    }
  }
});


updateAnimation = (function() {
  var styleEl = document.getElementById("keyframes");

  return function updateAnimation(input) {
    input = {
      name: "ping",
      frames: [
        firstFrame.get("asArray"),
        lastFrame.get("asArray"),
      ]
    }
    styleEl.innerHTML = "";
    setTimeout(function() {
      styleEl.innerHTML = render(input.name, input.frames);
    }, 0);
  };
}());


firstFrame.observe("asArray", updateAnimation);
lastFrame.observe("asArray", updateAnimation);


updateAnimation(sample);
