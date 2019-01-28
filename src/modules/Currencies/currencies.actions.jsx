import * as types from './currencies.types';

export const addCurrencies = currencies => ({
  type: types.ADD_CURRENCIES,
  payload: {
    currencies
  }
});
