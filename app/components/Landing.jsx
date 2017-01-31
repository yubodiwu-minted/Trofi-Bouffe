import React, {Component} from "react";
import {Link} from "react-router";

export default() => {
    return (
        <div className="entrance-container">
            <div className="entrance-div">
                <div className="button-container">
                    <div>
                        <Link to="/login">
                            <button id="sign-in">Sign In</button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/user/new">
                            <button id="sign-up">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
