import React from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import ExpensesForm from '../components/ExpensesForm';
import Table from '../components/Table';

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
            <h3>TrybeWallet</h3>
          </div>
          <div>
            <span data-testid="email-field">{ loggedUserEmail }</span>
            <span>Despesa total: R$</span>
            <span data-testid="total-field">{ this.sum().toFixed(2) }</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
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
