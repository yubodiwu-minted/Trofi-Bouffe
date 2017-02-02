exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("recipe_ingredients").del().then(function() {
        // return Promise.all([
        //     knex("recipe_ingredients").insert({
        //         recipe_id: 1,
        //         ingredient_id: 48,
        //         quantity: 2,
        //         units: "tbs"
        //     })
        // ])
        return knex("recipe_ingredients").insert([
            {
                recipe_id: 1,
                ingredient_id: 48,
                quantity: 2,
                units: "tbs"
            }, {
                recipe_id: 1,
                ingredient_id: 67,
                quantity: 0.5,
                units: "lbs"
            }, {
                recipe_id: 1,
                ingredient_id: 98,
                quantity: 4,
                units: "tbs"
            }, {
                recipe_id: 1,
                ingredient_id: 99,
                quantity: 1,
                units: "tsp"
            }, {
                recipe_id: 1,
                ingredient_id: 100,
                quantity: null,
                units: "a pinch"
            }, {
                recipe_id: 1,
                ingredient_id: 101,
                quantity: 2,
                units: "oz"
            }
        ]);
    });
};
