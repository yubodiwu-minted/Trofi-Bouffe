import React, {Component} from "react";

export default(props) => {
    return (
        <header className="header">
            <h1 className="headline">Trofí
                <small>Bouffe</small>
            </h1>
            <ul className="header-subnav">
                <li>
                    <a href="#">Browse Recipes</a>
                </li>
                <li>
                    <a href="#/new-user">Sign Up</a>
                </li>
                <li>
                    <a href="#/login">Log in</a>
                </li>
            </ul>
        </header>
    );
}
