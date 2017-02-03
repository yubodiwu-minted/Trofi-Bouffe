import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

var actions = require("actions");

const APPID = "57583012";
const APPKEY = "680b07dfde35ff433dadae06d1571c4c";

var renderOptions = async (props) => {
    var {dispatch} = props;
    var itemsToBank = [];
    var nutritionixUrl = encodeURI(`https://api.nutritionix.com/v1_1/search/${props.name}?results=0:20&fields=item_name,brand_name,item_id,upc,item_type,nf_calories,nf_calories_from_fat,nf_total_fat,nf_saturated_fat,nf_monounsaturated_fat,nf_polyunsaturated_fat,nf_trans_fatty_acid,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium,nf_serving_size_qty,nf_serving_size_unit,nf_serving_weight_grams&appId=${APPID}&appKey=${APPKEY}`);

    var nutritionixResponse = await axios.get(nutritionixUrl);

    var nutritionOptions = nutritionixResponse.data.hits.map((hit) => {
        itemsToBank.push({
            id: hit.fields.item_id,
            nutritionFacts: hit.fields
        });

        return <option value={hit.fields.item_id}>{hit.fields.item_name}</option>;
    });

    // dispatch(actions.storeNutritionFacts(itemsToBank));
    return nutritionOptions;
}

class NutritionFactSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: []
        };

        this.renderOptions = this.renderOptions.bind(this);

        this.getOptions();
    }

    async getOptions() {
        var {dispatch} = this.props;
        var nutritionixUrl = encodeURI(`https://api.nutritionix.com/v1_1/search/${this.props.name}?results=0:20&fields=item_name,brand_name,item_id,upc,item_type,nf_calories,nf_calories_from_fat,nf_total_fat,nf_saturated_fat,nf_monounsaturated_fat,nf_polyunsaturated_fat,nf_trans_fatty_acid,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium,nf_serving_size_qty,nf_serving_size_unit,nf_serving_weight_grams&appId=${APPID}&appKey=${APPKEY}`);

        var nutritionixResponse = await axios.get(nutritionixUrl);
        var nutritionOptions = nutritionixResponse.data.hits

        dispatch(actions.storeNutritionFacts(nutritionOptions));

        this.setState({
            options: nutritionOptions
        });
    }

    renderOptions() {
        return this.state.options.map((hit) => {
            return <option value={hit.fields.item_id}>{hit.fields.item_name}</option>;
        })
    }

    render() {
        return (
            <label>{this.props.name}
                <select name="" id="">
                    {this.renderOptions()}
                </select>
            </label>
        );
    }
}

// var NutritionFactSelector = (props) => {
//     return (
//         <label>{props.name}
//             <select name="" id="">
//                 {renderOptions()}
//             </select>
//         </label>
//     );
// };

export default connect()(NutritionFactSelector);
