// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// unix timestamp,
app.get("/api/:date", function (req, res) {
  // check if date is 13 integer string
  let datestring = req.params.date;
  console.log(datestring);
  let isUnix = !!datestring.match(/\d{13}/);
  console.log(isUnix);

  // if unix, multiply by 1000 to get date, if not use normal
  const newDate = isUnix ? new Date(datestring * 1000) : new Date(datestring);
  console.log(newDate);
  if (newDate.toUTCString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: newDate.valueOf(), utc: newDate.toUTCString() });
  }
});

app.get("/api/", function (req, res) {
  const newDate = new Date();
  res.json({ unix: newDate.valueOf(), utc: newDate.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
