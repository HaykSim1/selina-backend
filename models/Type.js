const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

mongoose.model('Type', new mongoose.Schema(typeSchema, { timestamps: true }))
