import React, {Component} from "react";
import {connect} from "react-redux";

import {renderSeeOwnRecipes, renderAllRecipes, renderLogInOut} from "NavHelper";

var Nav = (props) => {
    props.loggedIn;
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
                {renderLogInOut(props)}
            </ul>
        </header>
    );
}

export default connect((state) => {
    return {
        recipesList: state.recipesList,
        loggedIn: state.loggedIn
    };
})(Nav);
