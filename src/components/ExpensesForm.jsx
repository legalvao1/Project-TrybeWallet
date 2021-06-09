import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';

import { fetchCurrencies as fetchCurrenciesThunk } from '../actions';

class ExpensesForm extends Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
