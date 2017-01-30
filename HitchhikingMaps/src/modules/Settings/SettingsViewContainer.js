import { connect } from 'react-redux';
import SettingsView from './SettingsView';

const mapStateToProps = state => state.hitchhikingMap;

export default connect(mapStateToProps)(SettingsView);
