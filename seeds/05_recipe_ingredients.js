
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipe_ingredients").del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex("recipe_ingredients").insert({
            recipe_id: 1,
            ingredient_id: 48,
            amount: 2,
            units: "tbs"
        }),
        knex("recipe_ingredients").insert({
            recipe_id: 1,
            ingredient_id: 67,
            amount: 0.5,
            units: "lbs"
        }),
        knex("recipe_ingredients").insert({
            recipe_id: 1,
            ingredient_id: 98,
            amount: 4,
            units: "tbs"
        })
      ]);
    });
};
