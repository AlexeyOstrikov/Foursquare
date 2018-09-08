const express = require('express');
const Users = require('../models/Users');
const router = express.Router();

const createRouter = () => {
	
	router.post('/', (req, res) => {
		const user = new Users({
			username: req.body.username,
			password: req.body.password
		});
		user.save()
		.then(user => res.send(user))
		.catch(error => res.status(400).send(error))
	});
	
	router.post('/sessions', async (req, res) => {
		const user = await Users.findOne({username: req.body.username});
		
		if (!user) {
			return res.status(400).send({error: {username: 'Username not found'}});
		}
		
		const isMatch = await user.checkPassword(req.body.password);
		
		if (!isMatch) {
			return res.status(400).send({error: {password: 'Password is wrong!'}});
		}
		
		const token = user.generateToken();
		
		return res.send({message: 'User and password correct!', user, token});
	});
	
	router.delete('/sessions', async (req, res) => {
		const token = req.get('Token');
		
		const success = {message: 'Logout success!'};
		
		if (!token) return res.send(success);
		
		const user = await Users.findOne({token});
		
		if (!user) return res.send(success);
		
		user.generateToken();
		
		user.save();
		
		return res.send(success);
	});
	
	return router;
};

module.exports = createRouter;