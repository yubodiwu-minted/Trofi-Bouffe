import React, {Component} from "react";
import {connect} from "react-redux";

import MakeRecipeDirections from "MakeRecipeDirections";
import MakeRecipeIngredients from "MakeRecipeIngredients";
import MakeRecipeHeader from "MakeRecipeHeader";
import MakeRecipeForm from "MakeRecipeForm";

var actions = require("actions");

var MakeRecipe = (props) => {
    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <div className="recipe-header">
                    <MakeRecipeHeader></MakeRecipeHeader>
                </div>
                <div className="recipe-content">
                    <MakeRecipeIngredients></MakeRecipeIngredients>
                    <MakeRecipeDirections></MakeRecipeDirections>
                </div>
                <MakeRecipeForm></MakeRecipeForm>
                <button id="save-recipe-button">SAVE RECIPE</button>
            </div>
        </div>
    );
}

export default connect()(MakeRecipe);
