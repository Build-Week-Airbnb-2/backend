const db = require('../database/connection');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};

function find() {
  return db('listings').select('id').orderBy('id');
}

function findBy(filter) {
  return db('listings').where(filter);
}

async function add(listing) {
  try {
    const [id] = await db('listings').insert(listing, 'id');

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db('listings').where({ id }).first();
}

function update(id, changes) {
  return db('listings')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db('listings').where('id', Number(id)).del();
}
