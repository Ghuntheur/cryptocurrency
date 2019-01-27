import React from 'react';
import { Row, Col } from 'react-grid-system';

import './alertAdd.styles.scss';

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
      <form onSubmit={this.handleSubmit} className="add-alert full-width background-grey-light">
        <Row justify="between" nogutter className="padding-horizontal-3 padding-vertical-4">
          <Col xl={4} className="form-group">
            <Row nogutter>
              <Col xl={10}>
                <label htmlFor="currency" className="form-label">
                  Currency
                </label>
                <select
                  id="currency"
                  className="form-input full-width"
                  name="currency"
                  value={this.state.alert.currency}
                  onChange={this.handleChange}>
                  {this.state.allCurrencies.map(currency => (
                    <option key={currency.asset_id} value={currency.asset_id}>
                      {currency.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </Col>
          <Col xl={4} className="form-group">
            <Row nogutter>
              <Col xl={10}>
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  min={0}
                  name="price"
                  placeholder="price"
                  className="full-width form-input"
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
          </Col>
          <Col xl={4}>compa</Col>
        </Row>
        <Row justify="center">
          <Col align="center">
            <button type="submit">Add</button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default AlertAdd;
