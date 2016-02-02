var express = require('express');
var app = express();

app.use(express.static(__dirname+"/app"));

app.get('/', function(req, res){
	res.sendFile(__dirname+'/views/index.html');
});

app.listen(3002);