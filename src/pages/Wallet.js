import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <header>
          <div>
            <h3>TrybeWallet</h3>
          </div>
          <div>
            <span data-testid="email-field">email do reducer</span>
            <span data-testid="total-field">Despesa total: R$ 0,00</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>

      </main>
    );
  }
}

export default Wallet;
