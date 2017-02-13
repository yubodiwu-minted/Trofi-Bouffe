import React, {Component} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

var actions = require("actions");

var renderOwnRecipes = async (props) => {
    console.log(props);
    try {
        var {dispatch} = props;
        var jwt = localStorage.getItem("jwt");

        var response = await axios("/recipes?jwt=" + jwt);
        var recipes = response.data;
        dispatch(actions.getRecipesList(recipes));
    } catch (err) {
        console.error(err);
    }
};

export var renderAllRecipes = async (props) => {
    console.log(props);
    try {
        var {dispatch} = props;
        var jwt = localStorage.getItem("jwt");

        var response = await axios("/recipes/all");
        var recipes = response.data;
        dispatch(actions.getRecipesList(recipes));
    } catch (err) {
        console.error(err);
    }
};

export var renderSeeOwnRecipes = (props) => {
    props.loggedIn;
    var jwt = localStorage.getItem("jwt");

    if (jwt) {
        var decodedJwt = jwtDecode(jwt);
    }

    if (decodedJwt && decodedJwt.iat < decodedJwt.exp) {
        return (
            <li>
                <a href="#/user/recipes" onClick={renderOwnRecipes.bind(this, props)}>See Own Recipes</a>
            </li>
        );
    }
};

export var renderLogInOut = (props) => {
    props.loggedIn;
    var jwt = localStorage.getItem("jwt");

    if (jwt) {
        var decodedJwt = jwtDecode(jwt);
    }

    if (decodedJwt && decodedJwt.iat < decodedJwt.exp) {
        return (
            <li>
                <a href="#/" onClick={() => {
                    localStorage.removeItem("jwt");
                    props.dispatch(actions.logOut());
                }}>Log Out {props.loggedIn}</a>
            </li>
        );
    } else {
        return (
            <li>
                <a href="#/login">Log in {props.loggedIn}</a>
            </li>
        );
    }
};
