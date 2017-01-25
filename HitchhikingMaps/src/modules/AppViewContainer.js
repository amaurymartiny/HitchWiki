import { connect } from 'react-redux';
import AppView from './AppView';

const mapStateToProps = state => ({
  isReady: state.getIn(['session', 'isReady']),
});

export default connect(mapStateToProps)(AppView);
