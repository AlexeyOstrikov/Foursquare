const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const Photos = require('../models/Photos');
const config = require('../config');
const nanoid = require('nanoid');
const multer = require('multer');
const path = require('path');
const permit = require('../middleware/permit');

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
	router.post('/', [auth, upload.fields([{name: 'photo'}])], (req, res) => {
		const photoData = req.body;
		photoData.user = req.user._id;
		if (req.files && req.files.photo) {
			photoData.photo = req.files.photo[0].filename
		} else {
			return res.status(500).send({error: "Photo is required!"});
		}
		const photo = new Photos(photoData);
		
		photo.save()
		.then(photo => res.send(photo))
		.catch(error => res.status(400).send(error));
	});
	
	router.get('/:id', (req, res) => {
		Photos.find({placeId: req.params.id})
		.then(result => res.send(result))
		.catch(error => res.send(error));
	});
	
	router.delete('/:id', [auth, permit('admin')], (req, res) => {
		Photos.deleteOne({_id: req.params.id})
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));
	});
	
	return router;
};

module.exports = createRouter;
