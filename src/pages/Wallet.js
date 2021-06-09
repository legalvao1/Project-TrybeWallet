import React from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

class Wallet extends React.Component {
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
            <span data-testid="total-field">Despesa total: R$ 0,00</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>

      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedUserEmail: state.user.email,
});

Wallet.propTypes = {
  loggedUserEmail: propTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
