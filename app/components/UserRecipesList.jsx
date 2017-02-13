import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";
import UserRecipe from "UserRecipe";

var actions = require("actions");

class UserRecipesList extends Component {
    constructor(props) {
        super(props);

        this.getRecipes = this.getRecipes.bind(this);
        this.newRecipe = this.newRecipe.bind(this);
    }

    componentWillMount() {
        this.getRecipes();
    }

    async getRecipes() {
        console.log("get recipes fired");
        try {
            var {dispatch} = this.props;
            var jwt = localStorage.getItem("jwt");

            if (window.location.hash === "#/user/recipes") {
                var response = await axios("/recipes?jwt=" + jwt);
            } else if (window.location.hash === "#/recipes/all") {
                var response = await axios("/recipes/all");
            }

            var recipes = response.data;
            dispatch(actions.getRecipesList(recipes));
        } catch (err) {
            console.error(err);
        }
    }

    renderRecipes() {
        if (this.props.recipesList.length === 0) {
            return <h3>You have no recipes yet.</h3>
        }

        return this.props.recipesList.map((recipe) => {
            return (
                <UserRecipe key={recipe.id} {...recipe}></UserRecipe>
            );
        })
    }

    renderNewRecipeButton() {
        if (window.location.hash === "#/user/recipes") {
            return (
                <button onClick={this.newRecipe} id="new-recipe-button" className="columns medium-7 large-6 small-centered">
                    <span>+</span> NEW RECIPE
                </button>
            );
        }
    }

    newRecipe() {
        var {dispatch} = this.props;

        dispatch(actions.clearRecipeIngredients());
        dispatch(actions.clearRecipeDirections());
        dispatch(actions.clearCurrentRecipe());

        window.location.hash = "/recipe/new";
    }

    render() {
        return (
            <div className="content-container row">
                <div className="content-list columns medium-10 large-8 small-centered">
                    {this.renderNewRecipeButton()}
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
