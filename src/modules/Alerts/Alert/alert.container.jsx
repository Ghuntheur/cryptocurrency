import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from './alert.component';

import { getCurrencies } from 'modules/Currencies/currencies.reducer';

import * as actions from 'modules/Alerts/alerts.actions';

const mapStateToProps = state => getCurrencies(state);

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert);
