import React from 'react';

class Alert extends React.Component {
  handleDelete = () => {
    const { alert, deleteAlert } = this.props;
    deleteAlert(alert);
  };

  render() {
    const { currency, price } = this.props.alert;
    return (
      <div>
        <h1>
          {currency} - {price}
        </h1>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

export default Alert;
