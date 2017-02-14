import React, {Component} from "react";
import {connect} from "react-redux";

import {renderAllRecipes, renderSeeOwnRecipes, renderSignUp, renderLogInOut} from "NavHelper";

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
                {renderSignUp(props)}
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
