import React from 'react';

const AlertsList = ({ alerts }) => (
  <ul>
    {alerts.map((alert, index) => (
      <li key={index}>
        <div>
          <h1>
            {alert.currency} - {alert.price}
          </h1>
        </div>
      </li>
    ))}
  </ul>
);

export default AlertsList;
