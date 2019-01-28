import React from 'react';
import { Row, Col } from 'react-grid-system';

import './header.styles.scss';

const Header = () => (
  <Row justify="center" className="margin-vertical-6">
    <Col align="center">
      <h1 className="title">Cryptocurrency Tracker</h1>
    </Col>
  </Row>
);

export default Header;
