import React, {Component} from "react";
import axios from "axios";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();

        axios.post("/users/login", {
            email: this.refs.email.value,
            password: this.refs.password.value
        })
        .then((response) => {
            if (response.data.authenticated) {
                localStorage.setItem("id_token", response.data.id);
            }
        })
        .catch((error) => {
            console.log(error);
        })
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
