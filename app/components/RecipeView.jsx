import React, {Component} from "react";
import {connect} from "react-redux";

var renderIngredients = (props) => {
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
                <div className="recipes-holder">
                    {renderIngredients(props)}
                </div>
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        ingredientsList: state.ingredientsList
    };
})(RecipeView);
