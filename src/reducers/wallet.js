// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_VALUE = 0;

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: INITIAL_VALUE,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
      currencies: [action.payload.currencies],
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.payload.expenses,
        id: state.expenses.length,
      }],
      totalExpenses: state.totalExpenses + parseFloat(action.payload.expenses.value),
    };
  default:
    return state;
  }
};

export default walletReducer;
