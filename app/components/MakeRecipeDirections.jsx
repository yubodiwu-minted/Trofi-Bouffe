import React, {Component} from "react";
import {connect} from "react-redux";

import {renderDirections} from "MakeRecipeHelper";

var MakeRecipeDirections = (props) => {
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
