const dotenv = require('dotenv');

dotenv.config({
	path: '.env'
});

const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Application is running on port ${port}`);
});

module.exports = app;
