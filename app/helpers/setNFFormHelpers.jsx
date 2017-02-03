import React, {Component} from "react";
import axios from "axios";

import {capitalizeWords, replaceSpacesWithUnderscores} from "helperFunctions";

const APPID = "57583012";
const APPKEY = "680b07dfde35ff433dadae06d1571c4c";

export async function createOptions(needNF) {
    var stateChanges = {};

    var optionsPromises = needNF.map((ingredient) => {
        return getOptions(ingredient.name);
    });

    for (let optionsPromise of optionsPromises) {
        let changeToState = await optionsPromise;
        stateChanges[replaceSpacesWithUnderscores(changeToState.name)] = changeToState.nutritionOptions;
    }

    return stateChanges;
}

async function getOptions(name) {
    var nutritionixUrl = encodeURI(`https://api.nutritionix.com/v1_1/search/${name}?results=0:20&fields=item_name,brand_name,item_id,upc,item_type,nf_calories,nf_calories_from_fat,nf_total_fat,nf_saturated_fat,nf_monounsaturated_fat,nf_polyunsaturated_fat,nf_trans_fatty_acid,nf_cholesterol,nf_sodium,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv,nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv,nf_potassium,nf_serving_size_qty,nf_serving_size_unit,nf_serving_weight_grams&appId=${APPID}&appKey=${APPKEY}`);

    var nutritionixResponse = await axios.get(nutritionixUrl);
    var nutritionOptions = nutritionixResponse.data.hits

    return {
        name,
        nutritionOptions
    };
}

export function renderOptions(options) {
    return options.map((hit) => {
        return (
            <option key={hit.fields.item_id} value={JSON.stringify(hit.fields)}>
                {hit.fields.item_name} (units: {hit.fields.nf_serving_size_unit})
            </option>
        );
    });
}
