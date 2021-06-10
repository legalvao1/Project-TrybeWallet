import React from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  constructor() {
    super();

    this.sum = this.sum.bind(this);
  }

  sum() {
    const { totalExpenses } = this.props;
    const INITIAL_VALUE = 0;
    return !totalExpenses ? INITIAL_VALUE : totalExpenses;
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
            <span data-testid="total-field">{ this.sum() }</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <ExpensesForm />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedUserEmail: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

Wallet.propTypes = {
  loggedUserEmail: propTypes.string.isRequired,
  totalExpenses: propTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
