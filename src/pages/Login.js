import React from 'react';

import { connect } from 'react-redux';

import propTypes from 'prop-types';

import userLoginAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableButton();
  }

  enableButton() {
    const { email, password } = this.state;
    const passwordMinimunLength = 5;
    // **SOURCE https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail */
    const validEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const enable = validEmail.test(email) && password.length >= passwordMinimunLength;
    this.setState({ buttonDisabled: !enable });
  }

  render() {
    const { buttonDisabled, email } = this.state;
    const { userLogin } = this.props;
    return (
      <main>
        <h1>Login</h1>
        <input
          data-testid="email-input"
          name="email"
          placeholder="Digite seu e-mail"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          data-testid="password-input"
          name="password"
          placeholder="Digite sua senha"
          onChange={ (event) => this.handleChange(event) }
        />
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ () => userLogin(email) }
        >
          Entrar
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(userLoginAction(email)),
});

Login.propTypes = {
  userLogin: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
