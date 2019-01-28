import * as types from './alerts.types';
import { initialAlertsState } from './alerts.states';

const alertsReducer = (state = initialAlertsState, action) => {
  switch (action.type) {
    case types.ADD_ALERT:
      const { alert } = action.payload;

      return {
        alerts: [...state.alerts, alert]
      };

    case types.EDIT_ALERT:
      const index = state.alerts.findIndex(
        alert => action.payload.alertEdited.createdAt === alert.createdAt
      );
      state.alerts[index] = action.payload.alertEdited;
      return {
        alerts: state.alerts
      };

    case types.DELETE_ALERT:
      return {
        alerts: state.alerts.filter(alert => alert !== action.payload.alert)
      };

    default:
      return state;
  }
};

export default alertsReducer;

export const getAlerts = state => state.alertsReducer;
