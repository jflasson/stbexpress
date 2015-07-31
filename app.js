var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/cities', function(request, response){
	var cities = ['Lotopia', 'Caspiana', 'Indigo'];
	response.json(cities);
});

module.exports = app;