const supertest = require('supertest');

const server = require('../api/server');

const usersRouter = require('../users/users-router');
const Users = require('../users/users-model');

describe('users router', function () {
  it('runs the tests', function () {
    expect(true).toBe(true);
  });
});
