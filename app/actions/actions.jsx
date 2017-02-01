export var login = (user_id) => {
    return {
        type: "LOG_IN",
        payload: user_id
    };
}

export var getRecipeList = (recipeList) => {
    return {
        type: "GET_RECIPE_LIST",
        payload: recipeList
    };
};
