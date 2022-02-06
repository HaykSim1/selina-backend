# Getting Started with Selina Backend

For sorting and filtering locations by country `api/v1/locations?filter=somename&order=asc|desc`

## Needed steps

1. Create locations  POST: `api/v1/locations`
2. Create types POST: `api/v1/types`
3. Create rooms as much as yuo need `api/v1/rooms`

## Needed global dependencies

MongoDB is must, because I use that db

## Available Scripts

Rename example.env to .env

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm test`

For testing some routes with mocha