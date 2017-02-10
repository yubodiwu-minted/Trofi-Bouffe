import React, {Component} from "react";
import {connect} from "react-redux";
import PieChart from "react-simple-pie-chart";

var NutritionPieChart = (props) => {
    return (
        <div className="content-container row">
            <div className="content-list columns medium-10 large-8 small-centered">
                <PieChart slices={[
                    {
                        color: '#f00',
                        value: 10
                    }, {
                        color: '#0f0',
                        value: 20
                    }
                ]}/>
            </div>
        </div>
    );
}

export default connect()(NutritionPieChart);
