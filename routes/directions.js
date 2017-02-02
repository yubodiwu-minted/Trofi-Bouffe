const express = require("express");
const router = express.Router();
const knex = require("../knex");

router.get("/:recipeId", function(req, res) {
    console.log("get recipe directions by id hit");

    knex("recipe_directions").select("step_number", "step_content")
        .where("recipe_id", req.params.recipeId).then((data) => {
            res.json(data);
        }).catch((err) => {
            console.error(err);
            res.end(err);
        });
});

module.exports = router;
