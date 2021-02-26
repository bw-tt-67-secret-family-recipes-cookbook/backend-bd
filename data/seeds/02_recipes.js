
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {title: 'Cheeseburger', source: 'Bryan Diaz', ingredients: 'patty, cheddar cheese, pretzel buns', instructions: 'Fry patty while seasoning on a skillet, and then enjoy', category: 'lunch'}
      ]);
    });
};
