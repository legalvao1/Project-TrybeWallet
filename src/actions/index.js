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

// SOURCE Plantão com Zambelli
export const saveExpensesAction = (expenses) => async (dispatch) => {
  const response = await fetchURL();
  delete response.USDT;
  expenses.exchangeRates = response;
  dispatch({
    type: 'ADD_EXPENSES',
    payload: {
      expenses,
    },
  });
};

export const fetchCurrencies = () => (dispatch) => {
  fetchURL()
    .then((response) => {
      const responseObject = response;
      // **SOURCE https://igluonline.com/como-remover-uma-propriedade-de-um-objeto-javascript/ Zambelli */
      delete responseObject.USDT;
      dispatch(requestCurrencies(responseObject));
    });
};

export const removeItemAction = (index) => ({
  type: 'REMOVE_ITEM',
  payload: {
    index,
  },
});

export const setExpenseToEditAction = (expenseObject) => ({
  type: 'SET_EDIT_EXPENSE',
  payload: {
    expenseObject,
    bool: true,
  },
});

export const updateExpenseAction = (id, expense) => ({
  type: 'UPDATE_EXPENSE',
  payload: {
    id,
    expense,
    bool: false,
  },
});
