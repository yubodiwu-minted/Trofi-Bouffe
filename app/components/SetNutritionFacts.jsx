import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import capitalizeWords from "capitalizeWords";
import NutritionFactSelector from "NutritionFactSelector";
import SetNutritionFactsError from "SetNutritionFactsError";

const APPID = "57583012";
const APPKEY = "680b07dfde35ff433dadae06d1571c4c";

function replaceSpacesWithUnderscores(string) {
    return string.replace(/\s+/g, "_");
}

class SetNutritionFacts extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        for (let obj of this.props.needNF) {
            this.state[replaceSpacesWithUnderscores(obj.name)] = [];
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.createOptions();
    }

    renderIngredients() {
        console.log("happening?");
        var key = 0;

        var selectors = [];

        var ingredientsThatNeedNF = this.props.needNF.map((obj) => {
            return obj.name;
        })

        for (let name of ingredientsThatNeedNF) {
            debugger;
            selectors.push(
                <label key={key++}>{name}
                    <select ref={replaceSpacesWithUnderscores(name)}>
                        {renderOptions(this.state[replaceSpacesWithUnderscores(name)])}
                    </select>
                </label>
            );
        }

        return selectors;

        function renderOptions(options) {
            return options.map((hit) => {
                return (
                    <option key={hit.fields.item_id} value={JSON.stringify(hit.fields)}>
                        {hit.fields.item_name} (units: {hit.fields.nf_serving_size_unit})
                    </option>
                );
            })
        }
    };

    async createOptions() {
        var stateChanges = {};

        var optionsPromises = this.props.needNF.map((ingredient) => {
            return this.getOptions(ingredient.name);
        });

        for (let optionsPromise of optionsPromises) {
            let changeToState = await optionsPromise;
            stateChanges[replaceSpacesWithUnderscores(changeToState.name)] = changeToState.nutritionOptions;
        }

        this.setState(stateChanges);
    }

    async getOptions(name) {
        var nutritionixUrl = encodeURI(`https://api.nutritionix.com/v1_1/search/${name}?results=0:20&fields=item_name,brand_name,item_id,upc,item_type,nf_calories,nf_calories_from_fat,nf_total_fat,nf_saturated_fat,nf_monounsaturated_fat,nf_polyunsaturated_fat,nf_trans_fatty_acid,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium,nf_serving_size_qty,nf_serving_size_unit,nf_serving_weight_grams&appId=${APPID}&appKey=${APPKEY}`);

        var nutritionixResponse = await axios.get(nutritionixUrl);
        var nutritionOptions = nutritionixResponse.data.hits

        return {
            name,
            nutritionOptions
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.refs);
        debugger;
    }

    render() {
        if (this.props.needNF.length === 0) {
            return <SetNutritionFactsError></SetNutritionFactsError>
        }

        return (
            <div className="content-container row">
                <div className="content-list columns medium-10 large-8 small-centered">
                    <h4>These ingredients need nutrition facts (choose the option that fits):</h4>
                    <div id="nutrition-options-div">
                        <div id="nutrition-options">
                            <form id="set-nutrition-facts" action="/nutrition-facts" method="POST" onSubmit={this.handleSubmit}>
                                {this.renderIngredients()}
                                <button type="submit" form="set-nutrition-facts" className="blue-button">SET NUTRITION FACTS</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        needNF: state.needNF
    };
})(SetNutritionFacts);
