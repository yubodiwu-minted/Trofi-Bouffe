import React, {Component} from "react";
import {connect} from "react-redux";

var actions = require("actions");

class MakeRecipeHeader extends Component {
    constructor(props) {
        super(props);

        this.dispatch = this.props.dispatch;

        this.servingsSubmit = this.servingsSubmit.bind(this);
        this.titleSubmit = this.titleSubmit.bind(this);
    }

    servingsSubmit(event) {
        event.preventDefault();

        this.dispatch(actions.editCurrentRecipe({
            field: "servings",
            value: this.refs.recipeServings.value
        }));
        this.dispatch(actions.submitCurrentRecipeServings());

        this.refs.recipeServings.value = "";
    }

    titleSubmit(event) {
        event.preventDefault();

        this.dispatch(actions.editCurrentRecipe({
            field: "name",
            value: this.refs.recipeName.value
        }));
        this.dispatch(actions.submitCurrentRecipeName());

        this.refs.recipeName.value = "";
    }

    renderImage() {
        if (this.props.currentRecipe.img && this.props.currentRecipe.imgSubmitted) {
            return (
                <div id="make-recipe-image-holder">
                    <p>Click to edit:</p>
                    <img src={this.props.currentRecipe.img} alt="broken url" className="recipe-image" onClick={() => {
                        this.dispatch(actions.clearCurrentRecipeImage());
                    }}/>
                </div>
            );
        } else {
            return (
                <div id="recipe-image-placeholder">
                    <p>Need Recipe Image</p>
                </div>
            );
        }
    }

    renderTitle() {
        if (this.props.currentRecipe.name && this.props.currentRecipe.nameSubmitted) {
            return <h3 onClick={() => {
                this.dispatch(actions.clearCurrentRecipeName());
            }}>{this.props.currentRecipe.name} (click to edit)</h3>
        } else {
            return (
                <form onSubmit={this.titleSubmit}>
                    <label>Title (hit enter to change):
                        <input type="text" ref="recipeName" onChange={() => {
                            this.dispatch(actions.editCurrentRecipe({
                                field: "name",
                                value: this.refs.recipeName.value
                            }));
                        }}/>
                    </label>
                </form>
            );
        }
    }

    renderServings() {
        if (this.props.currentRecipe.servings && this.props.currentRecipe.servingsSubmitted) {
            return <p onClick={() => {
                this.dispatch(actions.clearCurrentRecipeServings());
            }}>Servings: {this.props.currentRecipe.servings} (click to edit)</p>
        } else {
            return (
                <form onSubmit={this.servingsSubmit}>
                    <label>Servings (hit enter to change):
                        <input type="text" ref="recipeServings" onChange={() => {
                            this.dispatch(actions.editCurrentRecipe({
                                field: "servings",
                                value: this.refs.recipeServings.value
                            }));
                        }}/>
                    </label>
                </form>
            );
        }
    }

    render() {
        return (
            <div className="recipe-header">
                {this.renderImage()}
                <div>
                    {this.renderTitle()}
                    {this.renderServings()}
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        currentRecipe: state.currentRecipe
    };
})(MakeRecipeHeader);
