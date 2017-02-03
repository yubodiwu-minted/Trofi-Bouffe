import React, {Component} from "react";

const APPID = "57583012";
const APPKEY = "680b07dfde35ff433dadae06d1571c4c";

var renderOptions = (props) => {
    // added upc and serving weight in grams
    var nutritionixUrl = encodeURI(`https://api.nutritionix.com/v1_1/search/${props.name}?results=0:20&fields=item_name,brand_name,item_id,upc,item_type,nf_calories,nf_calories_from_fat,nf_total_fat,nf_saturated_fat,nf_monounsaturated_fat,nf_polyunsaturated_fat,nf_trans_fatty_acid,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium,nf_serving_size_qty,nf_serving_size_unit,nf_serving_weight_grams&appId=${APPID}&appKey=${APPKEY}`);

    console.log(nutritionixUrl);
}

var NutritionFactSelector = (props) => {
    renderOptions(props);

    return (
        <label>{props.name}
            <select name="" id="">
                <option value="tell">WHAT</option>
                <option value="me">WHY</option>
            </select>
        </label>
    );
}

export default NutritionFactSelector;
