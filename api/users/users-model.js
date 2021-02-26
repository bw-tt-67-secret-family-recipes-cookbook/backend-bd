const db = require("../../data/db-config");

module.exports = {
    create,
    getRecipes,
    getByUsername,
    updateRecipe,
    removeRecipe,
    findBy,
    makeRecipe
  };

async function create(data) {
    const a = await db("users").insert(data);
    return { data: a, Message: `User ${a.username} created!` };
}

function getRecipes(id) {
    return db("recipes").where("user_id", id);
}

function getByUsername(name) {
    return db("users").where("username", name);
}

async function updateRecipe(id, recipe) {
    await db('recipes').where('recipe_id', id).update(recipe)
    return {data: recipe, message: `Recipe updated!`}
}

function removeRecipe(id) {
    return db('recipes').where('recipe_id', id).del()
}

function findBy(filter) {
    return db('recipes as r').select('r.recipe_id', 'r.title', 'r.category').where(filter)
}

async function makeRecipe(recipe) {
    const a = await db('recipes').insert(recipe)
    return { data: a, message: 'Recipe created!'}
}