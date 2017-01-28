import { connect } from 'react-redux';
import AppView from './AppView';

const mapStateToProps = state => ({
  isReady: state.session.isReady,
});

export default connect(mapStateToProps)(AppView);
