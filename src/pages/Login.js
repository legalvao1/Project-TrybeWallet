import React from 'react';

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
    const { buttonDisabled } = this.state;
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
        <button type="button" disabled={ buttonDisabled }>Entrar</button>
      </main>
    );
  }
}

export default Login;
