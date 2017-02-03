var recipesReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_RECIPES_LIST":
            return action.payload;
        default:
            return state;
    }
};

var currentRecipeReducer = (state = null, action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_CURRENT_RECIPE":
            return action.payload;
        default:
            return state;
    }
};

var ingredientsListReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_RECIPE_INGREDIENTS":
            return action.payload;
        default:
            return state;
    }
};

var directionsReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_RECIPE_DIRECTIONS":
            return action.payload;
        default:
            return state;
    }
}

var needNFReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "INGREDIENTS_NEED_NUTRITION_FACTS":
            return action.payload;
        default:
            return state;
    }
}

module.exports = {
    recipesReducer,
    ingredientsListReducer,
    currentRecipeReducer,
    directionsReducer,
    needNFReducer
};
