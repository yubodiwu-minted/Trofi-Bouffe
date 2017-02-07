import React, {Component} from "react";
import {connect} from "react-redux";

var actions = require("actions");

class MakeRecipeForm extends Component {
    constructor(props) {
        super(props);

        this.dispatch = props.dispatch;

        this.imageSubmit = this.imageSubmit.bind(this);
        this.ingredientSubmit = this.ingredientSubmit.bind(this);
        this.directionSubmit = this.directionSubmit.bind(this);
    }

    imageSubmit(event) {
        event.preventDefault();

        this.dispatch(actions.editCurrentRecipe({
            field: "img",
            value: this.refs.image.value
        }));

        this.refs.image.value = "";
    }

    ingredientSubmit(event) {
        event.preventDefault();

        this.dispatch(actions.addRecipeIngredient({
            quantity: this.refs.amount.value,
            units: this.refs.units.value,
            name: this.refs.description.value
        }));

        this.refs.amount.value = "";
        this.refs.units.value = "";
        this.refs.description.value = "";
    }

    directionSubmit(event) {
        event.preventDefault();

        this.dispatch(actions.addRecipeDirection({
            stepNumber: this.props.directions.length + 1,
            stepContent: this.refs.direction.value
        }));

        this.refs.direction.value = "";
    }

    render() {
        return (
            <div id="make-recipe-buttons-div">
                <form onSubmit={this.imageSubmit}>
                    <button className="blue-button" type="submit"><span>+</span>IMAGE</button>
                    <input id="make-recipe-image" type="text" ref="image" placeholder="image URL"/>
                </form>
                <form onSubmit={this.ingredientSubmit}>
                    <button className="blue-button" type="submit"><span>+</span>INGREDIENT</button>
                    <div>
                        <input id="ingredient-quantity" type="text" ref="amount" placeholder="amount"/>
                        <select id="ingredient-units" ref="units" default="">
                            <option value="g">grams</option>
                            <option value="oz">oz</option>
                            <option value="lbs">lbs</option>
                            <option value="tsp">tsp</option>
                            <option value="tbsp">tbsp</option>
                            <option value="cup">cups</option>
                        </select>
                        <input id="ingredient-name" type="text" ref="description" placeholder="description"/>
                    </div>
                </form>
                <form onSubmit={this.directionSubmit}>
                    <button className="blue-button" type="submit"><span>+</span>STEP</button>
                    <input type="text" ref="direction" placeholder="direction text"/>
                </form>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        currentRecipe: state.currentRecipe,
        directions: state.directions
    };
})(MakeRecipeForm);
