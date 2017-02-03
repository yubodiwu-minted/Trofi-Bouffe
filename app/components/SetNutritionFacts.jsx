import React, {Component} from "react";
import {connect} from "react-redux";
import capitalizeWords from "capitalizeWords";
import NutritionFactSelector from "NutritionFactSelector";

var renderIngredients = (props) => {
    var key = 0;

    return props.needNF.map((ingredient) => {
        var name = capitalizeWords(ingredient.name);

        return <NutritionFactSelector key={key++} name={name}></NutritionFactSelector>;
    });
};

const SetNutritionFacts = (props) => {
    if (props.needNF.length === 0) {
        return (
            <div className="content-container row">
                <div className="content-list columns medium-10 large-8 small-centered">
                    <h4>Error: No recipe has been selected to set nutrition facts for.</h4>
                </div>
            </div>
        );
    } else {
        return (
            <div className="content-container row">
                <div className="content-list columns medium-10 large-8 small-centered">
                    <h4>These ingredients need nutrition facts (choose the option that fits):</h4>
                    <div id="nutrition-options-div">
                        <div id="nutrition-options">
                            <form>
                                {renderIngredients(props)}
                            </form>
                        </div>
                    </div>
                    <button className="blue-button">SET NUTRITION FACTS</button>
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
