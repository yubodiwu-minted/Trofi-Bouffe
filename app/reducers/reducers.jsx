var loginReducer = (state = false, action) => {
    Object.freeze(state);

    switch (action.type) {
        case "LOG_IN":
            return action.payload;
        default:
            return state;
    }
};

var recipesListReducer = (state = [], action) => {
    Object.freeze(state);
    
    switch (action.type) {
        case "GET_RECIPES_LIST":
            return action.payload;
        default:
            return state;
    }
};

module.exports = {
    loginReducer,
    recipesListReducer
};
