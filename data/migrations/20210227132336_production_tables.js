
exports.up = function(knex) {
    return knex.schema
        .createTable('site_users', table => {
            table.increments('user_id')
            table.string('username').unique().notNullable()
            table.string('password').notNullable()
        })
        
        .createTable('recipes', table => {
            table.increments('recipe_id')
            table.string('title', 30).unique().notNullable()
            table.string('source', 20).notNullable()
            table.string('ingredients', 100).notNullable()
            table.string('instructions', 200).notNullable()
            table.string('category').notNullable()
            table
                .integer('user_id')
                .unsigned()
                .references('user_id')
                .inTable('site_users')
                .notNullable()
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('recipe_pairs')
        .dropTableIfExists('recipes')
        .dropTableIfExists('site_users')
};
