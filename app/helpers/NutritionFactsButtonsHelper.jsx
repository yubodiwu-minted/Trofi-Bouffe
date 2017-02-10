import React, {Component} from "react";
import axios from "axios";

var actions = require("actions");

var calorieButtonClick = async (event, props) => {
    var response = await axios.get(`/nutrition-facts/recipe-ingredients/${props.currentRecipe.id}/calories`);
    props.dispatch(actions.setNfPieChartData(response.data));
    props.dispatch(actions.setCurrentIngredientField("Calories"));

    window.location.hash = "recipe/nutrition-facts/pie-chart";
}

export var renderButtons = (props) => {
    return [
        <button key="0" className="green-button" onClick={(event) => {
            return calorieButtonClick(event, props);
        }}>Calories</button>
    ];
};
