export var logIn = () => {
    return {
        type: "LOG_IN"
    };
};

export var logOut = () => {
    return {
        type: "LOG_OUT"
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

export var addRecipeIngredient = (ingredient) => {
    return {
        type: "ADD_RECIPE_INGREDIENT",
        payload: ingredient
    };
};

export var deleteRecipeIngredient = () => {
    return {
        type: "DELETE_RECIPE_INGREDIENT"
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

export var editRecipeClicked = () => {
    return {
        type: "EDIT_RECIPE_BUTTON_CLICKED"
    };
};

export var editCurrentRecipe = (recipeChange) => {
    return {
        type: "EDIT_CURRENT_RECIPE",
        payload: recipeChange
    };
};

export var clearCurrentRecipe = () => {
    return {
        type: "CLEAR_CURRENT_RECIPE"
    };
};

export var submitCurrentRecipeName = () => {
    return {
        type: "SUBMIT_RECIPE_NAME"
    };
}

export var clearCurrentRecipeName = () => {
    return {
        type: "CLEAR_RECIPE_NAME"
    };
};

export var submitCurrentRecipeServings = () => {
    return {
        type: "SUBMIT_RECIPE_SERVINGS"
    };
};

export var clearCurrentRecipeServings = () => {
    return {
        type: "CLEAR_RECIPE_SERVINGS"
    };
};

export var submitCurrentRecipeImage = () => {
    return {
        type: "SUBMIT_RECIPE_IMAGE"
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

export var deleteRecipeDirection = () => {
    return {
        type: "DELETE_RECIPE_DIRECTION"
    };
};

export var clearRecipeDirections = () => {
    return {
        type: "CLEAR_RECIPE_DIRECTIONS"
    };
};

export var needNutritionFacts = (ingredientsNeedNF) => {
    return {
        type: "INGREDIENTS_NEED_NUTRITION_FACTS",
        payload: ingredientsNeedNF
    };
};

export var setCurrentRecipeNutritionFacts = (nutritionFacts) => {
    return {
        type: "SET_RECIPE_NUTRITION_FACTS",
        payload: nutritionFacts
    };
};

export var setNfPieChartData = (nutritionFacts) => {
    return {
        type: "SET_NF_PIE_CHART_DATA",
        payload: nutritionFacts
    };
};

export var setCurrentIngredientField = (ingredientField) => {
    return {
        type: "SET_CURRENT_INGREDIENT",
        payload: ingredientField
    };
};
