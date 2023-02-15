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

/*
A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
*/
// unix timestamp,
app.get("/api/:date", function (req, res) {
  console.log(req.params.date);
  const newDate = req.params.date ? new Date(req.params.date) : new Date();
  if (!newDate) {
    res.json({ error: "Invalid Date" });
  } else {
    const unixdate = Math.floor(newDate.getTime() / 1000);
    const datestring = newDate.toDateString();
    console.log(unixdate);
    console.log(datestring);
    res.json({ unix: unixdate, utc: datestring });
  }
});

app.get("/api/", function (req, res) {
  const newDate = new Date();
  console.log(newDate);
  if (!newDate) {
    res.json({ error: "Invalid Date" });
  } else {
    const unixdate = Math.floor(newDate.getTime() / 1000);
    const datestring = newDate.toDateString();
    console.log(unixdate);
    console.log(datestring);
    res.json({ unix: unixdate, utc: datestring });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
