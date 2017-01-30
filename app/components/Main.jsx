import React, {Component} from "react";
import Nav from "Nav";

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Nav></Nav>
                <p>This is the main component</p>
            </div>
        );
    }
}
