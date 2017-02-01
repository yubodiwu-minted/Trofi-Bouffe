
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("ingredients").del()
    .then(function () {
      return knex("recipe_ingredients").insert([
          {
              id: 98,
              upc: "782645787019",
              plu: null,
              product_name: "Kirkland Organice Extra Virgin Olive Oil 3.6 fl oz.",
              name: "extra-virgin olive oil"
          }
      ]);
    });
};
