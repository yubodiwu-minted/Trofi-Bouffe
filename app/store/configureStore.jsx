import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from "redux";
import promise from "redux-promise";

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export var configure = (initialState = {}) => {
    var reducers = combineReducers({

    });
    
    var createStoreWithMiddleware = applyMiddleware(promise)(createStore);

    return createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
