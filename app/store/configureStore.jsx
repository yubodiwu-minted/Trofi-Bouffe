import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from "redux";
import {
    recipesReducer,
    ingredientsListReducer,
    currentRecipeReducer,
    directionsReducer,
    needNFReducer,
    nfBankReducer
} from "reducers";
import promise from "redux-promise";

export var configure = (initialState = {loggedIn: null}) => {
    console.log(needNFReducer, "nf reducer");
    console.log(nfBankReducer, "nf bank reducer");
    var reducers = combineReducers({
        recipesList: recipesReducer,
        ingredientsList: ingredientsListReducer,
        currentRecipe: currentRecipeReducer,
        directions: directionsReducer,
        needNF: needNFReducer,
        nfBank: nfBankReducer
    });

    var createStoreWithMiddleware = applyMiddleware(promise)(createStore);

    return createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
