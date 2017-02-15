import React, {Component} from "react";
import Loading from "react-loading";

export default (props) => {
    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <h3>Loading nutrition fact options...</h3>
                <Loading type="spin" color="#A2D1CF"></Loading>;
            </div>
        </div>
    );
}
