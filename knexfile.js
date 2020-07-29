// Update with your config settings.
const pgConnection =
  process.env.DATABASE_URL ||
  'postgres://vbndoljrgamyks:0c713b054669c52ddbcd01a85fee63d63be4e7ecce37491cf2ebce601d3b6c1c@ec2-34-200-15-192.compute-1.amazonaws.com:5432/d2mjkpv45h7q9o';

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/airbnb.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  // production: {
  //   client: 'sqlite3',
  //   useNullAsDefault: true,
  //   connection: {
  //     filename: './database/airbnb.db3',
  //   },
  //   pool: {
  //     afterCreate: (conn, done) => {
  //       conn.run('PRAGMA foreign_keys = ON', done);
  //     },
  //   },
  //   migrations: {
  //     directory: './database/migrations',
  //   },
  //   seeds: {
  //     directory: './database/seeds',
  //   },
  // },

  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
