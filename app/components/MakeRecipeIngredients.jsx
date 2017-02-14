import React, {Component} from "react";
import {connect} from "react-redux";

import {renderIngredients} from "MakeRecipeHelper";

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
