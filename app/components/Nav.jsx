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
                    <a href="#">Sign Up</a>
                </li>
                <li>
                    <a target="_blank" href="http://zurb.com/responsive">Log in</a>
                </li>
            </ul>
        </header>
    );
}
