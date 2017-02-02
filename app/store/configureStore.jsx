import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from "redux";
import {
    loginReducer,
    recipesReducer,
    ingredientsListReducer,
    currentRecipeReducer,
    directionsReducer
} from "reducers";
import promise from "redux-promise";

export var configure = (initialState = {loggedIn: null}) => {
    var reducers = combineReducers({
        loggedIn: loginReducer,
        recipesList: recipesReducer,
        ingredientsList: ingredientsListReducer,
        currentRecipe: currentRecipeReducer,
        directions: directionsReducer
    });

    var store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    var createStoreWithMiddleware = applyMiddleware(promise)(createStore);

    return createStoreWithMiddleware(reducers);
}
