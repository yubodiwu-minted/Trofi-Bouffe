import React, {Component} from "react";
import {connect} from "react-redux";

var NutritionFacts = (props) => {
    console.log(props.currentRecipeNf, "logged");
    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <h3>{props.currentRecipeNf.calories}</h3>
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        currentRecipeNf: state.currentRecipeNf
    };
})(NutritionFacts);
