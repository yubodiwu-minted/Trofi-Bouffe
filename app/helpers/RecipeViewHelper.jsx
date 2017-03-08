import React, {Component} from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

import {convertUnitAbbreviation} from "helperFunctions";

var actions = require("actions");

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

export var renderNfButton = (props) => {
    if (props.currentRecipe.calories) {
        return <button onClick={viewNutritionFacts.bind(null, props)} className="blue-button">SEE NUTRITION FACTS</button>;
    } else {
        return <button onClick={setNutritionFacts.bind(null, props)} className="blue-button">SET NUTRITION FACTS</button>;
    }
};

export var renderEditRecipeButton = (props) => {
    var jwt = localStorage.getItem("jwt");

    if (jwt) {
        var decodedJwt = jwtDecode(jwt);
    }

    if (jwt && decodedJwt.id === props.currentRecipe.user_id) {
        return <button className="green-button" onClick={() => {
            props.dispatch(actions.editRecipeClicked());
            window.location.hash = "/recipe/edit";
        }}>EDIT RECIPE</button>;
    }
};

var viewNutritionFacts = async (props) => {
    var {dispatch} = props;
    var response = await axios.get(`/nutrition-facts/recipe/${props.currentRecipe.id}`);
    var recipeNf = response.data;

    dispatch(actions.setCurrentRecipeNutritionFacts(recipeNf));
    window.location.hash = "/recipe/nutrition-facts";
};
var setNutritionFacts = async (props) => {
    var {dispatch} = props;
    var response = await axios.get(`/nutrition-facts/${props.currentRecipe.id}`);
    var ingredientsNeedNF = response.data;

    dispatch(actions.needNutritionFacts(ingredientsNeedNF));
    window.location.hash = "/recipe/set_facts";
};
