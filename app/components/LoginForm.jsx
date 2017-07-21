import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const actions = require('actions');

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.passwordChange = this.passwordChange.bind(this);

    this.state = {
      email: '',
      password: '',
      logInSuccessful: true,
    };
  }

  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  passwordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    const { dispatch } = this.props;
    event.preventDefault();

    try {
      const response = await axios.post('/users/login', {
        email: this.state.email,
        password: this.state.password,
      });

      if (response.data.authenticated) {
        localStorage.setItem('jwt', response.data.jwt);
        dispatch(actions.logIn());

        window.location.hash = 'user/recipes';
      } else {
        this.setState({ logInSuccessful: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

  renderLogInError() {
    if (!this.state.logInSuccessful) {
      return <p className="authenticate-error">Wrong email/password.</p>;
    }

    return null;
  }

  render() {
    return (
      <div className="form-container">
        <div className="medium-6 medium-centered large-4 large-centered columns">
          <form onSubmit={this.handleSubmit}>
            <div className="row column log-in-form">
              <h4 className="text-center">Log in</h4>
              <label htmlFor="email">Email
                <input
                  placeholder="somebody@example.com"
                  type="email"
                  value={this.state.email}
                  onChange={this.emailChange}
                  required
                />
              </label>
              <label className="below-email-field" htmlFor="password">Password
                <input
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.passwordChange}
                  required
                />
              </label>
              <div className="authentication-error-holder">
                {this.renderLogInError()}
              </div>
              <div className="button-holder">
                <button>
                  <a type="submit" className="button expanded">Log In</a>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(LoginForm);
