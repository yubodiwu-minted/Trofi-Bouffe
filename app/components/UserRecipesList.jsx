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
        var {dispatch} = this.props;
        console.log("get recipes success");
        var jwt = localStorage.getItem("jwt");
        var axiosObj = await axios("/recipes?jwt=" + jwt);
        var recipes = axiosObj.data;
        dispatch(actions.getRecipesList(recipes));
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
            <div className="recipes-container row">
                <div className="recipes-list columns medium-10 large-8 small-centered">
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
