const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const nanoid = require('nanoid');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Places = require('../models/Places');

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
		Places.find()
		.then(result => res.send(result))
		.catch(error => res.send(error));
	});
	
	router.get('/:id', [auth], (req, res) => {
		Places.findById(req.params.id)
		.then(result => res.send(result))
		.catch(error => res.send(error));
	});
	
	router.post('/', [auth, upload.fields([{name: 'image'}])], (req, res) => {
		const itemData = req.body;
		if (req.files && req.files.image) {
			itemData.image = req.files.image[0].filename
		}
		
		const item = new Places(itemData);
		
		item.save()
		.then(newses => res.send(newses))
		.catch(error => res.status(400).send(error));
	});
	
	router.put('/:id', [auth], (req, res) => {
		const item = req.body;
		item._id = req.params.id;
		
		Places.findOneAndUpdate({_id: req.params.id}, item)
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));
	});
	
	router.delete('/:id', [auth], (req, res) => {
		Places.deleteOne({_id: req.params.id})
		.then(result => res.send(result))
		.catch(error => res.status(400).send(error));
	});
	
	return router;
};

module.exports = createRouter;
