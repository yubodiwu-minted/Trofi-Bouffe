exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("recipe_ingredients").del().then(function() {
        return knex("recipe_ingredients").insert([
            {
                recipe_id: 1,
                ingredient_id: 48,
                quantity: 2,
                units: "tbs",
                hasWeight: false,
                hasVolume: true
            }, {
                recipe_id: 1,
                ingredient_id: 67,
                quantity: 0.5,
                units: "lbs",
                hasWeight: true,
                hasVolume: false
            }, {
                recipe_id: 1,
                ingredient_id: 98,
                quantity: 4,
                units: "tbs",
                hasWeight: false,
                hasVolume: true
            }, {
                recipe_id: 1,
                ingredient_id: 99,
                quantity: 1,
                units: "tsp",
                hasWeight: false,
                hasVolume: true
            }, {
                recipe_id: 1,
                ingredient_id: 100,
                quantity: null,
                units: null,
                hasWeight: false,
                hasVolume: false
            }, {
                recipe_id: 1,
                ingredient_id: 101,
                quantity: 2,
                units: "oz",
                hasWeight: true,
                hasVolume: false
            }
        ]);
    });
};
