var express = require('express')
var alexa = require('alexa-app');
var bodyParser = require('body-parser');

var server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.set('view engine','ejs');

var port = process.env.PORT || 3978;
var app = new alexa.app('test');
var name;
var claims = [];

app.launch(function(request, response) {
    response.say('Welcome, are you alone?');
	response.shouldEndSession(false);
});

app.intent("visitors",
	{
		"slots":{},
		"utterances": [
			"no"
		]
	},
	function(request,response) {
		response.say("<s>Hi! Welcome to Jose's home. The Wi-Fi password is x and you have some fresh beer in the fridge</s>");
		response.shouldEndSession(false);		
	}
);

app.intent("alone",
	{
		"slots":{},
		"utterances": [
			"yes"
		]
	},
	function(request,response) {
		response.say("<s>Hi! Welcome home! I hope your day was well</s>");
		response.shouldEndSession(false);		
	}
);

app.intent("goodbyeIntent",
	{
		"slots":{},
		"utterances": [
			"goodbye"
		]
	},
	function(request,response) {
		response.say("<s>Goodbye</s>");
		response.shouldEndSession(true);		
	}
);

app.express(server, "/welcome/");

server.listen(port);
console.log("Listening on port "+port);