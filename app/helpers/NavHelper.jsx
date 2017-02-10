import React, {Component} from "react";
import axios from "axios";

var actions = require("actions");

export var renderOwnRecipes = async (props) => {
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
