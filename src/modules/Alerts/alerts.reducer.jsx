import * as types from './alerts.types';
import { initialAlertsState } from './alerts.states';

const alertsReducer = (state = initialAlertsState, action) => {
  switch (action.type) {
    case types.ADD_ALERT:
      const { alert } = action.payload;
      state.alerts.push(alert);
      return {
        alerts: [...new Set(state.alerts)]
      };

    case types.EDIT_ALERT:
      return {};

    case types.DELETE_ALERT:
      return {};

    default:
      return state;
  }
};

export default alertsReducer;

export const getAlerts = state => state.alertsReducer;
