const mongoose = require('mongoose');

const Room = mongoose.model('Room');

exports.get = async function(req, res) {
	const { locationId } = req.params;
	try {
		const rooms = await Room.find({ locationId });

		res.status(200).json({ error: false, message: '', data: rooms });
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
		const room = new Room(body);

		await room.save();

		res.status(200).json({ error: false, message: '', data: room });
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