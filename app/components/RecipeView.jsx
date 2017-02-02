import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import convertUnitAbbreviation from "convertUnitAbbreviation";
import SetNutritionFacts from "SetNutritionFacts";

const APPID = "57583012";
const APPKEY = "680b07dfde35ff433dadae06d1571c4c";

const testUrl = `https://api.nutritionix.com/v1_1/search/pecorino%20romano?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_serving_size_qty,nf_serving_size_unit&appId=${APPID}&appKey=${APPKEY}`

console.log(testUrl);

var renderIngredients = (props) => {
    var key = 0;

    return props.ingredientsList.map((ingredient) => {
        return (
            <p className="ingredient" key={key++}>
                {ingredient.quantity} {convertUnitAbbreviation[ingredient.units]} of {ingredient.name}
            </p>
        );
    });
};

var renderDirections = (props) => {
    var key = 0;

    return props.directions.map((direction) => {
        return (
            <p className="direction" key={key++}>
                {direction.step_number}. {direction.step_content}
            </p>
        );
    });
};

var setNutritionFacts = async () => {
    // console.log(await axios.get(testUrl));
    window.location.hash = "/recipe/set_facts";
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
                    <button onClick={setNutritionFacts} id="nutrition-facts-button">NUTRITION FACTS</button>
                    <button id="edit-recipe-button">EDIT RECIPE</button>
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
