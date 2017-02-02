import React, {Component} from "react";
import axios from "axios";

class UserRecipe extends Component {
    constructor(props) {
        super(props);

        this.viewRecipe = this.viewRecipe.bind(this);
    }

    async viewRecipe() {
        var ingredients = await axios.get(`/ingredients/${this.props.id}`);
        console.log(ingredients);

        window.location.hash = "/recipe/view"
    }

    render() {
        return (
            <div className="recipe">
                <div>
                    <img src={this.props.img} alt=""/>
                    <div className="recipe-info">
                        <h3>
                            {this.props.name}
                        </h3>
                        <p>
                            Calories: N/A
                        </p>
                        <p>
                            Servings: N/A
                        </p>
                    </div>
                </div>
                <button id="edit-recipe-button" onClick={this.viewRecipe}>VIEW RECIPE</button>
            </div>
        );
    }
}

export default UserRecipe;
