import React from 'react';
import { Row, Col } from 'react-grid-system';

import './alertAdd.styles.scss';

class AlertAdd extends React.Component {
  static CURRENCIES_STORAGE_KEY = 'allCurrencies';

  form;

  constructor() {
    super();
    this.state = {
      allCurrencies: [],
      alert: {
        currency: 'BTC',
        comparison: 'increase'
      }
    };
  }

  async componentDidMount() {
    const storage = JSON.parse(localStorage.getItem(AlertAdd.CURRENCIES_STORAGE_KEY));
    const { addCurrencies } = this.props;

    // stock all currencies available in storage to avoid useless requests
    if (storage) {
      this.setState({ allCurrencies: storage });
      addCurrencies(storage);
      return;
    }

    // if user doesn't have currencies, get them
    const allCurrencies = await fetch('https://rest.coinapi.io/v1/assets').then(res => res.json());

    // get just 30 currencies for this example
    const allCurrenciesFiltered = allCurrencies.filter(
      (currency, index) => currency.type_is_crypto === 1 && index < 30
    );

    localStorage.setItem(AlertAdd.CURRENCIES_STORAGE_KEY, JSON.stringify(allCurrenciesFiltered));

    this.setState({ allCurrencies: allCurrenciesFiltered });
    addCurrencies(allCurrenciesFiltered);
  }

  handleChange = ev => {
    this.setState({ alert: { ...this.state.alert, [ev.target.name]: ev.target.value } });
  };

  handleSubmit = ev => {
    ev.preventDefault();

    const { addAlert } = this.props;
    const { alert } = this.state;

    const newAlert = { ...alert, createdAt: Date.now() };

    addAlert(newAlert);

    this.form.reset();
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        ref={el => (this.form = el)}
        className="add-alert full-width background-grey-light">
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
                  onChange={this.handleChange}
                  required>
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
                  step={0.01}
                  min={0}
                  name="price"
                  placeholder="price"
                  className="full-width form-input"
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </Row>
          </Col>
          <Col xl={4} className="form-group">
            <Row nogutter>
              <Col xl={10}>
                <label htmlFor="comparison" className="form-label">
                  Comparison
                </label>
                <Row nogutter className="form-input">
                  <Col xl={6}>
                    <label htmlFor="increase">increase</label>
                    <input
                      id="increase"
                      type="radio"
                      value="increase"
                      name="comparison"
                      onChange={this.handleChange}
                      checked={this.state.alert.comparison === 'increase'}
                      required
                    />
                  </Col>
                  <Col xl={6}>
                    <label htmlFor="decrease">decrease</label>
                    <input
                      id="decrease"
                      type="radio"
                      value="decrease"
                      name="comparison"
                      onChange={this.handleChange}
                      required
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          <Col align="center" xl={4}>
            <button
              className="button button--add padding-vertical-2 margin-bottom-2 full-width"
              type="submit">
              Add
            </button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default AlertAdd;
