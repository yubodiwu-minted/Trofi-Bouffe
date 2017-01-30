import React, {Component} from "react";
import Nav from "Nav";

export default (props) => {
    return (
        <div>
            <Nav></Nav>
            <div className="main-children">
                {props.children}
            </div>
        </div>
    );
}
