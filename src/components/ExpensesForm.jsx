import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import { fetchCurrencies as fetchCurrenciesThunk } from '../actions';

class ExpensesForm extends Component {
  constructor() {
    super();

    this.currencyList = this.currencyList.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  currencyList() {
    const { currencies } = this.props;
    const moedas = currencies.length > 0
      ? Object.entries(currencies[0]).map((currency) => currency[0]) : null;
    const currencyListWithoutUSDT = moedas
      ? moedas.filter((moeda) => moeda !== 'USDT') : null;
    return currencyListWithoutUSDT;
  }

  render() {
    return (
      <form action="">
        <label htmlFor="valor">
          Valor:
          <input type="text" name="valor" />
        </label>

        <label htmlFor="moeda">
          Moeda:
          <select>
            { this.currencyList()
              ? this.currencyList().map((currency, index) => (
                <option key={ index }>{ currency }</option>))
              : null }
          </select>
        </label>
        <label htmlFor="metodo-pagamento">
          Método de pagamento:
          <select>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select>
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>

        <label htmlFor="descricao-despesa">
          Descrição:
          <input type="text" name="descricao-despesa" />
        </label>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
});

ExpensesForm.propTypes = {
  fetchCurrencies: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
