// Update with your config settings.
// const parse = require('pg-connection-string').parse;
// const pg = require('pg')
require('dotenv').config()

// const config = parse(process.env.DATABASE_URL);

// if (process.env.DATABASE_URL) {
//     pg.defaults.ssl = { rejectUnauthorized: false }
// }

// const sharedConfig = {
//     client: 'pg',
//     migrations: { directory: './api/data/migrations' },
//     seeds: {
//         directory: './api/data/seeds'
//     }
// }

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./data/recipes.db3",
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./data/migrations",
        },
        pool: {
            afterCreate: (conn, done) =>
                conn.run("PRAGMA foreign_keys = ON", done),
        },
        seeds: {
            directory: "./data/seeds",
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },


    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        },
        pool: {
            min: 2,
            max: 10,
        }
    }
};
