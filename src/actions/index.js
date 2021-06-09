// Coloque aqui suas actions
import fetchURL from '../services';

export const userLoginAction = (email) => ({
  type: 'LOGAR',
  payload: {
    email,
  },
});

export const requestCurrencies = (currencies) => ({
  type: 'REQUEST_CURRENCIES',
  payload: {
    currencies,
  },
});

export const fetchCurrencies = () => (dispatch) => {
  fetchURL()
    .then((currenciesObject) => dispatch(
      requestCurrencies(currenciesObject),
    ));
};
