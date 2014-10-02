var browserify = require("browserify-middleware"),
    express = require("express"),
    app = express();


app.get("/js/app.js", browserify("./browser.js"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000)
