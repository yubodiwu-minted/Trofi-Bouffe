import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";

var actions = require("actions");

class UserRecipe extends Component {
    constructor(props) {
        super(props);

        this.viewRecipe = this.viewRecipe.bind(this);
    }

    async viewRecipe() {
        try {
            var {dispatch} = this.props;

            var ingredientsResponse = await axios.get(`/ingredients/${this.props.id}`);
            var directionsResponse = await axios.get(`/directions/${this.props.id}`);
            var ingredients = ingredientsResponse.data;
            var directions = directionsResponse.data;

            dispatch(actions.getRecipeIngredients(ingredients));
            dispatch(actions.getCurrentRecipe({
                id: this.props.id,
                img: this.props.img,
                name: this.props.name,
                user_id: this.props.user_id,
                calories: this.props.calories,
                servings: this.props.servings
            }));
            dispatch(actions.getRecipeDirections(directions));

            window.location.hash = "/recipe/view"
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <div className="recipe">
                <div>
                    <img src={this.props.img} alt=""/>
                    <div className="recipe-info">
                        <h3>
                            {this.props.name}
                        </h3>
                        <p>
                            Calories: {this.props.calories || "Not yet set"}
                        </p>
                        <p>
                            Servings: {this.props.servings || "Not yet set"}
                        </p>
                    </div>
                </div>
                <button id="edit-recipe-button" onClick={this.viewRecipe}>VIEW RECIPE</button>
            </div>
        );
    }
}

export default connect()(UserRecipe);
