exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('features')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('features').insert([
        {
          host_about_len:
            'My wife and I own this house and rent out the guest rooms on weekends',
          description_len: 'A quiet house in north seattle',
          property_type: 'House',
          neighbourhood: 'Silver Lake',
          city: 'Everett',
          state: 'WA',
          zipcode: '98208',
          bathrooms: 1.75,
          bedrooms: 3,
          beds: 6,
          accommodates: 6,
          guests_included: 2,
          square_feet: '1200',
          cancellation_policy: 'moderate',
          instant_bookable: 't',
          is_business_travel_ready: 'f',
          review_scores_rating: 90,
          number_of_reviews: 4,
          transit_len:
            'There is a bus stop at the end of the street!',
          amenities: 'Internet, Wifi, Kitchen, Laundry',
        },
      ]);
    });
};
