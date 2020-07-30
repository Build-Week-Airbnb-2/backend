const supertest = require('supertest');

const server = require('../api/server');

const db = require('../database/connection');
const Users = require('../users/users-model');

const authRouter = require('../auth/auth-router');

describe('environment', function () {
  it('should be using the testing database', function () {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe('router', function () {
  it('runs the tests', function () {
    expect(true).toBe(true);
  });

  const credentials = {
    email: 'email@test.com',
    password: 'test',
  };

  describe('POST / with new email', function () {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should respond with 201 OK', async function () {
      await supertest(server)
        .post('/api/auth/register')
        .send(credentials)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('POST / with duplicate email', function () {
    it('should respond with 500 if email is not unique', async function () {
      await supertest(server)
        .post('/api/auth/register')
        .send(credentials)
        .then((res) => {
          expect(res.status).toBe(500);
        });
    });
  });

  describe('POST / with login', function () {
    it('should respond with 200 if credentials are valid', async function () {
      await supertest(server)
        .post('/api/auth/login')
        .send(credentials)
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it('should respond with 401 if credentials are invalid', async function () {
      await supertest(server)
        .post('/api/auth/login')
        .send({ email: 'email@test.com', password: 'error' })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });

    it('should respond with 400 if missing email', async function () {
      await supertest(server)
        .post('/api/auth/login')
        .send({ password: 'test' })
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });

    it('should respond with 400 if missing password', async function () {
      await supertest(server)
        .post('/api/auth/login')
        .send({ email: 'email@email.com' })
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('PUT / with login', function () {
    it('should respond with 201 with updated credentials', async function () {
      await supertest(server)
        .put('/api/auth/login/1')
        .send({ email: 'email@email.com', password: 'test' })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('GET / with login', function () {
    it('shouldr respond with 200 with login page', async function () {
      await supertest(server)
        .get('/api/auth/login')
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe('GET / with register', function () {
    it('should respond with 200 with registration page', async function () {
      await supertest(server)
        .get('/api/auth/register')
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
});
