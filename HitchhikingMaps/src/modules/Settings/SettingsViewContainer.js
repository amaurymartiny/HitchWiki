import { connect } from 'react-redux';
import SettingsView from './SettingsView';

const mapStateToProps = state => ({
  offlineMapsCount: state.offlineMaps.packs.length
});

export default connect(mapStateToProps)(SettingsView);
