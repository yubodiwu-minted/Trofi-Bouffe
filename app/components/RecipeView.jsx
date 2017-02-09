import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import {convertUnitAbbreviation} from "helperFunctions";
import SetNutritionFacts from "SetNutritionFacts";
import RecipeViewError from "RecipeViewError";

var actions = require("actions");

var renderIngredients = (props) => {
    var key = 0;

    return props.ingredientsList.map((ingredient) => {
        return (
            <p className="ingredient" key={key++}>
                {ingredient.quantity || "some"} {convertUnitAbbreviation[ingredient.units]} {ingredient.quantity ? "of" : ""} {ingredient.name}
            </p>
        );
    });
};

var renderDirections = (props) => {
    var key = 0;

    return props.directions.map((direction) => {
        return (
            <p className="direction" key={key++}>
                {direction.stepNumber}. {direction.stepContent}
            </p>
        );
    });
};

var renderNfButton = (props) => {
    console.log("props.currentRecipe is ", props.currentRecipe);
    if (props.currentRecipe.calories) {
        return <button onClick={viewNutritionFacts.bind(null, props)} className="blue-button">SEE NUTRITION FACTS</button>;
    } else {
        return <button onClick={setNutritionFacts.bind(null, props)} className="blue-button">SET NUTRITION FACTS</button>;
    }
};

var viewNutritionFacts = async (props) => {
    var {dispatch} = props;
    var response = await axios.get(`/nutrition-facts/recipe/${props.currentRecipe.id}`);
    var recipeNf = response.data;

    dispatch(actions.setCurrentRecipeNutritionFacts(recipeNf));
    window.location.hash = "/recipe/nutrition-facts";
}

var setNutritionFacts = async (props) => {
    var {dispatch} = props;
    var response = await axios.get(`/nutrition-facts/${props.currentRecipe.id}`);
    var ingredientsNeedNF = response.data;

    dispatch(actions.needNutritionFacts(ingredientsNeedNF));
    window.location.hash = "/recipe/set_facts";
};

var RecipeView = (props) => {
    if (!props.currentRecipe) {
        return <RecipeViewError></RecipeViewError>;
    }

    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
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
                    <button className="green-button" onClick={() => {
                        props.dispatch(actions.editRecipeClicked());
                        window.location.hash = "/recipe/edit";
                    }}>EDIT RECIPE</button>
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
