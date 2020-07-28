const express = require('express');

const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const listingsRouter = require('../listings/listings-router');
const restricted = require('../auth/restricted-middleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, usersRouter);
server.use('/api/listings', restricted, listingsRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = server;
