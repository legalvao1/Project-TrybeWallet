import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import { fetchCurrencies as fetchCurrenciesThunk, saveExpensesAction } from '../actions';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.currencyList = this.currencyList.bind(this);
    this.sendAddExpense = this.sendAddExpense.bind(this);
    this.editItem = this.editItem.bind(this);

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

  currencyList() {
    const { currencies } = this.props;
    return currencies.length > 0
      ? Object.entries(currencies[0]).map((currency) => currency[0]) : null;
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  sendAddExpense() {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(prevState);
    const { editExpense } = this.props;
    if (editExpense !== prevProps.editExpense) {
      this.editItem(editExpense);
    }
  }

  editItem(expense) {
    const {
      value, currency, method, tag, description, exchangeRates,
    } = expense;
    this.setState({
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input id="value" value={ value } type="text" onChange={ (e) => this.handleChange(e) } />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" value={ currency } onChange={ (e) => this.handleChange(e) }>
            { this.currencyList()
              ? this.currencyList().map((currencyItem, index) => (
                <option key={ index }>{ currencyItem }</option>))
              : null }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select id="method" value={ method } onChange={ (e) => this.handleChange(e) }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag" value={ tag } onChange={ (e) => this.handleChange(e) }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            value={ description }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <button type="button" onClick={ () => this.sendAddExpense() }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses.length,
  editExpense: state.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
  addExpense: (state) => dispatch(saveExpensesAction(state)),
});

ExpensesForm.propTypes = {
  fetchCurrencies: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(Object).isRequired,
  addExpense: propTypes.func.isRequired,
  editExpense: propTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
