//@90  min
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var redis = require('redis');
var client = redis.createClient();

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

app.get('/cities/:name', function(request, response){
	client.hget('cities', request.params.name, function(error, description){
		response.render('show.ejs', { city: { name: request.params.name, description: description}});
	});

});

app.post('/cities', urlencode, function(request, response){
	var newCity = request.body;
	if(!newCity.name || !newCity.description){
		response.sendStatus(400);
		return false;
	}
	client.hset('cities', newCity.name, newCity.description, function(error){
		if(error) throw errror;
		response.status(201).json(newCity.name);
	});
});

app.delete('/cities/:name', function(request, response){
	client.hdel('cities', request.params.name, function(error){
		if (error) throw error;
		response.sendStatus(204);
	});
});

module.exports = app; 