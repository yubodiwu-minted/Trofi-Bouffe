import React, {Component} from "react";
import {connect} from "react-redux";

import {round} from "helperFunctions";

var renderButtons = (props) => {
    return [
        <button className="green-button" onClick={() => {
            window.location.hash = "/recipe/nutrition-facts/pie-chart"
        }}>Calories</button>,
        <button className="blue-button">Total Fat</button>,
        <button className="green-button">Cholesterol</button>,
        <button className="blue-button">Sodium</button>,
        <button className="green-button">Total Carbohydrates</button>
    ];
};

var NutritionFacts = (props) => {
    console.log(props.currentRecipeNf, "logged");
    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <div id="nutritionfacts">
                    <table width="242" cellSpacing="0" cellPadding="0">
                        <tbody>
                            <tr>
                                <td className="center-align" className="nf-header">
                                    Nutrition Facts
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="nf-serving">
                                        {props.currentRecipe.servings}{"  "}
                                        servings per recipe
                                    </div>
                                </td>
                            </tr>
                            <tr className="height-7">
                                <td className="bg-black"></td>
                            </tr>
                            <tr>
                                <td className="font-7">
                                    <div className="line">Amount Per Serving</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line">
                                        <div className="nf-label">Calories
                                            <div className="weight">{" "}{round(props.currentRecipeNf.calories / props.currentRecipe.servings)}</div>
                                        </div>
                                        <div id="fat-cals">Calories from Fat
                                            <div className="weight">{" "}{round(props.currentRecipeNf.calories_from_fat / props.currentRecipe.servings)}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line">
                                        <div className="dvlabel">% Daily Value<sup>*</sup>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line">
                                        <div className="nf-label">Total Fat
                                            <div className="weight">{` ${round(props.currentRecipeNf.total_fat / props.currentRecipe.servings)}g`}</div>
                                        </div>
                                        <div className="dv">{`${round(props.currentRecipeNf.total_fat / 62 * 100 / props.currentRecipe.servings)}%`}</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent">
                                    <div className="line">
                                        <div className="labellight">Saturated Fat
                                            <div className="weight">{` ${round(props.currentRecipeNf.saturated_fat / props.currentRecipe.servings)}g`}</div>
                                        </div>
                                        <div className="dv">{round(props.currentRecipeNf.saturated_fat / 20 * 100 / props.currentRecipe.servings)}%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent">
                                    <div className="line">
                                        <div className="labellight">
                                            <i>Trans</i>
                                            {" Fat"}
                                            <div className="weight">{` ${round(props.currentRecipeNf.trans_fatty_acid * 100 / props.currentRecipe.servings)}`}g</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line">
                                        <div className="nf-label">Cholesterol
                                            <div className="weight">{` ${round(props.currentRecipeNf.cholesterol / props.currentRecipe.servings)}`}mg</div>
                                        </div>
                                        <div className="dv">{round(props.currentRecipeNf.cholesterol / 300 * 100 / props.currentRecipe.servings)}%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line">
                                        <div className="nf-label">Sodium
                                            <div className="weight">{` ${round(props.currentRecipeNf.sodium / props.currentRecipe.servings)}`}mg</div>
                                        </div>
                                        <div className="dv">{round(props.currentRecipeNf.sodium / 2300 * 100 / props.currentRecipe.servings)}%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line">
                                        <div className="nf-label">Total Carbohydrates
                                            <div className="weight">{` ${round(props.currentRecipeNf.total_carbohydrate / props.currentRecipe.servings)}`}g</div>
                                        </div>
                                        <div className="dv">{round(props.currentRecipeNf.total_carbohydrate / props.currentRecipe.servings / 300 * 100)}%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent">
                                    <div className="line">
                                        <div className="labellight">Dietary Fiber
                                            <div className="weight">{` ${round(props.currentRecipeNf.dietary_fiber / props.currentRecipe.servings)}`}g</div>
                                        </div>
                                        <div className="dv">{round(props.currentRecipeNf.dietary_fiber / 25 * 100 / props.currentRecipe.servings)}%</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="indent">
                                    <div className="line">
                                        <div className="labellight">Sugars
                                            <div className="weight">{` ${round(props.currentRecipeNf.sugars / props.currentRecipe.servings)}`}g</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line">
                                        <div className="nf-label">Protein
                                            <div className="weight">{` ${round(props.currentRecipeNf.protein / props.currentRecipe.servings)}`}g</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="height-7">
                                <td className="bg-black"></td>
                            </tr>
                            <tr>
                                <td>
                                    <table cellSpacing="0" cellPadding="0" className="vitamins">
                                        <tbody>
                                            <tr>
                                                <td>Vitamin A &nbsp;&nbsp; {round(props.currentRecipeNf.vitamin_a_dv / props.currentRecipe.servings)}%</td>
                                                <td className="center-align">•</td>
                                                <td className="right-align">Calcium &nbsp;&nbsp; {round(props.currentRecipeNf.calcium_dv / props.currentRecipe.servings)}%</td>
                                            </tr>
                                            <tr>
                                                <td>Vitamin C &nbsp;&nbsp; {round(props.currentRecipeNf.vitamin_c_dv / props.currentRecipe.servings)}%</td>
                                                <td className="center-align">•</td>
                                                <td className="right-align">Iron &nbsp;&nbsp; {round(props.currentRecipeNf.iron / props.currentRecipe.servings)}%</td>
                                            </tr>
                                            <tr>
                                                <td>Potassium &nbsp;&nbsp; {round(props.currentRecipeNf.potassium / props.currentRecipe.servings)}%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="line">
                                        <div className="labellight">
                                            * Based on a regular 2000 calorie diet
                                            <br/>
                                            <i>Nutritional details are an estimate and should only be used as a guide for approximation.</i>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 id="nf-button-holder-title">See Value by Ingredient:</h4>
                <div id="nf-button-holder">
                    {renderButtons(props)}
                </div>
            </div>
        </div>
    );
}

export default connect((state) => {
    return {currentRecipeNf: state.currentRecipeNf, currentRecipe: state.currentRecipe};
})(NutritionFacts);
