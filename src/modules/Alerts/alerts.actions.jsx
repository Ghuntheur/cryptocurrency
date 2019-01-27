import * as types from './alerts.types';

export const addAlert = alert => ({
  type: types.ADD_ALERT,
  payload: {
    alert
  }
});
