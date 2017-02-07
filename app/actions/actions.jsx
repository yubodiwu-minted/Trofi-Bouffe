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

export var addRecipeIngredient = (ingredient) => {
    return {
        type: "ADD_RECIPE_INGREDIENT",
        payload: ingredient
    };
};

export var clearRecipeIngredients = () => {
    return {
        type: "CLEAR_RECIPE_INGREDIENTS"
    };
};

export var getCurrentRecipe = (recipe) => {
    return {
        type: "GET_CURRENT_RECIPE",
        payload: recipe
    };
};

export var clearCurrentRecipe = () => {
    return {
        type: "CLEAR_CURRENT_RECIPE"
    };
};

export var clearCurrentRecipeName = () => {
    return {
        type: "CLEAR_RECIPE_NAME"
    };
};

export var clearCurrentRecipeServings = () => {
    return {
        type: "CLEAR_RECIPE_SERVINGS"
    };
};

export var clearCurrentRecipeImage = () => {
    return {
        type: "CLEAR_RECIPE_IMAGE"
    };
};

export var getRecipeDirections = (directions) => {
    return {
        type: "GET_RECIPE_DIRECTIONS",
        payload: directions
    };
};

export var addRecipeDirection = (direction) => {
    return {
        type: "ADD_RECIPE_DIRECTION",
        payload: direction
    };
};

export var clearRecipeDirections = () => {
    return {
        type: "CLEAR_RECIPE_DIRECTIONS"
    };
}

export var needNutritionFacts = (ingredientsNeedNF) => {
    return {
        type: "INGREDIENTS_NEED_NUTRITION_FACTS",
        payload: ingredientsNeedNF
    };
};

export var editCurrentRecipe = (recipeChange) => {
    return {
        type: "EDIT_CURRENT_RECIPE",
        payload: recipeChange
    };
};
