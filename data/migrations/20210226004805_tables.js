
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
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
                .inTable('users')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })

        .createTable('recipe_pairs', table => {
            table.increments('recipe_pair_id')
            table
                .integer('user_id')
                .unsigned()
                .references('user_id')
                .inTable('users')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            table
                .integer('recipe_id')
                .unsigned()
                .references('recipe_id')
                .inTable('recipes')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })
    
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('recipe_pairs')
        .dropTableIfExists('recipes')
};
