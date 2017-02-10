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

    switch (action.type) {
        case "GET_CURRENT_RECIPE":
            return action.payload;
        case "EDIT_RECIPE_BUTTON_CLICKED":
            var newState = JSON.parse(JSON.stringify(state));
            newState.nameSubmitted = true;
            newState.servingsSubmitted = true;
            newState.imgSubmitted = true;

            return newState;
        case "EDIT_CURRENT_RECIPE":
            var newState = JSON.parse(JSON.stringify(state));
            newState[action.payload.field] = action.payload.value;

            return newState;
        case "SUBMIT_RECIPE_NAME":
            var newState = JSON.parse(JSON.stringify(state));
            newState.nameSubmitted = true;

            return newState;
        case "CLEAR_RECIPE_NAME":
            var newState = JSON.parse(JSON.stringify(state));
            newState.name = null;
            newState.nameSubmitted = false;

            return newState;
        case "SUBMIT_RECIPE_SERVINGS":
            var newState = JSON.parse(JSON.stringify(state));
            newState.servingsSubmitted = true;

            return newState;
        case "CLEAR_RECIPE_SERVINGS":
            var newState = JSON.parse(JSON.stringify(state));
            newState.servings = null;
            newState.servingsSubmitted = false;

            return newState;
        case "SUBMIT_RECIPE_IMAGE":
            console.log("recipe image submitted");
            var newState = JSON.parse(JSON.stringify(state));
            newState.imgSubmitted = true;

            return newState;
        case "CLEAR_RECIPE_IMAGE":
            var newState = JSON.parse(JSON.stringify(state));
            newState.img = null;
            newState.imgSubmitted = false;

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
        case "DELETE_RECIPE_INGREDIENT":
            return state.slice(0, -1);
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
        case "ADD_RECIPE_DIRECTION":
            var newState = JSON.parse(JSON.stringify(state));
            newState.push(action.payload);

            return newState;
        case "DELETE_RECIPE_DIRECTION":
            return state.slice(0, -1);
        case "CLEAR_RECIPE_DIRECTIONS":
            return [];
        default:
            return state;
    }
};

var needNfReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "INGREDIENTS_NEED_NUTRITION_FACTS":
            return action.payload;
        default:
            return state;
    }
};

var currentRecipeNfReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case "SET_RECIPE_NUTRITION_FACTS":
            return action.payload;
        default:
            return state;
    }
};

var currentIngredientReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case "SET_NF_PIE_CHART_DATA":
            var newState = JSON.parse(JSON.stringify(state));
            newState.pieChartData = action.payload;

            return newState;
        case "SET_CURRENT_INGREDIENT":
            var newState = JSON.parse(JSON.stringify(state));
            newState.field = action.payload;

            return newState;
        default:
            return state;

    }
};

module.exports = {
    recipesReducer,
    ingredientsListReducer,
    currentRecipeReducer,
    directionsReducer,
    needNfReducer,
    currentRecipeNfReducer,
    currentIngredientReducer
};
