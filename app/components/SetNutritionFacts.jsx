import React, {Component} from "react";
import {connect} from "react-redux";

const actions = require("actions");

var renderIngredients = (props) => {
    var key = 0;

    return props.ingredientsList.map((ingredient) => {
        console.log(key);
        return <p key={key++}>{ingredient.name}</p>;
    });
};

var renderOptions = (props) => {
    var key = 0;

    var options = [];

    for (let i = 0; i < props.ingredientsList.length; i++) {
        options.push(
            <select name="" id="">
                <option value="tell">WHAT</option>
                <option value="me">WHY</option>
            </select>
        );
    }

    return options;
};

const SetNutritionFacts = (props) => {
    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <h4>These ingredients need nutrition facts:</h4>
                <div id="nutrition-options-div">
                    <div id="nutrition-ingredients">
                        {renderIngredients(props)}
                    </div>
                    <div id="nutrition-select">
                        {renderOptions(props)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        ingredientsList: state.ingredientsList
    };
})(SetNutritionFacts);
