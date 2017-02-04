var express = require('express');
var app = express();
var fs = require('fs');
var port = 8080;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/prices', function(req, res){
	fs.readFile('prices.json', 'utf8', function(err, data){
		var prices = JSON.parse(data);
		res.locals = { prices: prices }
		res.render('prices.ejs');
	});
});

app.get('/prices/:id', function(req, res){
	fs.readFile('prices.json', 'utf8', function(err, data){
	var pricesParsed = JSON.parse(data);
	 var pricesp = pricesParsed.filter(function(pricesp){
		return pricesp.id === req.params.id;
	})[0];
	 res.locals = {pricesp: pricesp}
	 res.render('price.ejs');
	});
});

app.listen(port);

console.log("Initialization complete, listening on port " + port);