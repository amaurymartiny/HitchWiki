import { connect } from 'react-redux';
import SnapshotsView from './SnapshotsView';

const mapStateToProps = state => state.snapshots;

export default connect(mapStateToProps)(SnapshotsView);
