import React, {Component} from "react";
import {connect} from "react-redux";

import {convertUnitAbbreviation} from "helperFunctions";

var renderIngredients = (props) => {
    var key = 0;

    return props.ingredientsList.map((ingredient) => {
        return (
            <p className="ingredient" key={key++}>
                {ingredient.quantity || "some"} {convertUnitAbbreviation[ingredient.units]} {ingredient.quantity ? "of" : ""} {ingredient.name}
            </p>
        );
    })
}

var MakeRecipeIngredients = (props) => {
    return (
        <div className="recipe-ingredients-div columns large-10">
            <h5>STUFF</h5>
            <div className="recipe-div-innermost">
                {renderIngredients(props)}
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        ingredientsList: state.ingredientsList
    };
})(MakeRecipeIngredients);
