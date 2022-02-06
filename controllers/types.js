const mongoose = require('mongoose');

const Type = mongoose.model('Type');

exports.get = async function(req, res) {
	try {
		const types = await Type.find({});

		res.status(200).json({ error: false, message: '', data: types });
	} catch (e) {
		const keys = Object.keys(e.errors);
		const message = keys.map(key => ({ name: key, type: e.errors[key].kind }));
		res.status(500).json({
			error: true,
			message,
			data: null,
		});
	}
};

exports.create = async function(req, res) {
	const { body } = req;

	try {
		const type = new Type(body);

		await type.save();

		res.status(200).json({ error: false, message: '', data: type });
	} catch (e) {
		const keys = Object.keys(e.errors);
		const message = keys.map(key => ({ name: key, type: e.errors[key].kind }));
		res.status(500).json({
			error: true,
			message,
			data: null,
		});
	}
};