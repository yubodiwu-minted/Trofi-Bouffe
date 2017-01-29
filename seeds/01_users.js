exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("users").del().then(function() {
        return Promise.all([
            // Inserts seed entries
            knex("users").insert({
                id: 1,
                first_name: "Tyler",
                last_name: "Bettilyon",
                email: "teb311@gmail.com",
                username: "teb311",
                hashed_password: "needtohash"
            }),
            knex("users").insert({
                id: 2,
                first_name: "Parker",
                last_name: "Lewis",
                email: "parker@gmail.com",
                username: "parker",
                hashed_password: "needtohash"
            }),
            knex("users").insert({
                id: 3,
                first_name: "Robert",
                last_name: "Murray",
                email: "robertmurray@gmail.com",
                username: "robertmurray",
                hashed_password: "needtohash"
            }),
            knex("users").insert({
                id: 4,
                first_name: "Hamid",
                last_name: "Aghdaee",
                email: "hamid.aghdaee@gmail.com",
                username: "hamid.aghdaee",
                hashed_password: "needtohash"
            })
        ]);
    }).then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
    });
};
