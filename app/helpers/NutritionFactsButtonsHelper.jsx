import React, {Component} from "react";
import axios from "axios";

import {replaceUnderscoresWithSpaces, capitalizeWords} from "helperFunctions";

var actions = require("actions");

var buttonClick = async (event, props, field) => {
    var response = await axios.get(`/nutrition-facts/recipe-ingredients/${props.currentRecipe.id}/${field}`);
    props.dispatch(actions.setNfPieChartData(response.data));
    props.dispatch(actions.setCurrentIngredientField(capitalizeWords(replaceUnderscoresWithSpaces(field))));

    window.location.hash = "recipe/nutrition-facts/pie-chart";
};


export var renderButtons = (props) => {
    return [
        <button key="0" className="gold-button" onClick={(event) => {
            return buttonClick(event, props, "calories");
        }}>Calories</button>,
        <button key="1" className="red-button" onClick={(event) => {
            return buttonClick(event, props, "calories_from_fat");
        }}>Calories From Fat</button>,
        <button key="2" className="purple-button" onClick={(event) => {
            return buttonClick(event, props, "sodium");
        }}>Sodium</button>,
        <button key="3" className="slightly-darker-green-button" onClick={(event) => {
            return buttonClick(event, props, "saturated_fat");
        }}>Saturated Fat</button>,
        <button key="4" className="teal-button" onClick={(event) => {
            return buttonClick(event, props, "sugars");
        }}>Sugars</button>,
        <button key="5" className="sky-blue-button" onClick={(event) => {
            return buttonClick(event, props, "total_carbohydrate");
        }}>Total Carbohydrates</button>
    ];
};
