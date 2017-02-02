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
            table.integer("calories");
            table.integer("servings");
            table.string("img");
            table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        }),
        knex.schema.createTable("ingredients", (table) => {
            table.increments("id").primary();
            table.string("upc").defaultTo(null);
            table.string("plu").defaultTo(null);
            table.string("product_name").notNullable();
            table.string("name");
            table.integer("calories").defaultTo(null);
            table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        }),
        knex.schema.createTable("recipe_ingredients", (table) => {
            table.integer("recipe_id").notNullable().references("id").inTable("recipes").onDelete("cascade");
            table.integer("ingredient_id").notNullable().references("id").inTable("ingredients").onDelete("cascade");
            table.float("quantity");
            table.string("units");
            table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        }),
        knex.schema.createTable("recipe_directions", (table) => {
            table.integer("recipe_id").notNullable().references("id").inTable("recipes").onDelete("cascade");
            table.integer("step_number").notNullable();
            table.text("step_content").notNullable();
        }),
        knex.schema.createTable("nutrition_facts", (table) => {
            table.integer("ingredient_id").notNullable().references("id").inTable("ingredients").onDelete("cascade");
            table.integer("serving_quantity");
            table.integer("serving_unit");
            table.integer("calories");
            table.integer("calories_from_fat");
            table.integer("total_fat");
            table.integer("saturated_fat");
            table.integer("monounsaturated_fat");
            table.integer("polyunsaturated_fat");
            table.integer("trans_fatty_acid");
            table.integer("cholesterol");
            table.integer("sodium");
            table.integer("total_carbohydrate");
            table.integer("dietary_fiber");
            table.integer("sugars");
            table.integer("protein");
            table.integer("vitamin_a_dv");
            table.integer("vitamin_c_dv");
            table.integer("calcium_dv");
            table.integer("iron");
            table.integer("potassium");
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("nutrition_facts"),
        knex.schema.dropTable("recipe_directions"),
        knex.schema.dropTable("recipe_ingredients"),
        knex.schema.dropTable("ingredients"),
        knex.schema.dropTable("recipes"),
        knex.schema.dropTable("users")
    ])
};
