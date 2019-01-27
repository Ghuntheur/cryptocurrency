import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AlertAdd from './alertAdd.component';

import * as actions from 'modules/Alerts/alerts.actions';

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(AlertAdd);
