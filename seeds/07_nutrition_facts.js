exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("nutrition_facts").del().then(function() {
        return knex("nutrition_facts").insert([
            {
                ingredient_id: 101,
                serving_quantity: 1,
                serving_unit: "oz",
                hasVolume: false,
                hasWeight: true,
                calories: 110,
                calories_from_fat: 69,
                total_fat: 7.6,
                saturated_fat: 4.9,
                trans_fatty_acid: 0,
                cholesterol: 29.5,
                sodium: 406.3,
                total_carbohydrate: 1,
                dietary_fiber: 0,
                sugars: 0.2,
                protein: 9,
                vitamin_a_dv: 2.4,
                vitamin_c_dv: 0,
                calcium_dv: 30.2,
                iron: 1.2
            }, {
                ingredient_id: 99,
                serving_quantity: 0.25,
                serving_unit: "tsp",
                hasVolume: true,
                hasWeight: false,
                calories: 0,
                calories_from_fat: 0,
                total_fat: 0,
                trans_fatty_acid: 0,
                sodium: 30,
                total_carbohydrate: 0,
                protein: 0,
                vitamin_a_dv: 0,
                vitamin_c_dv: 0,
                calcium_dv: 0,
                iron: 0
            }, {
                ingredient_id: 98,
                serving_quantity: 1,
                serving_unit: "tbsp",
                hasVolume: true,
                hasWeight: false,
                calories: 130,
                calories_from_fat: 130,
                total_fat: 14,
                saturated_fat: 2,
                trans_fatty_acid: 0,
                total_carbohydrate: 0,
                protein: 0
            }
        ]);
    });
};
