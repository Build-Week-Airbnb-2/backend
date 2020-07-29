const db = require('../database/connection');
const Users = require('./users-model');

describe('environment', function () {
  it('should be using the testing database', function () {
    expect(process.env.DB_ENV).toBe('testing');
  });
});
