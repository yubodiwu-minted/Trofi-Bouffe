const express = require("express");
const router = express.Router();
const knex = require("../knex");
const JWT = require("jsonwebtoken");

const {
    isWeightUnit,
    isVolumeUnit,
    filterForWeightOrVolumeRequirement,
    combineNutritionFacts,
    convertUnitsFromTo
} = require("../helpers.js");
const APP_SECRET = "SUPERSECRETAPPSECRET";

router.get("/:recipeId", (req, res) => {
    console.log(`get un-set nutrition facts for recipe ${req.params.recipeId} route hit`);

    knex.raw(`select i.id, i.name, ri.units, ri."hasVolume" as needsVolume, ri."hasWeight" as needsWeight, nf."hasWeight", nf."hasVolume" from recipe_ingredients as ri
    join recipes as r on r.id = ri.recipe_id
    join ingredients as i on i.id = ri.ingredient_id
    left outer join nutrition_facts_ingredients as nf on nf.ingredient_id = i.id
    where ri.units is not null and r.id = ${req.params.recipeId};`).then((data) => {
            console.log(data);
            var parsedData = data.rows.filter((row) => {
                if (row.needsvolume && !row.hasVolume) {
                    return true;
                } else if (row.needsweight && !row.hasWeight) {
                    return true;
                }
            })

            res.json(parsedData);
        }).catch((err) => {
            res.end(err)
        });

    console.log('line after database query is being called');
});

router.get("/recipe/:recipeId", function(req, res) {
    console.log(`get nutrition facts for recipe ${req.params.recipeId} route hit`);

    knex("nutrition_facts_recipes").where("recipe_id", req.params.recipeId)
        .then((data) => {
            console.log("nutrition facts data is ", data);

            res.json(data[0]);
        }).catch((err) => {
            res.end(err);
        })
});

router.get("/recipe-ingredients/:recipeId/:nfField", function(req, res) {
    console.log(`get ${req.params.nfField} pie chart info for recipe ${req.params.recipeId} route hit`);

    knex.raw(`select i.name, nf.${req.params.nfField}, nf.serving_quantity, nf.serving_unit, nf.serving_weight_grams, nf."hasWeight", nf."hasVolume", ri.quantity, ri.units, ri."hasWeight", ri."hasVolume" from nutrition_facts_ingredients as nf
    join ingredients as i on nf.ingredient_id = i.id
    join recipe_ingredients as ri on ri.ingredient_id = i.id
    where ri.recipe_id = ${req.params.recipeId} and ((nf."hasWeight" = true and ri."hasWeight" = true) or (nf."hasVolume" = true and ri."hasVolume" = true));`).then((data) => {
        var nfData = data.rows.map((ingredient) => {
            console.log(ingredient);
            if (ingredient.hasWeight && !isWeightUnit(ingredient.serving_unit)) {
                var multiplier = ingredient.quantity / ingredient.serving_weight_grams * convertUnitsFromTo(ingredient.units, "g");
            } else {
                console.log("also happens");
                var multiplier = ingredient.quantity / ingredient.serving_quantity * convertUnitsFromTo(ingredient.units, ingredient.serving_unit);
            }
            console.log(multiplier);

            ingredient.field = ingredient[req.params.nfField] * multiplier;

            return ingredient;
        });

        res.json(nfData)
    }).catch((err) => {
        res.end(err);
    });
});

