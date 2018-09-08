const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotosSchema = new Schema({
	photo: {
		type: String,
		required: true
	},
	placeId: {
		type: Schema.Types.ObjectId,
		ref: 'Places',
		required: true
	}
});

const Photos = mongoose.model('Photos', PhotosSchema);
module.exports = Photos;