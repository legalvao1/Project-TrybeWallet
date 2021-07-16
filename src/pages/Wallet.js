import React from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import ExpensesForm from '../components/ExpensesForm';
import Table from '../components/Table';

import money from '../images/bolsa-de-dinheiro.png';
import email from '../images/o-email.png';

class Wallet extends React.Component {
  constructor() {
    super();

    this.sum = this.sum.bind(this);
  }

  // Plantão Zambelli
  sum() {
    const { expenses } = this.props;
    let INITIAL_VALUE = 0;

    expenses.forEach(({ value, currency, exchangeRates }) => {
      INITIAL_VALUE += parseFloat(value) * parseFloat(exchangeRates[currency].ask);
    });

    return INITIAL_VALUE;
  }

  render() {
    const { loggedUserEmail } = this.props;
    return (
      <main>
        <header>
          <div>
            <h2 className="title">Trybe Wallet</h2>
            <hr className="colorgraph" />
          </div>
          <div className="wallet-container">
            <div className="wallet-email">
              <img src={ email } width="30px" alt="email-icon" />
              <span data-testid="email-field">{ loggedUserEmail }</span>
            </div>
            <div className="wallet-currency">
              <img src={ money } width="30px" alt="email-icon" />
              <span data-testid="total-field">
                R$
                { this.sum().toFixed(2) }
              </span>
              <span data-testid="header-currency-field">BRL</span>
            </div>
          </div>
          <hr className="colorgraph" />
        </header>
        <ExpensesForm />
        <Table />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedUserEmail: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  loggedUserEmail: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
