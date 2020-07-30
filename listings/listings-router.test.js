const jwt = require('jsonwebtoken');
const supertest = require('supertest');

const server = require('../api/server');

const db = require('../database/connection');
const Users = require('../users/users-model');
const Listings = require('../listings/listings-model');

const listingsRouter = require('../listings/listings-router');

describe('environment', function () {
  it('should be using the testing database', function () {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

let token;

const credentials = {
  email: 'email@email.com',
  password: 'email',
};

beforeAll((done) => {
  supertest(server)
    .post('/api/auth/login')
    .send(credentials)
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

describe('GET /', () => {
  // token not being sent - should respond with a 401
  test('It should require authorization', () => {
    return supertest(server)
      .get('/api/listings')
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });
  // send the token - should respond with a 200
  test('It responds with JSON', () => {
    return supertest(server)
      .get('/api/listings')
      .set('Authorization', 'Bearer' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
      });
  });
});

// describe('router', function () {
//   it('runs the tests', function () {
//     expect(true).toBe(true);
//   });

//   const features = {
//     host_about_len:
//       'My wife and I own this house and rent out the guest rooms on weekends',
//     description_len: 'A quiet house in north seattle',
//     property_type: 'House',
//     neighbourhood: 'Silver Lake',
//     city: 'Everett',
//     state: 'WA',
//     zipcode: '98208',
//     bathrooms: 1.75,
//     bedrooms: 3,
//     beds: 6,
//     accommodates: 6,
//     guests_included: 2,
//     square_feet: '1200',
//     cancellation_policy: 'moderate',
//     instant_bookable: 't',
//     is_business_travel_ready: 'f',
//     review_scores_rating: 90,
//     number_of_reviews: 4,
//     transit_len: 'There is a bus stop at the end of the street!',
//     name: 'Silver Lake House',
//   };

//   const credentials = {
//     email: 'email@test.com',
//     password: 'test',
//   };

//   describe('GET /', function () {
//     it('should respond with 201 OK', async function () {
//       await supertest(server)
//         .post('/api/auth/register')
//         .send(credentials)
//         .then((res) => {
//           expect(res.status).toBe(201);
//         });
//     });

//     it('should respond with 200 if credentials are valid', async function () {
//       await supertest(server)
//         .post('/api/auth/login')
//         .send(credentials)
//         .then((res) => {
//           expect(res.status).toBe(200);
//         });
//     });

//     it('should respond with 200 with listings', async function () {
//       await supertest(server)
//         .get('/api/listings')
//         .send(req.headers.authorization)
//         .then((res) => {
//           expect(res.status).toBe(200);
//         });
//     });
//   });
// });
