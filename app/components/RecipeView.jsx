import React, {Component} from "react";
import {connect} from "react-redux";
import convertUnitAbbreviation from "convertUnitAbbreviation";

var renderIngredients = (props) => {
    var key = 0

    return props.ingredientsList.map((ingredient) => {
        return (
            <p className="ingredient" key={key++}>
                {ingredient.quantity} {convertUnitAbbreviation[ingredient.units]} of {ingredient.name}
            </p>
        );
    })
}

var RecipeView = (props) => {
    if (!props.currentRecipe) {
        return (
            <div className="content-container row">
                <div className="content-list columns medium-10 large-8 small-centered">
                    <h3>No recipe specified...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <div className="recipe-header">
                    <img src={props.currentRecipe.img} alt="recipe_img" className="recipe-image"/>
                    <h3>{props.currentRecipe.name}</h3>
                </div>
                <div className="recipe-content">
                    <div className="recipe-content-div columns large-10">
                        {renderIngredients(props)}
                    </div>
                    <div className="recipe-content-div columns large-10">
                        Instructions will go here
                    </div>
                </div>
                <div className="recipe-buttons-div">
                    <button id="nutrition-facts-button">NUTRITION FACTS</button>
                    <button id="edit-recipe-button">EDIT RECIPE</button>
                </div>
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        ingredientsList: state.ingredientsList,
        currentRecipe: state.currentRecipe
    };
})(RecipeView);
