import * as types from './alerts.types';
import { initialAlertsState } from './alerts.states';

const alertsReducer = (state = initialAlertsState, action) => {
  switch (action.type) {
    case types.ADD_ALERT:
      state.alerts.push(action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};

export default alertsReducer;

export const getAlerts = state => state.alertsReducer;
