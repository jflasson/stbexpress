//at 45  min
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

var cities = {
	'Lotopia': 'Desc1',
	'Caspiana': 'Desc2',
	'Indigo': 'Desc3'
};

app.use(express.static(__dirname + '/public'));

app.get('/cities', function(request, response){
	response.json(Object.keys(cities));
});

app.post('/cities', urlencode, function(request, response){
	var newCity = request.body;
	cities[newCity.name] = newCity.description;
	response.status(201).json(newCity.name);
});

module.exports = app;