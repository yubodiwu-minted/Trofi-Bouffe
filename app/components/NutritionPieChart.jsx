import React, {Component} from "react";
import {connect} from "react-redux";
import PieChart from "react-simple-pie-chart";

import {pieChartColors} from "helperFunctions";
import {replaceSpacesWithUnderscores} from "helperFunctions";

var generateSlices = (props) => {
    var total = props.currentIngredient.pieChartData.reduce((accum, cur) => {
        return accum + cur.field;
    }, 0);

    return props.currentIngredient.pieChartData.map((ingredient, i) => {
        return {
            color: pieChartColors[i % props.currentIngredient.pieChartData.length],
            value: Math.round(ingredient.field / total * 100, 1)
        };
    });
};

var generateLegend = (props) => {
    var key = 0;
    var total = props.currentIngredient.pieChartData.reduce((accum, cur) => {
        return accum + cur.field;
    }, 0);

    return props.currentIngredient.pieChartData.map((ingredient, i) => {
        var ingredientPercentOfTotal = Math.round(ingredient.field / total * 1000) / 10;

        if (ingredientPercentOfTotal !== 0) {
            switch (props.currentIngredient.field) {
                case "Sodium":
                    var units = " mg of ";
                    break;
                case "Saturated Fat":
                    var units = " grams of ";
                    break;
                case "Sugars":
                    var units = " grams of ";
                    break;
                case "Total Carbohydrate":
                    var units = " grams of ";
                    break;
                default:
                    var units = " ";
            }

            return (
                <div className="pie-chart-legend-element" key={++key}>
                    <div className="pie-chart-legend-color-box" style={{
                        backgroundColor: pieChartColors[i % props.currentIngredient.pieChartData.length]
                    }} key={++key}/>
                    {`${Math.round(ingredient.field / total * 1000) / 10}% ${ingredient.name}, ${Math.round(ingredient.field / props.currentRecipe.servings * 100) / 100}${units}${props.currentIngredient.field.toLowerCase()} per serving`}
                </div>
            );
        }
    });
};

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
