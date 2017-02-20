import { connect } from 'react-redux';
import OfflineMapsView from './OfflineMapsView';

const mapStateToProps = state => state.offlineMaps;

export default connect(mapStateToProps)(OfflineMapsView);
