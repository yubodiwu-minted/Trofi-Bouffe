import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";

var actions = require("actions");

var viewRecipe = async (props) => {
    try {
        var {dispatch} = props;

        var ingredientsResponse = await axios.get(`/ingredients/${props.id}`);
        var directionsResponse = await axios.get(`/directions/${props.id}`);
        var ingredients = ingredientsResponse.data;
        var directions = directionsResponse.data;

        dispatch(actions.getRecipeIngredients(ingredients));
        dispatch(actions.getCurrentRecipe({
            id: props.id,
            img: props.img,
            name: props.name,
            user_id: props.user_id,
            calories: props.calories,
            servings: props.servings
        }));
        dispatch(actions.getRecipeDirections(directions.map((direction) => {
            return {
                stepNumber: direction.step_number,
                stepContent: direction.step_content
            };
        })));

        window.location.hash = "/recipe/view"
    } catch (err) {
        console.error(err);
    }
}

var UserRecipe = (props) => {
    return (
        <div className="recipe">
            <div>
                <img src={props.img} alt=""/>
                <div className="recipe-info">
                    <h3>
                        {props.name}
                    </h3>
                    <p>
                        Calories: {props.calories || "Not yet set"}
                    </p>
                    <p>
                        Servings: {props.servings || "Not yet set"}
                    </p>
                    <p>
                        Calories per serving: {Math.round(props.calories / props.servings) || "Note yet set"}
                    </p>
                </div>
            </div>
            <button className="edit-recipe-button" onClick={viewRecipe.bind(null, props)}>VIEW RECIPE</button>
        </div>
    );
}

export default connect()(UserRecipe);
