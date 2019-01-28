import * as types from './alerts.types';
import { initialAlertsState } from './alerts.states';
import AlertAdd from './AlertAdd/alertAdd.component';

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
      localStorage.setItem(AlertAdd.ALERTS_STORAGE_KEY, JSON.stringify(state.alerts));
      return {
        alerts: state.alerts
      };

    case types.DELETE_ALERT:
      const alertsFiltered = state.alerts.filter(alert => alert !== action.payload.alert);
      localStorage.setItem(AlertAdd.ALERTS_STORAGE_KEY, JSON.stringify(alertsFiltered));
      return {
        alerts: alertsFiltered
      };

    default:
      return state;
  }
};

export default alertsReducer;

export const getAlerts = state => state.alertsReducer;
