const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.send({
		name: 'Your Name',
		school: [
			'BCIT',
			'SFU',
			'UBC'
		]
	})
});

app.use((request, response, next) => {
	var time = new Date().toString();
	//console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log("Unable to log message");
		}
	});
	next();
})

app.get('/maintenance', (request, response) => {
	response.render('maintenance.hbs');
})

app.use((request, response, next) => {
	response.render('maintenance.hbs');
})

app.get('/info', (request, response) => {
	response.send('My info page');
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})

app.listen(8080, () => {
	console.log('Server is up on the port 8080');
});