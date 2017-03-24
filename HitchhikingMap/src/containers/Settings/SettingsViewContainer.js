import { connect } from 'react-redux';
import SettingsView from './SettingsView';

const mapStateToProps = state => ({
  snapshotsCount: state.snapshots.snapshots.length,
  offlineSpotsCount: Object.keys(state.offlineSpots.spots).length,
});

export default connect(mapStateToProps)(SettingsView);
