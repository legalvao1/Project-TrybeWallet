import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import { removeItemAction } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);

    this.tableExpense = this.tableExpense.bind(this);
  }

  tableExpense() {
    const { expenses, removeItem } = this.props;
    return expenses.map((
      { value, currency, method, tag, description, exchangeRates, id }, index,
    ) => (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>
          { (parseFloat(value) * parseFloat(exchangeRates[currency].ask)).toFixed(2) }
        </td>
        <td>Real</td>
        <th>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => removeItem(index) }
          >
            x
          </button>
        </th>
      </tr>));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
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

const mapDispatcToProps = (dispatch) => ({
  removeItem: (index) => dispatch(removeItemAction(index)),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(Object).isRequired,
  removeItem: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatcToProps)(Table);
