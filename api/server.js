const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const users = require('./app/users');
const places = require('./app/places');
const comments = require('./app/comments');
const photos = require('./app/photos');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;
const port = 8000;

db.once('open', () => {
	console.log('Mongoose connected!');
	app.use('/users', users());
	app.use('/places', places());
	app.use('/comments', comments());
	app.use('/photos', photos());
	
	app.listen(8000, () => {
		console.log(`Server started on ${port} port!`);
	});
});
