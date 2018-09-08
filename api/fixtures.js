const mongoose = require('mongoose');
const config = require('./config');

const Users = require('./models/Users');

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', async () => {
	try {
		await db.dropCollection('users');
	} catch (e) {
		console.log('Collections were not present, skipping drop...');
	}
	
	const [admin, user] = await Users.create({
		username: 'admin',
		password: 'admin',
		role: 'admin',
	}, {
		username: 'user',
		password: 'user',
		role: 'user',
	});
	
	db.close();
});