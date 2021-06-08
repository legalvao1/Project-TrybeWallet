import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <main>
        <h1>Login</h1>
        <input data-testid="email-input" placeholder="Digite seu e-mail" />
        <input data-testid="password-input" placeholder="Digite sua senha" />
        <button type="button" disabled>Entrar</button>
      </main>
    );
  }
}

export default Login;
