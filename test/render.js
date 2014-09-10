var assert      = require("assert"),
    testData    = require("../sample.json"),
    render      = require("../lib/renderer"),
    fs          = require("fs"),
    cssbeautify = require("cssbeautify"),
    expected    = fs.readFileSync(__dirname + "/expected.css").toString(),

    beautifyOptions = {
      indent: "  ",
      openbrace: "end-of-line",
      autosemicolon: true
    };

describe("Renderer", function() {
  it("should render the proper CSS", function() {
    assert.equal(
      cssbeautify(
        render(testData.name, testData.frames),
        beautifyOptions
      ),
      expected
    );
  });
});
