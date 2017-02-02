import React, {Component} from "react";
import {connect} from "react-redux";

var renderIngredients = (props) => {
    if (!props.currentRecipe) {
        return <h1>No recipe specified...</h1>
    }
    
    var key = 0

    return props.ingredientsList.map((ingredient) => {
        return (
            <p key={key++}>
                {ingredient.name}
            </p>
        );
    })
}

var RecipeView = (props) => {
    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <div>
                    <img src={props.currentRecipe.img} alt="recipe_img"/>
                    <h3>{props.currentRecipe.name}</h3>
                </div>
                <div className="recipes-holder">
                    {renderIngredients(props)}
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
