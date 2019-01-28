import { combineReducers } from 'redux';

import alertsReducer from 'modules/Alerts/alerts.reducer';
import currenciesReducer from 'modules/Currencies/currencies.reducer';

export const rootReducer = combineReducers({
  alertsReducer,
  currenciesReducer
});
