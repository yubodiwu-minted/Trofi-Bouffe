import React, {Component} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import {convertUnitAbbreviation} from "helperFunctions";

var actions = require("actions");

var recipeSaved = false;

var saveRecipe = async (props) => {
    if (!props.currentRecipe.saved) {
        var jwt = localStorage.getItem("jwt");
        console.log(jwt);
        await axios.post("/recipes", {
            currentRecipe: props.currentRecipe,
            ingredientsList: props.ingredientsList,
            directions: props.directions,
            jwt: jwt
        });

        props.dispatch(actions.getCurrentRecipe({
            ...props.currentRecipe,
            user_id: jwtDecode(jwt).id
        }));
        window.location.hash = "/recipe/view";
    }
};

var editRecipe = async (props) => {
    if (!props.currentRecipe.saved) {
        await axios.put("/recipes", {
            currentRecipe: props.currentRecipe,
            ingredientsList: props.ingredientsList,
            directions: props.directions,
            jwt: localStorage.getItem("jwt")
        });

        window.location.hash = "/recipe/view";
    }
};

var deleteRecipe = async (props) => {
    console.log(props.currentRecipe);
    await axios.delete(`/recipes?currentRecipe=${JSON.stringify(props.currentRecipe)}&jwt=${localStorage.getItem("jwt")}`);

    window.location.hash = "/user/recipes";
}

export var renderButton = (props) => {
    if (!props.currentRecipe.id) {
        return <button className="save-recipe-button" onClick={saveRecipe.bind(this, props)}>SAVE RECIPE</button>;
    } else {
        return [
            <button key="0" className="save-recipe-button" onClick={editRecipe.bind(this, props)}>SAVE EDITS</button>,
            <button key="1" className="delete-recipe-button" onClick={deleteRecipe.bind(this, props)}>DELETE RECIPE</button>
        ];
    }
};

export var renderDirections = (props) => {
    var key = 0;

    return props.directions.map((direction) => {
        return (
            <p className="direction" key={key++}>
                {direction.stepNumber}. {direction.stepContent}
            </p>
        );
    });
};

export var renderIngredients = (props) => {
    var key = 0;

    return props.ingredientsList.map((ingredient) => {
        return (
            <p className="ingredient" key={key++}>
                {ingredient.quantity || "some"} {convertUnitAbbreviation[ingredient.units]} {ingredient.quantity ? "of" : ""} {ingredient.name}
            </p>
        );
    });
};
