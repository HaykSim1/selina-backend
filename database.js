const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./models/Location');
require('./models/Booking');
require('./models/Room');
require('./models/Type');

const dbUrl = process.env.DB_URI

mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	retryWrites: false,
});


