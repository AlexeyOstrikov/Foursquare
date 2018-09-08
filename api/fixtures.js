const moment = require("moment");
const mongoose = require('mongoose');
const config = require('./config');

const Users = require('./models/Users');
const Places = require('./models/Places');
const Comments = require('./models/Comments');
const Photos = require('./models/Photos');
mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', async () => {
	try {
		await db.dropCollection('users');
		await db.dropCollection('places');
		await db.dropCollection('comments');
		await db.dropCollection('photos');
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
	
	const [faiza, pinta, blonder] = await Places.create({
		title: 'Фаиза',
		description: 'Очень вкусно и очень дёшево. Отличный холодный суп Ашлям-фу, плов с узгенским рисом, дивный босо-лагман (жареный). Цена за порцию, довольно большую - около $3 в пересчете. А можно и полпорции брать.',
		image: "faiza.jpg",
		user: user._id,
	}, {
		title: 'Pinta Pub',
		description: 'Неустанно могу твердить,что самый лучший шашлык в Пинта пабе)) ну а лепешка на гриле и соус к нему...ну просто объедение)).',
		image: "pinta.jpg",
		user: admin._id,
	}, {
		title: 'Blonder Pub',
		description: 'Любителям пива budweiser советую туда. По поводу шашлыка, со второго раза получился отменный, нежный и сочный шашлычок.P.S Требуйте изначально чтобы хорошо приготовили.',
		image: "blonder.jpg",
		user: user._id,
	});
	
	await Comments.create({
		food: 5,
		service: 2,
		interior: 4,
		rateUser: admin._id,
		comment: "Маринованные огурцы помидоры под водку ужасно не вкусно. Темное пиво говно. Музыка живая отстой. Сосиски к пиву хорошо!",
		placeId: faiza._id,
		date: moment(),
	}, {
		food: 5,
		service: 4,
		interior: 4,
		rateUser: user._id,
		comment: "Маринованные огурцы помидоры под водку ужасно не вкусно. Темное пиво говно. Музыка живая отстой. Сосиски к пиву хорошо!",
		placeId: pinta._id,
		date: moment(),
	},{
		food: 5,
		service: 5,
		interior: 5,
		rateUser: user._id,
		comment: "Маринованные огурцы помидоры под водку ужасно не вкусно. Темное пиво говно. Музыка живая отстой. Сосиски к пиву хорошо!",
		placeId: blonder._id,
		date: moment(),
	});
	
	await Photos.create({
		photo: "blonder.jpg",
		placeId: faiza._id,
		user: admin._id
	},{
		photo: "pinta.jpg",
		placeId: pinta._id,
		user: user._id
	},{
		photo: "faiza.jpg",
		placeId: blonder._id,
		user: admin._id
	},{
		photo: "blonder.jpg",
		placeId: faiza._id,
		user: user._id
	},{
		photo: "pinta.jpg",
		placeId: blonder._id,
		user: admin._id
	},{
		photo: "faiza.jpg",
		placeId: pinta._id,
		user: user._id
	},);
	
	db.close();
});