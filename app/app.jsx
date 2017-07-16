import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

import Main from 'Main';
import Landing from 'Landing';
import RegistrationForm from 'RegistrationForm';
import LoginForm from 'LoginForm';
import UserRecipesList from 'UserRecipesList';
import RecipeView from 'RecipeView';
import SetNutritionFacts from 'SetNutritionFacts';
import MakeRecipe from 'MakeRecipe';
import NutritionFacts from 'NutritionFacts';
import NutritionPieChart from 'NutritionPieChart';

const store = require('configureStore').configure();

store.subscribe(() => {
  const state = store.getState();
  console.log('New state:', state);
});

// Load foundation
// require('style!css!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Landing} />
        <Route path="user/new" component={RegistrationForm} />
        <Route path="login" component={LoginForm} />
        <Route path="user/recipes" component={UserRecipesList} />
        <Route path="recipes/all" component={UserRecipesList} />
        <Route path="recipe/view" component={RecipeView} />
        <Route path="recipe/set_facts" component={SetNutritionFacts} />
        <Route path="recipe/new" component={MakeRecipe} />
        <Route path="recipe/edit" component={MakeRecipe} />
        <Route path="recipe/nutrition-facts" component={NutritionFacts} />
        <Route path="recipe/nutrition-facts/pie-chart" component={NutritionPieChart} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
