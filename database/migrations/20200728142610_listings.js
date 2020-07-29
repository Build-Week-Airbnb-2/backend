exports.up = function (knex) {
  return knex.schema
    .createTable('features', (tbl) => {
      tbl.increments();
      tbl.string('host_about_len', 256).notNullable();
      tbl.string('description_len', 256).notNullable();
      tbl.string('property_type', 256).notNullable();
      tbl.string('neighbourhood', 128).notNullable();
      tbl.string('city', 128).notNullable();
      tbl.string('state', 128).notNullable();
      tbl.string('zipcode', 128).notNullable();
      tbl.integer('bathrooms').notNullable().unsigned();
      tbl.integer('bedrooms').notNullable().unsigned();
      tbl.integer('beds').notNullable().unsigned();
      tbl.integer('accommodates').notNullable().unsigned();
      tbl.integer('guests_included').notNullable().unsigned();
      tbl.string('square_feet', 128).notNullable();
      tbl.string('cancellation_policy', 128).notNullable();
      tbl.string('instant_bookable', 128).notNullable();
      tbl.string('is_business_travel_ready', 128).notNullable();
      tbl.integer('review_scores_rating').notNullable().unsigned();
      tbl.integer('number_of_reviews').notNullable().unsigned();
      tbl.string('transit_len', 256).notNullable();
      tbl.string('name', 128);
    })
    .createTable('users_features', (tbl) => {
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
        .integer('featureId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('features')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users_features')
    .dropTableIfExists('features');
};
