import React from 'react';
import * as emailjs from 'emailjs-com';

import Alert from 'modules/Alerts/Alert/alert.container';

class AlertsList extends React.Component {
  static INTERVAL = 20 * 1000;

  componentDidMount() {
    // init email js
    emailjs.init(process.env.REACT_APP_EMAILJS_API_KEY);

    setInterval(() => {
      this.props.alerts.forEach(alert => this.fetchCurrentPrice(alert));
    }, AlertsList.INTERVAL);
  }

  async fetchCurrentPrice(alert) {
    const data = await fetch(`https://rest.coinapi.io/v1/exchangerate/${alert.currency}/EUR`, {
      headers: {
        'X-CoinAPI-Key': process.env.REACT_APP_API_KEY
      }
    }).then(res => res.json());
    const currentPrice = data.rate;
    console.log(currentPrice, alert);
    const notify =
      alert.comparison === 'increase'
        ? alert.lastPrice && currentPrice > alert.price && alert.lastPrice < alert.price
        : alert.lastPrice && currentPrice < alert.price && alert.lastPrice > alert.price;

    if (notify) {
      this.sendMail(alert);
      console.log('send mail');
    }

    alert.lastPrice = currentPrice;
  }

  sendMail(alert) {
    emailjs
      .send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, {
        currency: alert.currency,
        comparison: alert.comparison === 'increase' ? 'above' : 'below',
        price: alert.price
      })
      .then(() => console.log('success'))
      .catch(err => console.log(err));
  }

  render() {
    const { alerts } = this.props;
    return (
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>
            <Alert
              alert={alert}
              index={index}
              lastAdded={alert.createAt === Math.max[alerts.map(alert => alert.createAt)]}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default AlertsList;
