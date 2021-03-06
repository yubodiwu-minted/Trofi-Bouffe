import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router, IndexRoute, hashHistory} from "react-router";

import Main from "Main";
import Landing from "Landing";
import RegistrationForm from "RegistrationForm";
import LoginForm from "LoginForm";
import UserRecipesList from "UserRecipesList";
import RecipeView from "RecipeView";
import SetNutritionFacts from "SetNutritionFacts";
import MakeRecipe from "MakeRecipe";
import NutritionFacts from "NutritionFacts";
import NutritionPieChart from "NutritionPieChart";

var actions = require("actions");
var store = require("configureStore").configure();

store.subscribe(() => {
    var state = store.getState();
    console.log("New state:", state);
});

// Load foundation
// require("style!css!foundation-sites/dist/css/foundation.min.css");
$(document).foundation();

// App css
require("style!css!sass!applicationStyles")

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Landing}></IndexRoute>
                <Route path="user/new" component={RegistrationForm}></Route>
                <Route path="login" component={LoginForm}></Route>
                <Route path="user/recipes" component={UserRecipesList}></Route>
                <Route path="recipes/all" component={UserRecipesList}></Route>
                <Route path="recipe/view" component={RecipeView}></Route>
                <Route path="recipe/set_facts" component={SetNutritionFacts}></Route>
                <Route path="recipe/new" component={MakeRecipe}></Route>
                <Route path="recipe/edit" component={MakeRecipe}></Route>
                <Route path="recipe/nutrition-facts" component={NutritionFacts}></Route>
                <Route path="recipe/nutrition-facts/pie-chart" component={NutritionPieChart}></Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
