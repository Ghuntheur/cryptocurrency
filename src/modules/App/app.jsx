import React from 'react';
import { Container } from 'react-grid-system';

import Header from 'modules/App/Header/header';
import Email from 'modules/App/Email/email';

import AlertAdd from 'modules/Alerts/AlertAdd/alertAdd.container';

class App extends React.Component {
  render() {
    return (
      <Container className="margin-vertical-4">
        <Header />
        <Email />

        <AlertAdd />
      </Container>
    );
  }
}

export default App;
