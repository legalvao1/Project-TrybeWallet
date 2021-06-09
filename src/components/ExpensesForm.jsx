import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import { fetchCurrencies as fetchCurrenciesThunk, saveExpensesAction } from '../actions';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.currencyList = this.currencyList.bind(this);
    // this.getCurrentQuote = this.getCurrentQuote.bind(this);

    const { expenses } = this.props;

    this.state = {
      id: expenses.length,
      value: '',
      currency: '',
      payment: '',
      tag: '',
      expenses: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  // getCurrentQuote() {
  //   const { addExpense, fetchCurrencies } = this.props;
  //   return async () => {
  //     const response = await fetchCurrencies();
  //     this.setState({ exchangeRates: response });
  //     addExpense(this.state);
  //   };
  //   // const { addExpense, fetchCurrencies } = this.props;
  //   // const {exchangeRates} = this.state;
  //   // const current = fetchCurrencies();
  //   // this.setState({ exchangeRates: current });
  //   // console.log(current);
  // }

  currencyList() {
    const { currencies } = this.props;
    return currencies.length > 0
      ? Object.entries(currencies[0]).map((currency) => currency[0]) : null;
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  render() {
    const { addExpense } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input id="value" type="text" onChange={ (e) => this.handleChange(e) } />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" onChange={ (e) => this.handleChange(e) }>
            { this.currencyList()
              ? this.currencyList().map((currency, index) => (
                <option key={ index }>{ currency }</option>))
              : null }
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select id="payment" onChange={ (e) => this.handleChange(e) }>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag" onChange={ (e) => this.handleChange(e) }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="expenses">
          Descrição:
          <input
            id="expenses"
            type="text"
            name="descricao-despesa"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <button type="button" onClick={ () => addExpense(this.state) }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
  addExpense: (state) => dispatch(saveExpensesAction(state)),
});

ExpensesForm.propTypes = {
  fetchCurrencies: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(Object).isRequired,
  // addExpense: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(Object).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
