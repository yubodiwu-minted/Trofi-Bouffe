import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import {capitalizeWords, replaceSpacesWithUnderscores} from "helperFunctions";
import {createOptions, renderOptions} from "setNFFormHelpers";
import SetNutritionFactsError from "SetNutritionFactsError";

const APPID = "57583012";
const APPKEY = "680b07dfde35ff433dadae06d1571c4c";

class SetNutritionFacts extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        for (let obj of this.props.needNF) {
            this.state[replaceSpacesWithUnderscores(obj.name)] = [];
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentWillMount() {
        var stateChanges = await createOptions(this.props.needNF);

        this.setState(stateChanges);
    }

    renderIngredients() {
        var key = 0;
        var selectors = [];

        return this.props.needNF.map((obj) => {
            var name = obj.name;

            return (
                <label key={key++}>{name}
                    <select id={obj.id} ref={replaceSpacesWithUnderscores(name)}>
                        {renderOptions(this.state[replaceSpacesWithUnderscores(name)])}
                    </select>
                </label>
            );
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.refs);
        debugger;
    }

    render() {
        if (this.props.needNF.length === 0) {
            return <SetNutritionFactsError></SetNutritionFactsError>
        }

        return (
            <div className="content-container row">
                <div className="content-list columns medium-10 large-8 small-centered">
                    <h4>These ingredients need nutrition facts (choose the option that fits):</h4>
                    <div id="nutrition-options-div">
                        <div id="nutrition-options">
                            <form id="set-nutrition-facts" action="/nutrition-facts" method="POST" onSubmit={this.handleSubmit}>
                                {this.renderIngredients()}
                                <button type="submit" form="set-nutrition-facts" className="blue-button">SET NUTRITION FACTS</button>
                            </form>
                        </div>
                    </div>
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
