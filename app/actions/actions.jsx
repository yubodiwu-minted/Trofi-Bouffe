export var getRecipesList = (recipesList) => {
    return {
        type: "GET_RECIPES_LIST",
        payload: recipesList
    };
};

export var getRecipeIngredients = (ingredientsList) => {
    return {
        type: "GET_RECIPE_INGREDIENTS",
        payload: ingredientsList
    };
};

export var getCurrentRecipe = (recipe) => {
    return {
        type: "GET_CURRENT_RECIPE",
        payload: recipe
    };
};

export var getRecipeDirections = (directions) => {
    return {
        type: "GET_RECIPE_DIRECTIONS",
        payload: directions
    };
};

export var needNutritionFacts = (ingredientsNeedNF) => {
    return {
        type: "INGREDIENTS_NEED_NUTRITION_FACTS",
        payload: ingredientsNeedNF
    };
};

export var editCurrentRecipe = (recipeChange) => {
    console.log("edit recipe function hit");
    return {
        type: "EDIT_CURRENT_RECIPE",
        payload: recipeChange
    };
};
