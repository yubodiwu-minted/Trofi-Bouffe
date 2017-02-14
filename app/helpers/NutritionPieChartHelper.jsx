import React, {Component} from "react";

import {pieChartColors} from "helperFunctions";
import {replaceSpacesWithUnderscores} from "helperFunctions";

export var generateSlices = (props) => {
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

export var generateLegend = (props) => {
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
