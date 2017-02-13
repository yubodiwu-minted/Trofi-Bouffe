import React, {Component} from "react";
import axios from "axios";

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userAlreadyExists: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    renderRegisterError() {
        if (this.state.userAlreadyExists) {
            return <p className="authenticate-error">Email is already taken.</p>;
        }
    }

    async onFormSubmit(event) {
        event.preventDefault();

        if (this.refs.password.value === this.refs.confirmPassword.value) {
            try {
                var response = await axios.post("/users", {
                    firstName: this.refs.firstName.value,
                    lastName: this.refs.lastName.value,
                    email: this.refs.email.value,
                    username: this.refs.username.value,
                    password: this.refs.password.value
                });

                if (response.data !== "user already exists") {
                    localStorage.setItem("jwt", response.data.jwt);

                    window.location.hash = "user/recipes";
                } else {
                    this.setState({userAlreadyExists: true});
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    render() {
        return (
            <div className="form-container">
                <div className="medium-6 medium-centered large-4 large-centered columns">
                    <form onSubmit={this.onFormSubmit}>
                        <div className="row column log-in-form">
                            <h4 className="text-center">Sign Up!</h4>
                            <label>First Name
                                <input type="text" ref="firstName" placeholder="First name"/>
                            </label>
                            <label>Last Name
                                <input type="text" ref="lastName" placeholder="Last name"/>
                            </label>
                            <label>Email
                                <input ref="email" placeholder="somebody@example.com" type="email" required/>
                            </label>
                            <div className="authenticate-error-holder">
                                {this.renderRegisterError()}
                            </div>
                            <label>Username
                                <input type="text" ref="username" placeholder="Username" required/>
                            </label>
                            <label>Password
                                <input ref="password" placeholder="Password" type="password" required/>
                            </label>
                            <label>Confirm Password
                                <input ref="confirmPassword" placeholder="Password" type="password" required/>
                            </label>
                            <div className="button-holder">
                                <button>
                                    <a type="submit" className="button expanded">Sign Up</a>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
