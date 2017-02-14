import React, {Component} from "react";
import {connect} from "react-redux";
import PieChart from "react-simple-pie-chart";

import {generateSlices, generateLegend} from "NutritionPieChartHelper";

var NutritionPieChart = (props) => {
    if (!props.currentIngredient.pieChartData) {
        return (
            <div className="content-container row">
                <div className="content-list columns medium-10 large-8 small-centered">
                    <h3>Error: could not find pie chart data</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="content-container row">

            <div className="content-list columns medium-10 large-8 small-centered">
                <h4>{props.currentIngredient.field} Broken Down by Ingredient:</h4>
                <PieChart slices={generateSlices(props)}/>
                <div id="pie-chart-legend">
                    <h5>Ingredient Percentages:</h5>
                    {generateLegend(props)}
                </div>
                <button className="big-blue-button" onClick={() => {
                    window.location.hash = "/recipe/nutrition-facts"
                }}>Back to Nutrition Facts</button>
            </div>
        </div>
    );
};

export default connect((state) => {
    return {
        currentIngredient: state.currentIngredient,
        currentRecipe: state.currentRecipe
    };
})(NutritionPieChart);
