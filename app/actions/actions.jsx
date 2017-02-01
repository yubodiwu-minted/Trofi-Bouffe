export var login = (user_id) => {
    return {
        type: "LOG_IN",
        payload: user_id
    };
}

export var getRecipesList = (recipesList) => {
    return {
        type: "GET_RECIPES_LIST",
        payload: recipesList
    };
};
