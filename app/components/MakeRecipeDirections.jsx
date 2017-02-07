import React, {Component} from "react";
import {connect} from "react-redux";

var renderDirections = (props) => {
    var key = 0;

    return props.directions.map((direction) => {
        return (
            <p className="direction" key={key++}>
                {direction.step_number}. {direction.step_content}
            </p>
        );
    })
}

const MakeRecipeDirections = (props) => {
    return (
        <div className="recipe-directions-div columns large-10">
            <h5>DIRECTIONS</h5>
            <div className="recipe-div-innermost">
                {renderDirections(props)}
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        directions: state.directions
    };
})(MakeRecipeDirections);
