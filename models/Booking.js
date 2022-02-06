const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
	// Just for feature, now it will be null
	userId: {
		type: String,
		required: false,
		default: null,
	},
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room',
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	status: {
		type: Number,
		default: 0
	},
});

mongoose.model('Booking', new mongoose.Schema(bookingSchema, { timestamps: true }))
