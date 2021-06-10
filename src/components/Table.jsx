import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

class Table extends Component {
  constructor(props) {
    super(props);

    this.tableExpense = this.tableExpense.bind(this);
  }

  tableExpense() {
    const { expenses } = this.props;
    console.log(expenses);
    return expenses.map((
      { value, currency, method, tag, description, exchangeRates, id },
    ) => (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ exchangeRates[currency].ask }</td>
        <td>{ currency }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ parseFloat(value) * parseFloat(exchangeRates[currency].ask) }</td>
        <td>Real Brasileiro</td>
      </tr>));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento,</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.tableExpense()}
        </tbody>
      </table>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Table);
