const router = require('express').Router();

const db = require('../database/connection');
const Users = require('./users-model');

router.get('/', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({
        data: users,
        jwt: req.jwt,
      });
    })
    .catch((err) => res.send(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
    .then((user) => {
      if (user) {
        res.json({ data: user });
      } else {
        res
          .status(404)
          .json({ message: 'could not find user with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'failed to update user' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('users')
    .where({ id })
    .del()
    .then((count) => {
      if (count) {
        res.json({ removed: count });
      } else {
        res
          .status(404)
          .json({ message: 'could not find user with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'failed to delete user',
      });
    });
});

module.exports = router;
