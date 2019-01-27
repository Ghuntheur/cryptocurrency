import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AlertAdd from './alertAdd.component';

import * as actions from 'modules/Alerts/alerts.actions';
import { getAlerts } from '../alerts.reducer';

const mapStateToProps = state => getAlerts(state);

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertAdd);
