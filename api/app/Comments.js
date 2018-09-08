const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const Comments = require('../models/Comments');

const createRouter = () => {
	
	router.post('/', auth, (req, res) => {
		const commentData = req.body;
		commentData.rateUser = req.user._id;
		const comment = new Comments(commentData);
		Comments.find({rateUser: req.user._id}).then(comments => {
			if (comments && comments.length !== 0){
				return res.status(400).send({error: "You can not comment!"});
			}
		});
		comment.save()
		.then(newses => res.send(newses))
		.catch(error => res.status(400).send(error));
	});
	
	return router;
};

module.exports = createRouter;
