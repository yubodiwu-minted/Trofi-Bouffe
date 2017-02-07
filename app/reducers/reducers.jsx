var recipesReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_RECIPES_LIST":
            return action.payload;
        default:
            return state;
    }
};

var currentRecipeReducer = (state = {}, action) => {
    Object.freeze(state);
    console.log(action);

    switch (action.type) {
        case "GET_CURRENT_RECIPE":
            return action.payload;
        case "EDIT_CURRENT_RECIPE":
            var newState = JSON.parse(JSON.stringify(state));
            newState[action.payload.field] = action.payload.value;

            return newState;
        case "CLEAR_CURRENT_RECIPE":
            return {};
        default:
            return state;
    }
};

var ingredientsListReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_RECIPE_INGREDIENTS":
            return action.payload;
        case "ADD_RECIPE_INGREDIENT":
            var newState = JSON.parse(JSON.stringify(state));
            newState.push(action.payload);

            return newState;
        case "CLEAR_RECIPE_INGREDIENTS":
            return [];
        default:
            return state;
    }
};

var directionsReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_RECIPE_DIRECTIONS":
            return action.payload;
        case "CLEAR_RECIPE_DIRECTIONS":
            return [];
        default:
            return state;
    }
};

var needNFReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "INGREDIENTS_NEED_NUTRITION_FACTS":
            return action.payload;
        default:
            return state;
    }
};

module.exports = {
    recipesReducer,
    ingredientsListReducer,
    currentRecipeReducer,
    directionsReducer,
    needNFReducer
};
