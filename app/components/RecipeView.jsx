import React, {Component} from "react";
import {connect} from "react-redux";

import {
    renderIngredients,
    renderDirections,
    renderNfButton,
    renderEditRecipeButton,
    viewNutritionFacts,
    setNutritionFacts
} from "RecipeViewHelper";
import RecipeViewError from "RecipeViewError";

var RecipeView = (props) => {
    if (!props.currentRecipe) {
        return <RecipeViewError></RecipeViewError>;
    }

    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <div className="recipe-header-holder">
                    <div className="recipe-header">
                        <img src={props.currentRecipe.img} alt="recipe_img" className="recipe-image"/>
                        <div>
                            <h3>{props.currentRecipe.name}</h3>
                            <p>
                                Calories: {props.currentRecipe.calories || "Not yet set"}
                            </p>
                            <p>
                                Servings: {props.currentRecipe.servings || "Not yet set"}
                            </p>
                            <p>
                                Calories per serving: {Math.round(props.currentRecipe.calories / props.currentRecipe.servings) || "Note yet set"}
                            </p>
                        </div>
                    </div>
                    <p className="created-by">
                        created by {props.currentRecipe.username}
                    </p>
                </div>
                <div className="recipe-content">
                    <div className="recipe-ingredients-div columns large-10">
                        <h5>STUFF</h5>
                        <div className="recipe-div-innermost">
                            {renderIngredients(props)}
                        </div>
                    </div>
                    <div className="recipe-directions-div columns large-10">
                        <h5>DIRECTIONS</h5>
                        <div className="recipe-div-innermost">
                            {renderDirections(props)}
                        </div>
                    </div>
                </div>
                <div className="recipe-buttons-div">
                    {renderNfButton(props)}
                    {renderEditRecipeButton(props)}
                </div>
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        ingredientsList: state.ingredientsList,
        currentRecipe: state.currentRecipe,
        directions: state.directions
    };
})(RecipeView);
