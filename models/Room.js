const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
	locationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Location',
		required: true,
	},
	typeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Type',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	}
});

mongoose.model('Room', new mongoose.Schema(roomSchema, { timestamps: true }))
