process.env.NODE_ENV = 'test';

const chai = require('chai');
const mongoose =  require('mongoose');
const chaiHttp = require('chai-http');
const server = require('../server');

const Location = mongoose.model('Location');
const should = chai.should();

chai.use(chaiHttp);

describe('Locations', () => {
	beforeEach((done) => {
		Location.remove({}, (err) => {
			done();
		});
	});

	describe('/GET locations', () => {
		it('it should GET all locations', (done) => {
			chai.request(server)
				.get('/api/v1/locations')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('error').eql(false);
					done();
				});
		});
	});


	describe('/POST location', () => {
		it('it should POST a location', (done) => {
			let book = {
				name: "Varadero Hotel",
				country: "Cuba",
				region: "Varadero"
			}
			chai.request(server)
				.post('/api/v1/locations')
				.send(book)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					res.body.should.have.property('error').eql(false);
					res.body.should.have.property('data').be.a('object');
					done();
				});
		});
	});

	it('it should not POST a location without region', (done) => {
		let book = {
			name: "Varadero Hotel",
			country: "Cuba"
		}
		chai.request(server)
			.post('/api/v1/locations')
			.send(book)
			.end((err, res) => {
				res.should.have.status(500);
				res.body.should.be.a('object');
				res.body.should.have.property('error');
				res.body.should.have.property('error').eql(true);
				res.body.should.have.property('message').be.a('array');
				done();
			});
	});
});