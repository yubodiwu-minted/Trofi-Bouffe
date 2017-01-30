import React, {Component} from "react";
import axios from "axios";
// import {Fieldset, Field, createValue} from "react-forms";
// import JoiForm from "react-joi-forms";

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();

        if (this.refs.password.value === this.refs.confirmPassword.value) {
            axios.post("/users", {
                firstName: this.refs.firstName.value,
                lastName: this.refs.lastName.value,
                email: this.refs.email.value,
                username: this.refs.username.value,
                password: this.refs.password.value
            })
            .then((response) => {
                console.log("post was made from client-side");
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    // TODO
    // hide passwords
    // validate everything
    // show password option
    // forgot password option
    render() {
        return (
            <div className="form-container">
                <div className="medium-6 medium-centered large-4 large-centered columns">
                    <form onSubmit={this.onFormSubmit}>
                        <div className="row column log-in-form">
                            <h4 className="text-center">Sign Up to Make Recipes!</h4>
                            <label>First Name
                                <input type="text" ref="firstName" placeholder="First name"/>
                            </label>
                            <label>Last Name
                                <input type="text" ref="lastName" placeholder="Last name"/>
                            </label>
                            <label>Email
                                <input type="text" ref="email" placeholder="somebody@example.com"/>
                            </label>
                            <label>Username
                                <input type="text" ref="username" placeholder="Username"/>
                            </label>
                            <label>Password
                                <input type="text" ref="password" placeholder="Password"/>
                            </label>
                            <label>Confirm Password
                                <input type="text" ref="confirmPassword" placeholder="Password"/>
                            </label>
                            <input id="show-password" type="checkbox"/>
                            <label htmlFor="show-password">Show password</label>
                            <div className="button-holder">
                                <button>
                                    <a type="submit" className="button expanded">Sign Up</a>
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
