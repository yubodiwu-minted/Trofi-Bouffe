import React, {Component} from "react";
import {connect} from "react-redux";

import {renderOwnRecipes, renderAllRecipes} from "NavHelper";

var renderSeeOwnRecipes = (props) => {
    if (localStorage.getItem("jwt")) {
        return (
            <li>
                <a href="#/user/recipes" onClick={renderOwnRecipes.bind(this, props)}>See Own Recipes</a>
            </li>
        );
    }
}

var Nav = (props) => {
    return (
        <header className="header">
            <h1 className="headline">Trofí
                <small>Bouffe</small>
            </h1>
            <ul className="header-subnav">
                <li>
                    <a href="#/recipes/all" onClick={renderAllRecipes.bind(this, props)}>Browse Recipes</a>
                </li>
                {renderSeeOwnRecipes(props)}
                <li>
                    <a href="#/user/new">Sign Up</a>
                </li>
                <li>
                    <a href="#/login">Log in</a>
                </li>
            </ul>
        </header>
    );
}

export default connect((state) => {
    return {
        recipesList: state.recipesList
    };
})(Nav);
