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
        var {dispatch} = this.props;
        var ingredientsObj = await axios.get(`/ingredients/${this.props.id}`);
        var ingredients = ingredientsObj.data;
        dispatch(actions.getRecipeIngredients(ingredients));

        window.location.hash = "/recipe/view"
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
                            Calories: N/A
                        </p>
                        <p>
                            Servings: N/A
                        </p>
                    </div>
                </div>
                <button id="edit-recipe-button" onClick={this.viewRecipe}>VIEW RECIPE</button>
            </div>
        );
    }
}

export default connect()(UserRecipe);
