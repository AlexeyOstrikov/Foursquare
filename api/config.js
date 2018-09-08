const path = require('path');

const rootPath = __dirname;

module.exports = {
	rootPath,
	uploadPath: path.join(rootPath, '/public/uploads'),
	db: {
		url: 'mongodb://localhost:27017',
		name: 'controlwork'
	},
	jwt: {
		secret: 'some kinda very secret key',
		expires: '7d'
	},
};