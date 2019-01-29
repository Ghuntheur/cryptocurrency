import React from 'react';
import { Row, Col } from 'react-grid-system';

import './alert.styles.scss';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      alertBeforeEdition: this.props.alert,
      alertEdited: this.props.alert,
      currentPrice: null
    };
  }

  async componentDidMount() {
    if (this.props.lastAdded) {
      const { editAlert } = this.props;
      const data = await fetch(
        `https://rest.coinapi.io/v1/exchangerate/${this.props.alert.currency}/EUR`,
        {
          headers: {
            'X-CoinAPI-Key': process.env.REACT_APP_API_KEY
          }
        }
      ).then(res => res.json());
      const currentPrice = data.rate;
      editAlert(this.props.alert, {
        ...this.props.alert,
        currentPrice
      });
      this.setState({ currentPrice });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        alertBeforeEdition: this.props.alert,
        alertEdited: this.props.alert
      });
    }
  }

  handleEditMode = ev => {
    ev.preventDefault();
    this.setState({
      editMode: !this.state.editMode
    });
  };

  handleDelete = () => {
    const { deleteAlert } = this.props;
    deleteAlert(this.state.alertEdited);
  };

  handleChange = ev => {
    this.setState({
      alertEdited: {
        ...this.state.alertEdited,
        [ev.target.name]: ev.target.value
      }
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { editAlert } = this.props;
    editAlert(this.state.alertBeforeEdition, this.state.alertEdited);
    this.setState({
      editMode: false,
      alertBeforeEdition: this.state.alertEdited
    });
  };

  render() {
    const { currencies } = this.props;

    return (
      <div className="alert full-width background-grey-light padding-top-2">
        <Row justify="between">
          <Col xl={3}>
            <h1 className="padding-left-2">
              Current price :{' '}
              {this.state.currentPrice
                ? `${Number.parseFloat(this.state.currentPrice).toFixed(2)}€`
                : ''}
            </h1>
          </Col>
          <Col xl={9}>
            <Row justify="end" className="padding-right-2">
              <Col xl={1} align="end">
                <img
                  src={`${process.env.PUBLIC_URL}/imgs/edit.svg`}
                  className="img padding-1"
                  alt="edit"
                  onClick={this.handleEditMode}
                />
              </Col>
              <Col xl={1} align="start">
                <img
                  src={`${process.env.PUBLIC_URL}/imgs/trash.svg`}
                  className="img padding-1 trash"
                  alt="delete"
                  onClick={this.handleDelete}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <form onSubmit={this.handleSubmit} className="full-width">
            <Row
              justify="between"
              nogutter
              className="full-width padding-horizontal-3 padding-vertical-4">
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
                      disabled={!this.state.editMode}
                      value={this.state.alertEdited.currency}
                      onChange={this.handleChange}>
                      {currencies.map(currency => (
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
                      value={this.state.alertEdited.price}
                      disabled={!this.state.editMode}
                      onChange={this.handleChange}
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
                    <Row
                      nogutter
                      className={`form-input ${
                        !this.state.editMode ? 'background-grey-light' : ''
                      }`}>
                      <Col xl={6}>
                        <label htmlFor={`${this.props.index}_increase`}>increase</label>
                        <input
                          id={`${this.props.index}_increase`}
                          type="radio"
                          value="increase"
                          name="comparison"
                          onChange={this.handleChange}
                          disabled={!this.state.editMode}
                          defaultChecked={this.state.alertEdited.comparison === 'increase'}
                          required
                        />
                      </Col>
                      <Col xl={6}>
                        <label htmlFor={`${this.props.index}_decrease`}>decrease</label>
                        <input
                          id={`${this.props.index}_decrease`}
                          type="radio"
                          value="decrease"
                          name="comparison"
                          onChange={this.handleChange}
                          disabled={!this.state.editMode}
                          defaultChecked={this.state.alertEdited.comparison === 'decrease'}
                          required
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            {this.state.editMode && (
              <Row justify="center">
                <Col align="center" xl={4} className="full-width">
                  <button
                    type="submit"
                    className="button button--edit padding-vertical-2 margin-bottom-2 full-width">
                    Edit
                  </button>
                </Col>
              </Row>
            )}
          </form>
        </Row>
      </div>
    );
  }
}

export default Alert;
