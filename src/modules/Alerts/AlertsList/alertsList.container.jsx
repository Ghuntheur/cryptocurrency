import { connect } from 'react-redux';
import AlertsList from './alertsList.components';

import { getAlerts } from 'modules/Alerts/alerts.reducer';

const mapStateToProps = state => getAlerts(state);

export default connect(mapStateToProps)(AlertsList);
