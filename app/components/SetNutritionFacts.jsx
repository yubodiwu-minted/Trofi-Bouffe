import React, {Component} from "react";
import {connect} from "react-redux";

const actions = require("actions");

var renderIngredients = (props) => {
    var key = 0;

    return props.ingredientsList.map((ingredient) => {
        return (
            <label key={key++}>{ingredient.name}
                <select name="" id="">
                    <option value="tell">WHAT</option>
                    <option value="me">WHY</option>
                </select>
            </label>
        );
    });
};

const SetNutritionFacts = (props) => {
    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <h4>These ingredients need nutrition facts (choose the option that fits):</h4>
                <div id="nutrition-options-div">
                    <div id="nutrition-options">
                        {renderIngredients(props)}
                    </div>
                </div>
                <button className="blue-button">SET NUTRITION FACTS</button>
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        ingredientsList: state.ingredientsList
    };
})(SetNutritionFacts);
