const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: async function (value) {
				if (!this.isModified('username')) return true;
				
				const user = await Users.findOne({username: value});
				if (user) throw new Error('This user already exists');
				return true;
			},
			message: 'This username already exists'
		}
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin']
	},
});

UsersSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
	this.password = await bcrypt.hash(this.password, salt);
	
	next();
});

UsersSchema.methods.checkPassword = function (password) {
	return bcrypt.compare(password, this.password);
};

UsersSchema.methods.generateToken = function () {
	return jwt.sign({id: this._id}, config.jwt.secret, {expiresIn: config.jwt.expires});
};

UsersSchema.set('toJSON', {
	transform: (doc, ret, options) => {
		delete ret.password;
		return ret;
	}
});


const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;