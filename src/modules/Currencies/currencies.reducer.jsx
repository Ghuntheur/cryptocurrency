import * as types from './currencies.types';
import { initialCurrenciesState } from './currencies.states';

const currenciesReducer = (state = initialCurrenciesState, action) => {
  switch (action.type) {
    case types.ADD_CURRENCIES:
      const { currencies } = action.payload;
      return {
        currencies: currencies
      };

    default:
      return state;
  }
};

export default currenciesReducer;

export const getCurrencies = state => state.currenciesReducer;
