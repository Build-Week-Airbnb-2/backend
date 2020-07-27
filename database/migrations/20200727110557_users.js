exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments();

      tbl.string('email', 128).notNullable().unique().index();
      tbl.string('password', 256).notNullable();
    })
    .createTable('listings', (tbl) => {
      tbl.increments();
      tbl.string('room_type', 128);
      tbl.string('min_nights', 128);
      tbl.string('location', 128);
    })
    .createTable('users_listings', (tbl) => {
      tbl.increments();
      tbl
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('listingId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('listings')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users_listings')
    .dropTableIfExists('listings')
    .dropTableIfExists('users');
};
