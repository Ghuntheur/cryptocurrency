import React from 'react';
import { Container } from 'react-grid-system';

import Header from 'components/Header/header';
import Email from 'components/Email/email';

class App extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Email />
      </Container>
    );
  }
}

export default App;
