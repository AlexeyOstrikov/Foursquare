const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlacesSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
});

const Places = mongoose.model('Places', PlacesSchema);
module.exports = Places;