router.post("/", (req, res) => {
    console.log("nutrition facts post route hit");
    var ingredientToDbPromises = [];

    var user = JWT.verify(req.query.jwt, APP_SECRET);
    if (!user) res.end("verify failed");
    if (!user) throw new Error("failed verification");

    for (let ingredient of req.body) {
        let ingredientId = ingredient.ingredient_id;
        let nutritionFacts = ingredient.nutrition_facts;

        ingredientToDbPromises.push(
            knex("nutrition_facts_ingredients").select("item_id")
                .where("ingredient_id", ingredientId).then((data) => {
                    var hasWeight = isWeightUnit(nutritionFacts.nf_serving_size_unit) || !!nutritionFacts.nf_serving_weight_grams;
                    console.log(hasWeight);
                    if (!data[0] || data[0].item_id !== nutritionFacts.item_id) {
                        return knex("nutrition_facts_ingredients").insert({
                            ingredient_id: ingredientId,
                            item_id: nutritionFacts.item_id,
                            hasVolume: isVolumeUnit(nutritionFacts.nf_serving_size_unit),
                            hasWeight: hasWeight,
                            serving_quantity: nutritionFacts.nf_serving_size_qty,
                            serving_unit: nutritionFacts.nf_serving_size_unit,
                            serving_weight_grams: nutritionFacts.nf_serving_weight_grams,
                            calories: nutritionFacts.nf_calories,
                            calories_from_fat: nutritionFacts.nf_calories_from_fat,
                            total_fat: nutritionFacts.nf_total_fat,
                            saturated_fat: nutritionFacts.nf_saturated_fat,
                            monounsaturated_fat: nutritionFacts.nf_monounsaturated_fat,
                            polyunsaturated_fat: nutritionFacts.nf_polyunsaturated_fat,
                            trans_fatty_acid: nutritionFacts.nf_trans_fatty_acid,
                            cholesterol: nutritionFacts.nf_cholesterol,
                            sodium: nutritionFacts.nf_sodium,
                            total_carbohydrate: nutritionFacts.nf_total_carbohydrate,
                            dietary_fiber: nutritionFacts.nf_dietary_fiber,
                            sugars: nutritionFacts.nf_sugars,
                            protein: nutritionFacts.nf_protein,
                            vitamin_a_dv: nutritionFacts.nf_vitamin_a_dv,
                            vitamin_c_dv: nutritionFacts.nf_vitamin_c_dv,
                            calcium_dv: nutritionFacts.calcium_dv,
                            iron: nutritionFacts.nf_iron_dv
                        })
                    }
            }));
    }

    Promise.all(ingredientToDbPromises).then(() => {
        var recipeId = req.query.recipeId;

        return knex("recipes").select("ingredients.id", "ingredients.name", "recipe_ingredients.quantity as recipeQuantity", "recipe_ingredients.units as recipeUnits", "recipe_ingredients.hasWeight as needsWeight", "recipe_ingredients.hasVolume as needsVolume", "nutrition_facts_ingredients.*")
            .join("recipe_ingredients", "recipes.id", "recipe_ingredients.recipe_id").join("ingredients", "ingredients.id", "recipe_ingredients.ingredient_id")
            .join("nutrition_facts_ingredients", "nutrition_facts_ingredients.ingredient_id", "ingredients.id").where("recipes.id", req.query.recipeId)
            .then((data) => {
                var dataForConversion = filterForWeightOrVolumeRequirement(data);
                return combineNutritionFacts(dataForConversion);
            });
    }).then((cumulativeNutritionFacts) => {
        console.log("cumulative nutrition facts are ", cumulativeNutritionFacts);
        knex("recipes").where("recipes.id", "=", req.query.recipeId)
            .update({
                calories: Math.round(cumulativeNutritionFacts.calories)
            }).then(() => {
                console.log("recipe updated with calories");
            });

        knex("nutrition_facts_recipes").insert({
            recipe_id: req.query.recipeId,
            calories: cumulativeNutritionFacts.calories,
            calories_from_fat: cumulativeNutritionFacts.calories_from_fat,
            total_fat: cumulativeNutritionFacts.total_fat,
            saturated_fat: cumulativeNutritionFacts.saturated_fat,
            monounsaturated_fat: cumulativeNutritionFacts.monounsaturated_fat,
            polyunsaturated_fat: cumulativeNutritionFacts.polyunsaturated_fat,
            trans_fatty_acid: cumulativeNutritionFacts.trans_fatty_acid,
            cholesterol: cumulativeNutritionFacts.cholesterol,
            sodium: cumulativeNutritionFacts.sodium,
            total_carbohydrate: cumulativeNutritionFacts.total_carbohydrate,
            dietary_fiber: cumulativeNutritionFacts.dietary_fiber,
            sugars: cumulativeNutritionFacts.sugars,
            protein: cumulativeNutritionFacts.protein,
            vitamin_a_dv: cumulativeNutritionFacts.vitamin_a_dv,
            vitamin_c_dv: cumulativeNutritionFacts.vitamin_c_dv,
            calcium_dv: cumulativeNutritionFacts.calcium_dv,
            iron: cumulativeNutritionFacts.iron_dv
        }).then(() => {
            console.log("nutrition facts inserted");
            res.json(cumulativeNutritionFacts);
        });
    });
});

module.exports = router;
