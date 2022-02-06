const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');

require('./database');

const locationRoutes = require('./routes/locations');
const bookingRoutes = require('./routes/booking');
const roomsRoutes = require('./routes/rooms');
const typesRoutes = require('./routes/types');

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json({
	limit: '150kb'
}));

app.use(xss());

// Routes
app.use('/api/v1/locations', locationRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/types', typesRoutes);
app.use('/api/v1/rooms', roomsRoutes);

module.exports = app;
