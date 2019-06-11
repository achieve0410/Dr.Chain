/*
 * Created on June 11, 2019
 * Dr.Chain Project
 * @author: Jae-Hyeong Kim, Su-Min Lee, Won-Hyo Choi
 */
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookie_parser = require('cookie-parser');
const fs = require('fs');

const user = require('./use_db/user.js');
const records = require('./use_db/records.js');
const html_router = require('./router/html_router.js');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookie_parser());

app.use('/user', user);
app.use('/records', records);
app.use('', html_router);



// app.get('/post', (req, res) => {
// 	fs.readFile('post.html', (err, data) => {
// 		res.writeHead(200, {'Content-Type':'text/html'});
// 		res.end(data);
// 	});
// });



// login function
app.get('/login', (req, res) => {
	fs.readFile('login.html', (err, data) => {
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end(data);
	});
});

// select function in main page
app.get('/select', (req, res) => {
	fs.readFile('select.html', (err, data) => {
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end(data);
	});
});

app.get('/imgs', (req, res) => {
	fs.readFile('image.jpg', (err, data) => {
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end(data);
	});
});


app.use(function(error, req, res, next) {
	res.json({ message: error.message });
});

app.listen(30001, () => {
	console.log('start');
})
