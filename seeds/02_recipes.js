exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("recipes").del().then(function() {
        return Promise.all([// Inserts seed entries
            knex("recipes").insert({
                id: 1,
                user_id: 5,
                name: "Cacio e Pepe"
            }),
            knex("recipes").insert({
                id: 2,
                user_id: 5,
                name: "Tamago Kake Gohan"
            }),
            knex("recipes").insert({
                id: 3,
                user_id: 5,
                name: "No-knead Bread"
            }),
            knex("recipes").insert({
                id: 4,
                user_id: 5,
                name: "Chocolate Chip Cookies"
            }),
            knex("recipes").insert({
                id: 5,
                user_id: 5,
                name: "Sous Vide Brisket"
            }),
            knex("recipes").insert({
                id: 6,
                user_id: 5,
                name: "Sicilian Pizza"
            }),
            knex("recipes").insert({
                id: 7,
                user_id: 5,
                name: "Cherry Tomato Pasta"
            })
        ]);
    });
};
