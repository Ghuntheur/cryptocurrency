import React from 'react';
import { Row, Col } from 'react-grid-system';

import './email.styles.scss';

class Email extends React.Component {
  static STORAGE_KEY = 'email';

  constructor() {
    super();
    this.state = {
      email: localStorage.getItem(Email.STORAGE_KEY) || ''
    };
  }

  handleChange = ev => {
    this.setState({
      email: ev.target.value
    });
  };

  handleBlur = () => {
    localStorage.setItem(Email.STORAGE_KEY, this.state.email);
  };

  render() {
    return (
      <Row
        justify="center"
        className="email background-grey-light padding-1 margin-vertical-4"
        nogutter>
        <Col xl={6}>
          <form>
            <Row justify="start">
              <Col xl={12} className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input full-width"
                  onBlur={this.handleBlur}
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    );
  }
}

export default Email;
