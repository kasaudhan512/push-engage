var express = require('express');
var bodyParser = require('body-parser');

require('./config/config');
require('./config/connection');
require('./routes/routes');
require('./producers/producer');
require('./consumers/consumer');

var route = require('./routes/routes');
var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.get('/ping', function(req, res) {
	return res.send("PONG");
});

app.listen(PORT, function () {
    console.log("Listening on " + PORT);
});
app.use('/admin',route);

