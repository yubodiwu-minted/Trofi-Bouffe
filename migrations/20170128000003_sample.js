exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable("users", (table) => {
            table.increments("id").primary();
            table.string("first_name").defaultTo("");
            table.string("last_name").defaultTo("");
            table.string("email").notNullable().unique();
            table.string("username").notNullable().unique();
            table.specificType("hashed_password", "char(60)").notNullable();
            table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        }),
        knex.schema.createTable("recipes", (table) => {
            table.increments("id").primary();
            table.integer("user_id").notNullable().references("id").inTable("users").onDelete("cascade");
            table.string("name").notNullable();
            table.string("img");
            table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        }),
        knex.schema.createTable("ingredients", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.integer("calories").notNullable();
            table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        }),
        knex.schema.createTable("recipe_ingredients", (table) => {
            table.integer("recipe_id").notNullable().references("id").inTable("recipes").onDelete("cascade");
            table.integer("ingredient_id").notNullable().references("id").inTable("ingredients").onDelete("cascade");
            table.integer("amount").notNullable().defaultTo(0);
            table.string("units").notNullable().defaultTo("g");
            table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("recipe_ingredients"),
        knex.schema.dropTable("ingredients"),
        knex.schema.dropTable("recipes"),
        knex.schema.dropTable("users")
    ])
};
