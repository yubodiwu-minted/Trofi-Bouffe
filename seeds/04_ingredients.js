exports.seed = function(knex, Promise) {
    return knex("ingredients").then(function() {
        return knex("ingredients").insert([
            {
                id: 98,
                upc: "782645787019",
                plu: null,
                product_name: "Kirkland Organic Extra Virgin Olive Oil 3.6 fl oz.",
                name: "extra-virgin olive oil"
            }, {
                id: 99,
                upc: "096619261000",
                plu: null,
                product_name: "Kirkland Signature 6.3 Oz Tellicherry Black Pepper Grinder",
                name: "black pepper"
            }, {
                id: 100,
                upc: "013600020019",
                plu: null,
                product_name: "Diamond Crystal Kosher Salt",
                name: "kosher salt"
            }, {
                id: 101,
                upc: "234779811561",
                plu: null,
                product_name: "Kirkland Signature Costco Pecorino R Romano",
                name: "pecorino romano cheese"
            }
        ]);
    }).then(() => {
        return knex.raw("SELECT setval('ingredients_id_seq', (SELECT MAX(id) FROM ingredients));");
    });
};
