import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from "redux";
import {
    logInReducer,
    recipesReducer,
    ingredientsListReducer,
    currentRecipeReducer,
    directionsReducer,
    needNfReducer,
    currentRecipeNfReducer,
    currentIngredientReducer
} from "reducers";
import promise from "redux-promise";

export var configure = (initialState = {}) => {
    var reducers = combineReducers({
        loggedIn: logInReducer,
        recipesList: recipesReducer,
        ingredientsList: ingredientsListReducer,
        currentRecipe: currentRecipeReducer,
        directions: directionsReducer,
        needNf: needNfReducer,
        currentRecipeNf: currentRecipeNfReducer,
        currentIngredient: currentIngredientReducer
    });

    var createStoreWithMiddleware = applyMiddleware(promise)(createStore);

    // return createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return createStoreWithMiddleware(reducers);
}
