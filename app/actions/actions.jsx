export var login = (user_id) => {
    return {
        type: "LOG_IN",
        payload: user_id
    };
};

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

export var getRecipeDirections = (stepsList) => {
    return {
        type: "GET_RECIPE_DIRECTIONS",
        payload: stepsList
    };
};
