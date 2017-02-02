import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";
import UserRecipe from "UserRecipe";

var actions = require("actions");

class UserRecipesList extends Component {
    constructor(props) {
        super(props);

        this.getRecipes = this.getRecipes.bind(this);
        this.getRecipes();
    }

    async getRecipes() {
        try {
            var {dispatch} = this.props;
            var jwt = localStorage.getItem("jwt");
            var response = await axios("/recipes?jwt=" + jwt);
            var recipes = response.data;
            dispatch(actions.getRecipesList(recipes));
        } catch (err) {
            console.error(err);
        }
    }

    renderRecipes() {
        return this.props.recipesList.map((recipe) => {
            return (
                <UserRecipe key={recipe.id} {...recipe}></UserRecipe>
            );
        })
    }

    render() {
        return (
            <div className="content-container row">
                <div className="content-list columns medium-10 large-8 small-centered">
                    <button onClick={this.getRecipes} id="new-recipe-button" className="columns medium-7 large-6 small-centered">
                        <span>+</span> NEW RECIPE
                    </button>
                    <div className="recipes-holder">
                        {this.renderRecipes()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        recipesList: state.recipesList
    };
})(UserRecipesList);
