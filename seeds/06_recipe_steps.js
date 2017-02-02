exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("recipe_steps").del().then(function() {
        return knex("recipe_steps").insert([
            {
                recipe_id: 1,
                step_number: 1,
                step_content: "Heat 3 tablespoons olive oil and about a teaspoon of black pepper in a medium skillet over medium-low heat until ingredients are fragrant and pepper is barely starting to sizzle, about 1 minute. Set aside."
            }, {
                recipe_id: 1,
                step_number: 2,
                step_content: "Place spaghetti in a large skillet and cover with water. Season with a small pinch of salt, then bring to a boil over high heat, prodding spaghetti occasionally with a fork or wooden spoon to prevent it from clumping. Cook until spaghetti is al dente (typically about 1 minute less than the package recommends). Transfer 2 to 3 tablespoons of pasta cooking water to the skillet with the olive oil/pepper mixture. Stir in butter. Using tongs, lift spaghetti and transfer it to the oil/butter mixture."
            }, {
                recipe_id: 1,
                step_number: 3,
                step_content: "Add cheese and remaining tablespoon olive oil to the skillet and stir with a fork until cheese is completely melted. Add a few more tablespoons of pasta water to the skillet to adjust consistency, reheating as necessary until the sauce is creamy and coats each strand of spaghetti. Season to taste with salt and more black pepper. Serve immediately, passing extra grated cheese and black pepper at the table."
            }
        ]);
    });
};
