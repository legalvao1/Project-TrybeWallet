// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpense: [],
  editState: false,
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
    };
  // **SOURCE https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-remove-an-item-from-an-array/301447 */
  case 'REMOVE_ITEM':
    return {
      ...state,
      expenses: [
        ...state.expenses.slice(0, action.payload.index),
        ...state.expenses.slice(action.payload.index + 1, state.expenses.length),
      ],
    };
  case 'SET_EDIT_EXPENSE':
    return {
      ...state,
      editExpense: [action.payload.expenseObject],
      editState: action.payload.bool,
    };
  case 'UPDATE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.map((expense) => (
        (expense.id === action.payload.id) ? action.payload.expense : expense)),
      editState: action.payload.bool,
    };
  default:
    return state;
  }
};

export default walletReducer;
