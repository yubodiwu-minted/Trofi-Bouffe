import React, {Component} from "react";
import {connect} from "react-redux";

const actions = require("actions");

const SetNutritionFacts = (props) => {
    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                SETTING NUTRITION FACTS
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        ingredientsList: state.ingredientsList
    };
})(SetNutritionFacts);
