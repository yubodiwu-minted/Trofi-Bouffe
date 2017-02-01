import React, {Component} from "react";
import axios from "axios";

export default class UserRecipesList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="recipes-container row">
                <div className="recipes-list columns medium-10 large-8 small-centered">
                    <div className="recipes-holder">
                        THIS IS WHERE ALL OF THE RECIPES WILL GO
                    </div>
                    <button id="new-recipe-button" className="columns medium-7 large-6 small-centered"><span>+</span> RECIPE</button>
                </div>
            </div>
        );
    }
}
