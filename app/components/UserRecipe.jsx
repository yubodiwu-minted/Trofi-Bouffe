import React, {Component} from "react";
import axios from "axios";

class UserRecipe extends Component {
    constructor(props) {
        super(props);
    }

    async getIngredients() {
        var ingredients = await axios.get("/ingredients?id=" + this.props.id);
    }

    render() {
        return (
            <div className="recipe" onClick={() => {
                console.log("div was clicked");
                console.log(this.props.id);
            }}>
                <img src={this.props.img} alt=""/>
                <div className="recipe-info">
                    <h3>
                        {this.props.name}
                    </h3>
                    <p>
                        Calories: 500
                    </p>
                    <p>
                        Servings: 4
                    </p>
                </div>
            </div>
        );
    }
}

export default UserRecipe;
