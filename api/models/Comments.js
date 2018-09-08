const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
	food: {
		type: Number,
		required: true
	},
	service: {
		type: Number,
		required: true
	},
	interior: {
		type: Number,
		required: true
	},
	rateUser: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	placeId: {
		type: Schema.Types.ObjectId,
		ref: 'Places',
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

const Comments = mongoose.model('Comments', CommentsSchema);
module.exports = Comments;