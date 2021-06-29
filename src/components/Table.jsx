import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

// import { FaPencilAlt } from 'react-icons/fa';

import { removeItemAction, setExpenseToEditAction } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);

    this.tableExpense = this.tableExpense.bind(this);
    this.editInfo = this.setExpenseToEdit.bind(this);
  }

  setExpenseToEdit(editId) {
    const { expenses, editItem } = this.props;
    const editObj = expenses.find(({ id }) => id === editId);
    editItem(editObj);
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
        <td>{ (exchangeRates[currency].name).split('/')[0]}</td>
        <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
        <td>
          { (parseFloat(value) * parseFloat(exchangeRates[currency].ask)).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => removeItem(index) }
            className="btn btn-danger"
          >
            x
          </button>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ () => this.setExpenseToEdit(id) }
            className="btn btn-warning"
          >
            Editar
          </button>
        </td>
      </tr>));
  }

  render() {
    return (
      <table className="table table-striped">
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
  editItem: (expense) => dispatch(setExpenseToEditAction(expense)),
});

Table.propTypes = {
  expenses: propTypes.arrayOf(Object).isRequired,
  removeItem: propTypes.func.isRequired,
  editItem: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatcToProps)(Table);
