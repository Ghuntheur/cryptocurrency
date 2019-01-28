import React from 'react';
import { Row, Col } from 'react-grid-system';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      alertBeforeEdition: this.props.alert,
      alertEdited: this.props.alert
    };
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
      <form onSubmit={this.handleSubmit} className="full-width background-grey-light">
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
          <Col xl={4}>compa</Col>
        </Row>
        <button
          type={!this.state.editMode ? 'button' : 'submit'}
          onClick={!this.state.editMode ? this.handleEditMode : this.handleSubmit}>
          {!this.state.editMode ? 'Edit' : 'Save'}
        </button>
        <button type="button" onClick={this.handleDelete}>
          Delete
        </button>
      </form>
    );
  }
}

export default Alert;
