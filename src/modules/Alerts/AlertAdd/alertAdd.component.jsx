import React from 'react';
import { Row, Col } from 'react-grid-system';

class AlertAdd extends React.Component {
  static STORAGE_KEY = 'allCurrencies';

  constructor() {
    super();
    this.state = {
      allCurrencies: [],
      alert: {
        currency: 'ETH'
      }
    };
  }

  async componentDidMount() {
    const storage = JSON.parse(localStorage.getItem(AlertAdd.STORAGE_KEY));

    // stock all currencies available in storage to avoid useless requests
    if (storage) {
      this.setState({ allCurrencies: JSON.parse(localStorage.getItem(AlertAdd.STORAGE_KEY)) });
      return;
    }

    // if user doesn't have currencies, get them
    const allCurrencies = await fetch('https://rest.coinapi.io/v1/assets').then(res => res.json());

    // get just 30 currencies for this example
    const allCurrenciesFiltered = allCurrencies.filter(
      (currency, index) => currency.type_is_crypto === 1 && index < 30
    );

    localStorage.setItem(AlertAdd.STORAGE_KEY, JSON.stringify(allCurrenciesFiltered));

    this.setState({ allCurrencies: allCurrenciesFiltered });
  }

  handleChange = ev => {
    this.setState({ alert: { ...this.state.alert, [ev.target.name]: ev.target.value } });
  };

  handleSubmit = ev => {
    ev.preventDefault();

    const { addAlert } = this.props;
    const { alert } = this.state;

    addAlert(alert);
  };

  render() {
    return (
      <Row>
        <Col>
          <form onSubmit={this.handleSubmit}>
            <select name="currency" value={this.state.alert.currency} onChange={this.handleChange}>
              {this.state.allCurrencies.map(currency => (
                <option key={currency.asset_id} value={currency.asset_id}>
                  {currency.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              name="price"
              placeholder="price"
              onChange={this.handleChange}
            />
            <button type="submit">Add</button>
          </form>
        </Col>
      </Row>
    );
  }
}

export default AlertAdd;
