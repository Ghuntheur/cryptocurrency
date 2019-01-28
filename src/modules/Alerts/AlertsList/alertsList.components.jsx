import React from 'react';
import Alert from 'modules/Alerts/Alert/alert.container';

class AlertsList extends React.Component {
  static INTERVAL = 1 * 1000;

  fetchCurrentPrice(alert) {}

  componentDidMount() {
    setInterval(() => {
      this.props.alerts.forEach(alert => this.fetchCurrentPrice(alert));
    }, AlertsList.INTERVAL);
  }

  render() {
    const { alerts } = this.props;
    return (
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            <Alert alert={alert} index={index} />
          </li>
        ))}
      </ul>
    );
  }
}

export default AlertsList;
