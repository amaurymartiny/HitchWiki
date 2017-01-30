import { connect } from 'react-redux';
import SettingsView from './SettingsView';

const mapStateToProps = state => {
  offlineMaps: state.offlineMaps
};

export default connect(mapStateToProps)(SettingsView);
