import React, {Component} from "react";

export default (props) => {
    console.log(props.img);
    return (
        <div className="recipe">
            <img src={props.img} alt=""/>
            <div className="recipe-info">
                <h3>
                    {props.name}
                </h3>
                <p>
                    Calories: 500
                </p>
                <p>
                    Servings: 4
                </p>
            </div>
        </div>
    );
}
