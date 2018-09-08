const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const nanoid = require('nanoid');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Places = require('../models/Places');
const Comments = require('../models/Comments');

const config = require('../config');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, config.uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, nanoid() + path.extname(file.originalname));
	}
});

const upload = multer({storage});

const createRouter = () => {
	router.get('/', (req, res) => {
		Places.find().then(async result => {
			const newPlaces = result.map(async place => {
				await Comments.find({placeId: place._id}).then(comment => {
					const comments = [];
					if (comment.length !== 0) {
						comment.forEach(c => {
							comments.push(c);
						});
					}
					return comments;
				}).then(comments => {
					const acc = {food: 0, service: 0, interior: 0};
					let average = comments.reduce((sum, vote) => {
						let food = sum.food + vote.food;
						let service = sum.service + vote.service;
						let interior = sum.interior + vote.interior;
						return {...sum, food, service, interior};
					}, acc);
					const length = comments.length === 0 ? 1 : comments.length;
					average = {
						food: average.food / length,
						service: average.service / length,
						interior: average.interior / length,
					};
					const avg = Object.values(average).reduce((sum, vote) => {
						return sum + vote;
					}, 0);
					const size = Object.keys(average).length;
					average.avg = avg / size;
					place = {...place.toObject(), average};
					return place;
				});
				return place;
			});
			const places = await Promise.all(newPlaces);
			res.send(places);
		}).catch(error => res.send(error));
	});
	
	router.get('/:id', [auth], (req, res) => {
		Places.findById(req.params.id)
		.then(async place => {
			await Comments.find({placeId: place._id}).then(comment => {
				const comments = [];
				if (comment.length !== 0) {
					comment.forEach(c => {
						comments.push(c);
					});
				}
				return comments;
			}).then(comments => {
				const acc = {food: 0, service: 0, interior: 0};
				let average = comments.reduce((sum, vote) => {
					let food = sum.food + vote.food;
					let service = sum.service + vote.service;
					let interior = sum.interior + vote.interior;
					return {...sum, food, service, interior};
				}, acc);
				const length = comments.length === 0 ? 1 : comments.length;
				average = {
					food: average.food / length,
					service: average.service / length,
					interior: average.interior / length,
				};
				const avg = Object.values(average).reduce((sum, vote) => {
					return sum + vote;
				}, 0);
				const size = Object.keys(average).length;
				average.avg = avg / size;
				place = {...place.toObject(), average};
				return place;
			});
			res.send(place);
		}).catch(error => res.send(error));
	});
	
	router.post('/', [auth, upload.fields([{name: 'image'}])], (req, res) => {
		const placeData = req.body;
		if (req.files && req.files.image) {
			placeData.image = req.files.image[0].filename
		}
		
		const item = new Places(placeData);
		
		item.save()
		.then(places => res.send(places))
		.catch(error => res.status(400).send(error));
	});
	
	return router;
};

module.exports = createRouter;