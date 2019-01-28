import React from 'react';

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { currencies, alert } = this.props;
    console.log(currencies, alert);
    return <h1>ok</h1>;
  }
}

export default Alert;
