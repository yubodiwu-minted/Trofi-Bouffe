import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

var actions = require("actions");

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    async onFormSubmit(event) {
        var {dispatch} = this.props;
        event.preventDefault();

        console.log("form submitted");

        try {
            let response = await axios.post("/users/login", {
                email: this.refs.email.value,
                password: this.refs.password.value
            });

            if (response.data.authenticated) {
                localStorage.setItem("jwt", response.data.jwt);

                window.location.hash = "user/recipes"
            }
        } catch(error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="form-container">
                <div className="medium-6 medium-centered large-4 large-centered columns">
                    <form onSubmit={this.onFormSubmit}>
                        <div className="row column log-in-form">
                            <h4 className="text-center">Log in</h4>
                            <label>Email
                                <input type="text" ref="email" placeholder="somebody@example.com"/>
                            </label>
                            <label>Password
                                <input type="text" ref="password" placeholder="Password"/>
                            </label>
                            <div className="button-holder">
                                <button>
                                    <a type="submit" className="button expanded">Log In</a>
                                </button>
                            </div>
                            <p className="text-center">
                                <a href="#">Forgot your password?</a>
                            </p>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default connect()(LoginForm);
