import { connect } from 'react-redux';
import OfflineSpotsView from './OfflineSpotsView';

const mapStateToProps = state => state.offlineSpots;

export default connect(mapStateToProps)(OfflineSpotsView);
