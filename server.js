// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", (req, res) => {
  const myDate = new Date();
  const returnedObj = {
    unix: myDate.getTime(),
    utc: myDate.toUTCString()
  }
  res.send(returnedObj);
});

app.get("/api/timestamp/:dateString", (req, res) => {
  const dateString = req.params.dateString;
  var returnedObj;
  
  var myDate = new Date(dateString);
  
  if (isNaN(myDate.getTime())) {
    myDate = new Date(parseInt(dateString));  
  }
  
  if (isNaN(myDate.getTime())) {
    returnedObj = {
      error: 'Invalid Date'
    }
  } else {
    returnedObj = {
      unix: myDate.getTime(),
      utc: myDate.toUTCString()
    }  
  }
  
  res.send(returnedObj);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});