const supertest = require('supertest');

const server = require('../api/server');

const authRouter = require('../auth/auth-router');

describe('router', function () {
  it('runs the tests', function () {
    expect(true).toBe(true);
  });

  describe('POST /', function () {
    it('should respond with 201 OK', async function () {
      await supertest(server)
        .post('/api/auth/register')
        .send({ email: 'email@test.com', password: 'test' })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });

    it('should respond with 500 if email is not unique', async function () {
      await supertest(server)
        .post('/api/auth/register')
        .send({ email: 'email@test.com', password: 'test' })
        .then((res) => {
          expect(res.status).toBe(500);
        });
    });
  });
});
