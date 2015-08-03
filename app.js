//@48  min
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var redis = require('redis');
var client = redis.createClient();

client.select(1);

//client.hset('cities','Lotopia', 'Desc1');
//client.hset('cities','Caspiana', 'Desc2');
//client.hset('cities','Indigo', 'Desc3');

app.use(express.static(__dirname + '/public'));

app.get('/cities', function(request, response){
	client.hkeys('cities', function(error, names){
		if(error) throw error;
		response.json(names);
	});
});

app.post('/cities', urlencode, function(request, response){
	var newCity = request.body;
	client.hset('cities', newCity.name, newCity.description, function(error){
		if(error) throw errror;
		response.status(201).json(newCity.name);
	});
});

app.delete('/cities/:name', function(){

});

module.exports = app; 