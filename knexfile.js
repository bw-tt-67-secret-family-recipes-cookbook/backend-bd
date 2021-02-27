// Update with your config settings.
const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);
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
        client: "postgresql",
        connection: {url: process.env.DATABASE_URL},
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
