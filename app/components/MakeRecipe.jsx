import React, {Component} from "react";
import {connect} from "react-redux";

import MakeRecipeDirections from "MakeRecipeDirections";
import MakeRecipeIngredients from "MakeRecipeIngredients";
import MakeRecipeHeader from "MakeRecipeHeader";
import MakeRecipeForm from "MakeRecipeForm";
import MakeRecipeError from "MakeRecipeError";
import {renderButton} from "MakeRecipeHelper";

var actions = require("actions");

var recipeSaved = false;

var MakeRecipe = (props) => {
    if (localStorage.getItem("jwt")) {
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
                    {renderButton(props)}
                </div>
            </div>
        );
    } else {
        return <MakeRecipeError></MakeRecipeError>;
    }

}

export default connect((state) => {
    return {
        currentRecipe: state.currentRecipe,
        ingredientsList: state.ingredientsList,
        directions: state.directions
    };
})(MakeRecipe);
