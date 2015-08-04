var request = require('supertest');
var app = require('./app.js');
var redis = require('redis');
var client = redis.createClient();

client.select(2);



describe('Requests to the root path', function(){

	it('Returns a 200 status code', function(done){
		
		request(app)
			.get('/')
			.expect(200, done)
	});

	it('Returns HTML', function(done){
		
		request(app)
			.get('/')
			.expect('Content-Type', /html/, done)
	});

	it('Returns an index file with cities', function(done){
		
		request(app)
			.get('/')
			.expect(/cities/i, done)
	});
});

describe('Listing cities on /cities', function(){
	it('Return 200 status code', function(done){
		request(app)
			.get('/cities')
			.expect(200, done)
	});

	it('Returns json', function(done){
		request(app)
			.get('/cities')
			.expect('Content-Type', /json/, done)
			
	});

	it('Returns initial cities', function(done){
		request(app)
			.get('/cities')
			.expect(JSON.stringify(["Springfield"]), done)
			
	});
});

describe('Creating new cities', function(){

	it('Return 201 status code', function(done){
		request(app)
			.post('/cities')
			.send('name=Springfield&description=where+the+simpsons+live')
			.expect(201, done)
	});

	it('Return the city name', function(done){
		request(app)
			.post('/cities')
			.send('name=Springfield&description=where+the+simpsons+live')
			.expect(/Springfield/i, done)
	});
});

describe('Delete cities', function(){

	before(function(){
		client.hset('cities', 'Banana', 'a tasty fruit');
	});

	after(function(){
		client.flushdb();
	});


	it('Return 204 status code', function(done){
		request(app)
			.delete('/cities/Banana')
			.expect(204, done)
	});
});