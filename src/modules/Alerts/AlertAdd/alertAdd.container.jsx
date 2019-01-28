import { connect } from 'react-redux';
import AlertAdd from './alertAdd.component';

import * as alertsActions from 'modules/Alerts/alerts.actions';
import * as currenciesActions from 'modules/Currencies/currencies.actions';

const mapDispatchToProps = dispatch => ({
  addAlert: alert => dispatch(alertsActions.addAlert(alert)),
  addCurrencies: currencies => dispatch(currenciesActions.addCurrencies(currencies))
});

export default connect(
  null,
  mapDispatchToProps
)(AlertAdd);
