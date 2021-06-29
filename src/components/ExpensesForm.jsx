import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import { fetchCurrencies as fetchCurrenciesThunk,
  saveExpensesAction, updateExpenseAction } from '../actions';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.currencyList = this.currencyList.bind(this);
    this.sendAddExpense = this.sendAddExpense.bind(this);
    this.editItem = this.editItem.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  componentDidUpdate(prevProps) {
    const { editExpense } = this.props;
    // console.log(editExpense);
    // console.log(prevProps.editExpense);
    if (prevProps.editExpense !== editExpense) {
      this.editItem(editExpense[0]);
    }
  }

  currencyList() {
    const { currencies } = this.props;
    return currencies.length > 0
      ? Object.entries(currencies[0]).map((currency) => currency[0]) : null;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }
  // ** EDITAR SOURCE https://www.youtube.com/watch?v=AbZ2EErDSXU */

  sendAddExpense() {
    const { addExpense, editExpense, updateExpense, editState } = this.props;
    if (editExpense && editState) {
      updateExpense(editExpense[0].id, this.state);
    } else {
      addExpense(this.state);
    }
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    });
  }

  editItem(expense) {
    this.setState(expense);
  }

  renderCurrencies(currency) {
    return (
      <label htmlFor="currency" className="form-label">
        Moeda:
        <select
          name="currency"
          value={ currency }
          onChange={ (e) => this.handleChange(e) }
          data-testid="currency-input"
          className="form-select"
        >
          { this.currencyList()
            ? this.currencyList().map((currencyItem, index) => (
              <option key={ index }>{ currencyItem }</option>))
            : null }
        </select>
      </label>
    );
  }

  renderMethod(method) {
    return (
      <label htmlFor="method" className="form-label">
        Método de pagamento:
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ (e) => this.handleChange(e) }
          className="form-select form-select-lg mb-3"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag(tag) {
    return (
      <label htmlFor="tag" className="form-label">
        Tag:
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ (e) => this.handleChange(e) }
          className="form-select"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { editState } = this.props;
    return (
      <form className="mb-3">
        <label htmlFor="value">
          Valor:
          <input
            name="value"
            data-testid="value-input"
            value={ value }
            type="text"
            onChange={ (e) => this.handleChange(e) }
            className="form-control"
          />
        </label>

        {this.renderCurrencies(currency)}

        {this.renderMethod(method)}

        {this.renderTag(tag)}

        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            data-testid="description-input"
            type="text"
            value={ description }
            onChange={ (e) => this.handleChange(e) }
            className="form-control"
          />
        </label>
        <button type="button" onClick={ () => this.sendAddExpense() } className="btn btn-success">
          {editState ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editExpense: state.wallet.editExpense,
  editState: state.wallet.editState,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
  addExpense: (state) => dispatch(saveExpensesAction(state)),
  updateExpense: (id, state) => dispatch(updateExpenseAction(id, state)),
});

ExpensesForm.propTypes = {
  fetchCurrencies: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(Object).isRequired,
  addExpense: propTypes.func.isRequired,
  editExpense: propTypes.arrayOf(Object).isRequired,
  updateExpense: propTypes.func.isRequired,
  editState: propTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
