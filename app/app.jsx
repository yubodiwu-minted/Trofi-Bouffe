import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router, IndexRoute, hashHistory} from "react-router";

import Main from "Main";
import Landing from "Landing";
import RegistrationForm from "RegistrationForm";
import LoginForm from "LoginForm";
import UserRecipesList from "UserRecipesList";

// Load foundation
$(document).foundation();

// App css
require("style!css!sass!applicationStyles")

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Landing}></IndexRoute>
            <Route path="user/new" component={RegistrationForm}></Route>
            <Route path="login" component={LoginForm}></Route>
            <Route path="user/recipes" component={UserRecipesList}></Route>
        </Route>
    </Router>,
    document.getElementById("app")
);
