const mongoose = require('mongoose');

const Booking = mongoose.model('Booking');
const Room = mongoose.model('Room');

const unknownError = { name: "unknown", type: "Unknown error, pls try again later" };

exports.get = async function(req, res) {
	const { startDate, endDate } = req.body;
	const { locationId } = req.params;

	try {
		const rooms = await Room.find({ locationId }).populate('typeId');
		const ids = rooms.map(item => item._id);

		const bookings = await Booking.find().where('roomId').in(ids).or([
			{startDate: { $gte: startDate, $lte: endDate }},
			{endDate: { $gte: startDate, $lte: endDate }},
		]);

		const availableRooms = rooms.filter(room => !bookings.some(book => room._id.equals(book.roomId)));

		res.status(200).json({ error: false, message: '', data: availableRooms });
	} catch (e) {
		if(!e?.errors) {
			return res.status(500).json({
				error: true,
				message: [unknownError],
				data: null,
			});
		}

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
	const { startDate, endDate, roomId, ...body } = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {

		// There maybe more actions, ex. add info in  user table, or check/update some other data
		const bookings = await Booking.findOne({ roomId }).or([
			{startDate: { $gte: startDate, $lte: endDate }},
			{endDate: { $gte: startDate, $lte: endDate }},
		]).session(session);

		if(bookings) {
			session.endSession();
			return res.status(200).json({ error: true, message: 'This room is no longer available', data: null });
		}

		const location = new Booking({ ...body, endDate, startDate, roomId });

		await location.save({ session });

		await session.commitTransaction();
		res.status(200).json({ error: false, message: 'Thank  you for your booking', data: null });
	} catch (e) {
		if(!e?.errors) {
			return res.status(500).json({
				error: true,
				message: [unknownError],
				data: null,
			});
		}

		const keys = Object.keys(e.errors);
		const message = keys.map(key => ({ name: key, type: e.errors[key].kind }));

		res.status(500).json({
			error: true,
			message,
			data: null,
		});
	}

	session.endSession();
};