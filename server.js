var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  const myDate = new Date();
  const returnedObj = {
    unix: myDate.getTime(),
    utc: myDate.toUTCString()
  }
  res.send(returnedObj);
});

app.get("/api/:dateString", (req, res) => {
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


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});