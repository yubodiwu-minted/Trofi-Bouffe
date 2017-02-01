exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("recipe_ingredients").del().then(function() {
        return knex("recipe_ingredients").insert([
            {
                recipe_id: 1,
                ingredient_id: 48,
                amount: 2,
                units: "tbs"
            }, {
                recipe_id: 1,
                ingredient_id: 67,
                amount: 0.5,
                units: "lbs"
            }, {
                recipe_id: 1,
                ingredient_id: 98,
                amount: 4,
                units: "tbs"
            }, {
                recipe_id: 1,
                ingredient_id: 99,
                amount: 1,
                units: "tsp"
            }, {
                recipe_id: 1,
                ingredient_id: 100,
                amount: null,
                units: null
            }, {
                recipe_id: 1,
                ingredient_id: 101,
                amount: 2,
                units: "oz"
            }
        ]);
    });
};
