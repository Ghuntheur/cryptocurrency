import * as types from './alerts.types';

export const addAlert = alert => ({
  type: types.ADD_ALERT,
  payload: {
    alert
  }
});

export const editAlert = (alertBeforeEdition, alertEdited) => ({
  type: types.EDIT_ALERT,
  payload: {
    alertBeforeEdition,
    alertEdited
  }
});

export const deleteAlert = alert => ({
  type: types.DELETE_ALERT,
  payload: {
    alert
  }
});
