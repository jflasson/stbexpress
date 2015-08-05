//@90  min
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var redis = require('redis');
var client = redis.createClient();

console.log(process.env.PWD);
console.log(__dirname);

app.use(express.static(__dirname + '/public'));
var cities = require('./routes.cities');
app.use('/cities', cities);

app.set('views', __dirname + '/views')


module.exports = app;