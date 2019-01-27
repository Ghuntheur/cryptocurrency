import React from 'react';
import Alert from 'modules/Alerts/Alert/alert.container';

const AlertsList = ({ alerts }) => (
  <ul>
    {alerts.map((alert, index) => (
      <li key={index}>
        <Alert alert={alert} />
      </li>
    ))}
  </ul>
);

export default AlertsList;
