const router = require('express').Router();

const db = require('../database/connection');
const Listings = require('./listings-model');

router.get('/', (req, res) => {
  Listings.find()
    .then((listings) => {
      res.status(200).json({ data: listings });
    })
    .catch((err) => res.send(err));
});

router.post('/', (req, res) => {
  const info = req.body;

  Listings.add(info)
    .then((feature) => {
      res.status(201).json({
        name: feature.name,
        features: feature,
      });
    })
    .catch((err) =>
      res.status(500).json({ error: 'this is the error', err }),
    );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Listings.update(id, changes)
    .then((listing) => {
      if (listing) {
        res.json({ data: listing });
      } else {
        res
          .status(404)
          .json({ message: 'could not find listing with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'failed to update listing' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('listings')
    .where({ id })
    .del()
    .then((count) => {
      if (count) {
        res.json({ removed: count });
      } else {
        res
          .status(404)
          .json({ message: 'could not find listing with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'failed to delete listing',
      });
    });
});

module.exports = router;
