exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("recipes").del().then(function() {
        return Promise.all([// Inserts seed entries
            knex("recipes").insert({
                // id: 1,
                user_id: 5,
                name: "Cacio e Pepe",
                img: "http://www.seriouseats.com/recipes/assets_c/2016/02/20160220-cacio-e-pepe-21-thumb-1500xauto-430008.jpg"
            }),
            knex("recipes").insert({
                // id: 2,
                user_id: 5,
                name: "Tamago Kake Gohan",
                img: "http://www.seriouseats.com/images/2016/04/20140416-tamago-kake-gohan-recipe-14.jpg"
            }),
            knex("recipes").insert({
                // id: 3,
                user_id: 5,
                name: "No-knead Bread",
                img: "http://www.seriouseats.com/recipes/assets_c/2011/06/20110617-no-knead-bread-primary-thumb-625xauto-167152.jpg"
            }),
            knex("recipes").insert({
                // id: 4,
                user_id: 5,
                name: "Chocolate Chip Cookies",
                img: "http://www.seriouseats.com/recipes/assets_c/2015/12/20131213-chocolate-chip-cookies-food-lab-55-edit-thumb-1500xauto-428695.jpg"
            }),
            knex("recipes").insert({
                // id: 5,
                user_id: 5,
                name: "Sous Vide Brisket",
                img: "http://www.seriouseats.com/images/2016/07/20160801-sous-vide-brisket-guide-35.jpg"

            }),
            knex("recipes").insert({
                // id: 6,
                user_id: 5,
                name: "Sicilian Pizza",
                img: "http://www.seriouseats.com/recipes/assets_c/2016/05/20160503-spicy-spring-pizza-recipe-37-thumb-1500xauto-431711.jpg"
            }),
            knex("recipes").insert({
                // id: 7,
                user_id: 5,
                name: "Cherry Tomato Pasta",
                img: "http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg"
            })
        ]);
    }).then(() => {
        return knex.raw("SELECT setval('recipes_id_seq', (SELECT MAX(id) FROM recipes));");
    });
};
