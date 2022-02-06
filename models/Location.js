const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	region: {
		type: String,
		required: true,
	},
});

mongoose.model('Location', new mongoose.Schema(locationSchema, { timestamps: true }))
