exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("recipe_directions").del().then(function() {
        return knex("recipe_directions").insert([
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
            }, {
                recipe_id: 4,
                step_number: 1,
                step_content: "Melt the butter and mix the butter with the sugar/brown sugar/molasses."
            }, {
                recipe_id: 4,
                step_number: 2,
                step_content: "Mix the egg with the sugar and butter mixture."
            }, {
                recipe_id: 4,
                step_number: 3,
                step_content: "Mix the salt and baking soda with the mixture."
            }, {
                recipe_id: 4,
                step_number: 4,
                step_content: "Mix the flour into the mixture."
            }, {
                recipe_id: 4,
                step_number: 5,
                step_content: "Mix the chocolate chips into the dough (I find Trader Joe's chocolate chips work best, or Scharffen Berger but those are really expensive)."
            }, {
                recipe_id: 4,
                step_number: 6,
                step_content: "Split the dough in half, split each of those halves in half, split each of those halves in half...do that until you've split the dough 5 times (there should be 32 cookies)."
            }, {
                recipe_id: 4,
                step_number: 7,
                step_content: "Bake them at 365 for 13 minutes."
            }
        ]);
    });
};
