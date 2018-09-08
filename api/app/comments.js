const moment = require("moment");
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const Comments = require('../models/Comments');

const createRouter = () => {
	
	router.post('/', auth, (req, res) => {
		const commentData = req.body;
		for (let i = 0; i < Object.values(commentData).length; i++) {
			let value = Object.values(commentData)[i];
			if (value === "" || value === 0) {
				return res.status(400).send({error: "All fields is required!"});
			}
		}
		Comments.find({rateUser: req.user._id}).then(comments => {
			for (let i = 0; i < comments.length; i++){
				if (comments[i].placeId.equals(req.body.placeId)) {
					return res.status(400).send({error: "You can not comment!"});
				}
			}
			commentData.rateUser = req.user._id;
			commentData.date = moment();
			const comment = new Comments(commentData);
			comment.save()
			.then(newses => res.send(newses))
			.catch(error => res.status(400).send(error));
			
		});
	});
	
	router.get('/:id', (req, res) => {
		Comments.find({placeId: req.params.id}).populate("rateUser")
		.then(result => res.send(result))
		.catch(error => res.send(error));
	});
	
	router.delete('/:id', auth, (req, res) => {
		Comments.findById(req.params.id).then(result => {
			if (req.user._id.equals(result.rateUser) || req.user.role === 'admin') {
				Comments.deleteOne({_id: req.params.id})
				.then(result => res.send(result))
				.catch(error => res.status(400).send(error));
			} else {
				res.status(400).send({error: "You can not delete comment!"})
			}
		}).catch(error => res.status(400).send(error));
	});
	
	return router;
};

module.exports = createRouter;
