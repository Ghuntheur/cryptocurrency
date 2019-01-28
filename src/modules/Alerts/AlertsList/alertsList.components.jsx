import React from 'react';
import Alert from 'modules/Alerts/Alert/alert.container';

class AlertsList extends React.Component {
  render() {
    const { alerts } = this.props;
    return (
      <ul>
        {console.log('----------------------')}
        {alerts.map((alert, index) => {
          console.log(alert);
          return (
            <li key={index}>
              <Alert alert={alert} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default AlertsList;
