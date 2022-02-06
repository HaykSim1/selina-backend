const mongoose = require('mongoose');

const Location = mongoose.model('Location');

exports.get = async function(req, res) {
	const { filter, sort } = req.query;

	const order = {[sort ? 'country' : 'createdAt']: sort || 'asc'}
	const condition = filter ? { country: new RegExp(filter, 'i') } : {};

	try {
		const locations = await Location.find(condition).sort(order);

		res.status(200).json({ error: false, message: '', data: locations });
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
		const location = new Location(body);

		await location.save();

		res.status(200).json({ error: false, message: '', data: location });
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