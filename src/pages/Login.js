import React from 'react';

import { connect } from 'react-redux';

import propTypes from 'prop-types';

import { userLoginAction } from '../actions';

import currencies from '../images/currencies.png';

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

  redirectToPath() {
    const { email } = this.state;
    const { userLogin, history } = this.props;
    userLogin(email);
    // **SOURCE https://qastack.com.br/programming/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router */
    history.push('/carteira');
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div className="container">
        <div className="row" style={ { 'margin-top': '20px' } }>
          <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
            <h2>Welcome to TrybeWallet!</h2>
            <form>
              <div><img src={ currencies } width="120px" alt="currency-icon" /></div>
              <fieldset>
                <h3>Please Sign In</h3>
                <hr class="colorgraph" />
                <div className="form-group">
                  <input
                    data-testid="email-input"
                    name="email"
                    placeholder="Digite seu e-mail"
                    onChange={ (event) => this.handleChange(event) }
                    className="form-control input-lg" 
                  />
                </div>
                <div className="form-group">
                  <input
                    data-testid="password-input"
                    name="password"
                    placeholder="Digite sua senha"
                    onChange={ (event) => this.handleChange(event) }
                    className="form-control input-lg" 
                  />
                </div>
                <hr className="colorgraph" />
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <button
                      type="button"
                      disabled={ buttonDisabled }
                      onClick={ () => this.redirectToPath() }
                      className="btn btn-lg btn-success btn-block"
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(userLoginAction(email)),
});

Login.propTypes = {
  userLogin: propTypes.func.isRequired,
  history: propTypes.objectOf(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
