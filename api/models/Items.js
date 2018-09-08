const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	category: {
		type: String,
		required: true
	},
	image: {
		type: String,
	},
});

const Items = mongoose.model('Items', ItemsSchema);
module.exports = Items;